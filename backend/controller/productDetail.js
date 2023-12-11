const moment = require("moment/moment");
const sql = require("../config/databaseConfig");

// Đọc tất cả chi tiết sản phẩm từ bảng ProductDetails
const readProductDetail = async () => {
  const request = new sql.Request();
  request.query(`SELECT * FROM ProductDetails`, (err, result) => {
    if (err) {
      throw new Error("Database error");
    } else {
      return result.recordset;  // Trả về mảng chứa thông tin sản phẩm
    }
  });
};

// Đọc chi tiết sản phẩm theo ID
const readProductDetailById = async (id) => {
  const request = new sql.Request();
  request.query(
    `SELECT * FROM ProductDetails WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        throw new Error("Database error");
      } else {
        return result.recordset[0] || null;  // Trả về thông tin sản phẩm hoặc null nếu không tìm thấy
      }
    }
  );
};

// Đọc chi tiết sản phẩm theo ID sản phẩm
const readProductDetailByProductId = async (productId) => {
  try {
    const request = new sql.Request();
    const result = await request.query(
      `SELECT * FROM ProductDetails WHERE product = ${productId}`
    );
    return result.recordset || [];  // Trả về mảng chứa thông tin sản phẩm hoặc mảng rỗng
  } catch (err) {
    throw new Error("Database error");
  }
};

// Thêm mới chi tiết sản phẩm
const writeProductDetail = async (productDetail) => {
  try {
    const request = new sql.Request();
    await request.query(
      `INSERT INTO ProductDetails (price, quantity, size, color, product, createdDate) VALUES ('${productDetail.price
      }','${productDetail.quantity}','${productDetail.size}','${productDetail.color
      }','${productDetail.product}','${moment().format("YYYY-MM-DD HH:mm")}')`
    );

    // Đọc và trả về thông tin sản phẩm vừa thêm mới
    const result = await request.query(
      "SELECT TOP(1) * FROM ProductDetails ORDER BY id DESC"
    );

    if (result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      throw new Error("No records found");
    }
  } catch (error) {
    throw new Error("Database error");
  }
};

// Cập nhật chi tiết sản phẩm
const updateProductDetail = async (productDetail) => {
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để cập nhật thông tin sản phẩm
  request.query(
    `UPDATE ProductDetails SET price='${productDetail.price}', quantity='${productDetail.quantity}', size='${productDetail.size}', color='${productDetail.color}', product='${productDetail.product}' WHERE id = ${productDetail.id}`,
    (err, result) => {
      if (err) {
        throw new Error("Database error");
      } else {
        return result.rowsAffected[0];  // Trả về số lượng bản ghi đã được cập nhật
      }
    }
  );
};

// Xóa nhiều chi tiết sản phẩm dựa trên danh sách IDs
const deleteProductDetailByIds = async (ids) => {
  if (ids.length > 0) {
    const request = new sql.Request();

    // Thực hiện truy vấn SQL để xóa các bản ghi có IDs tương ứng
    return new Promise((resolve, reject) => {
      request.query(
        `DELETE FROM ProductDetails WHERE id IN (${ids.join(",")})`,
        (err, result) => {
          if (err) {
            reject(new Error("Database Error"));
          } else {
            resolve(result.rowsAffected[0]);  // Trả về số lượng bản ghi đã bị xóa
          }
        }
      );
    });
  } else {
    return 0;
  }
};

module.exports = {
  readProductDetail,
  readProductDetailById,
  readProductDetailByProductId,
  writeProductDetail,
  updateProductDetail,
  deleteProductDetailByIds,
};
