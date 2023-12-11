// Import thư viện quản lý thời gian
const moment = require("moment/moment");

// Import module cấu hình kết nối SQL Server
const sql = require("../config/databaseConfig");

// Import các hàm từ module productDetail
const {
  readProductDetail,
  writeProductDetail,
  updateProductDetail,
  deleteProductDetailByIds,
  readProductDetailByProductId,
} = require("./productDetail");

// Hàm đọc tất cả sản phẩm
const readProduct = async (req, res) => {
  try {
    const request = new sql.Request();
    // Thực hiện truy vấn SQL để lấy danh sách sản phẩm
    request.query(`SELECT * FROM Products`, async (err, result) => {
      if (err) {
        // Xử lý lỗi nếu có
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        // Gửi response với danh sách sản phẩm và chi tiết sản phẩm
        res.status(200).json({
          status: "ok",
          message: "Read all Product Success",
          data: await Promise.all(
            (result.recordset || []).map(async (p) => {
              p.productDetails = await readProductDetailByProductId(p.id);
              return p;
            })
          ),
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

// Hàm đọc sản phẩm theo ID
const readProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const request = new sql.Request();
    // Thực hiện truy vấn SQL để lấy sản phẩm theo ID
    request.query(`SELECT * FROM Products WHERE id = ${id}`, async (err, result) => {
      if (err) {
        // Xử lý lỗi nếu có
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const product = result.recordset[0] || null;
        if (!product)
          // Gửi response nếu sản phẩm không tồn tại
          res.status(200).json({
            status: "failed",
            message: "Product not found",
            data: product,
          });
        product.productDetails = await readProductDetailByProductId(product.id);
        // Gửi response với thông tin sản phẩm
        res.status(200).json({
          status: "ok",
          message: "Read Product success",
          data: product,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

// Hàm thêm sản phẩm mới
const writeProduct = async (req, res) => {
  try {
    const product = req.body;
    const request = new sql.Request();
    // Thực hiện truy vấn SQL để lấy danh sách sản phẩm
    request.query(`SELECT * FROM Products`, async (err, result) => {
      if (err) {
        // Xử lý lỗi nếu có
        res.status(200).json({ error: "Database error1" });
      } else {
        const products = result.recordset;
        if (products.some((u) => u.name === product.name)) {
          // Gửi response nếu sản phẩm đã tồn tại
          return res.status(200).json({ message: "Product existed" });
        }
        // Thực hiện truy vấn SQL để thêm sản phẩm mới
        request.query(
          `INSERT INTO Products (name, image, category, description, createdDate) VALUES (N'${product.name
          }','${product.image ||
          "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media"
          }','${product.category}',N'${product.description}','${moment().format(
            "YYYY-MM-DD HH:mm"
          )}')`,
          async (err, result) => {
            if (err) {
              // Xử lý lỗi nếu có
              res
                .status(200)
                .json({ status: "error", message: "Database error2" });
            } else {
              if (result.rowsAffected[0]) {
                // Nếu thêm mới sản phẩm thành công, lấy thông tin sản phẩm vừa thêm
                const selectQuery =
                  "SELECT TOP(1) * FROM Products Order by id desc";

                request.query(selectQuery, async (selectErr, selectResult) => {
                  if (selectErr) {
                    // Xử lý lỗi nếu có
                    res
                      .status(200)
                      .json({ status: "error", message: "Database error3" });
                  } else {
                    let newProduct = selectResult.recordset[0];
                    product.productDetails = product.productDetails.reduce(
                      (accumulator, currentItem) => {
                        const existingItem = accumulator.find(
                          (item) =>
                            item.size === currentItem.size &&
                            item.color === currentItem.color
                        );

                        if (existingItem) {
                          existingItem.quantity =
                            parseInt(existingItem.quantity, 10) +
                            parseInt(currentItem.quantity, 10);
                        } else {
                          accumulator.push({ ...currentItem });
                        }
                        return accumulator;
                      },
                      []
                    );
                    // Thêm chi tiết sản phẩm mới
                    newProduct.productDetails = await Promise.all(
                      product.productDetails.map(async (pd) => {
                        pd.product = newProduct.id;
                        return await writeProductDetail(pd);
                      })
                    );
                    // Gửi response với thông tin sản phẩm mới
                    return res.status(200).json({
                      status: "ok",
                      message: "Add new Success",
                      data: newProduct,
                    });
                  }
                });
              } else
                // Gửi response nếu thêm mới sản phẩm thất bại
                return res
                  .status(200)
                  .json({ status: "failed", message: "Add new Failed" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

// Hàm cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const request = new sql.Request();
    // Thực hiện truy vấn SQL để lấy danh sách sản phẩm
    request.query(`SELECT * FROM Products`, async (err, result) => {
      if (err) {
        // Xử lý lỗi nếu có
        res.status(200).json({ error: "Database error1" });
      } else {
        const products = result.recordset;
        if (products.length === 0) {
          // Gửi response nếu không tìm thấy sản phẩm
          return res.status(200).json({ message: "Product not found" });
        }
        if (products.filter((u) => u.name === product.name).length > 1) {
          // Gửi response nếu sản phẩm đã tồn tại
          return res.status(200).json({ message: "Product existed" });
        }
        const productCurrent = products[0];
        // Thực hiện truy vấn SQL để cập nhật thông tin sản phẩm
        request.query(
          `UPDATE Products SET name=N'${product.name}', image=N'${product.image || productCurrent.image
          }',category='${product.category}', description=N'${product.description
          }' WHERE id = ${id}`,
          async (err, result) => {
            if (err) {
              console.error(err);
              // Xử lý lỗi nếu có
              res
                .status(200)
                .json({ status: "error", message: "Database error2" });
            } else {
              if (result.rowsAffected[0]) {
                // Nếu cập nhật thành công, cập nhật chi tiết sản phẩm
                product.productDetails = product.productDetails.reduce(
                  (accumulator, currentItem) => {
                    const existingItem = accumulator.find(
                      (item) =>
                        item.size === currentItem.size &&
                        item.color === currentItem.color
                    );
                    if (existingItem) {
                      if (currentItem.id) existingItem.id = currentItem.id;
                      existingItem.quantity =
                        parseInt(existingItem.quantity, 10) +
                        parseInt(currentItem.quantity, 10);
                    } else {
                      accumulator.push({ ...currentItem });
                    }
                    return accumulator;
                  },
                  []
                );

                // Xóa các chi tiết sản phẩm không còn tồn tại
                await deleteProductDetailByIds(
                  ((await readProductDetailByProductId(id)) ?? [])
                    .filter(
                      (pd) =>
                        !Array.from(product.productDetails).some(
                          (ppd) => pd.id === ppd.id
                        )
                    )
                    .map((pd) => pd.id)
                );

                // Cập nhật thông tin chi tiết sản phẩm
                product.productDetails.forEach((pd) => {
                  if (pd.id) updateProductDetail(pd);
                  else {
                    pd.product = id;
                    writeProductDetail(pd);
                  }
                });

                // Gửi response với thông tin sản phẩm đã cập nhật
                return res.status(200).json({
                  status: "ok",
                  message: "Update Success",
                  data: product,
                });
              } else
                // Gửi response nếu cập nhật thất bại
                return res
                  .status(200)
                  .json({ status: "failed", message: "Update Failed" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

// Hàm thay đổi trạng thái của sản phẩm
const changeStatusProduct = async (req, res) => {
  const id = req.params.id;
  const status = JSON.parse(req.params.status);
  const request = new sql.Request();
  // Execute a SQL query
  request.query(`SELECT * FROM Products`, async (err, result) => {
    if (err) {
      res.status(200).json({ error: "Database error1" });
    } else {
      const products = result.recordset;
      if (products.length === 0) {
        return res.status(200).json({ message: "Product not found" });
      }
      request.query(
        `UPDATE Products SET status = '${status}' WHERE id = ${id}`,
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              return res.status(200).json({
                status: "ok",
                message: "Change status success",
                data: out || null,
              });
            } else
              return res.status(200).json({
                status: "failed",
                message: "Change status failed",
              });
          }
        }
      );
    }
  });
};
module.exports = {
  readProduct,
  readProductById,
  writeProduct,
  updateProduct,
  changeStatusProduct,
};
