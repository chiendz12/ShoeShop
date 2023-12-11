// Import các thư viện và module cần thiết
const moment = require("moment/moment");  // Thư viện quản lý thời gian
const sql = require("../config/databaseConfig");  // Module cấu hình kết nối SQL Server

// Hàm đọc tất cả chi tiết đơn hàng trong giỏ hàng có trạng thái là 1 (đang hoạt động)
const readOrderDetailInCart = async (req, res) => {
  const request = new sql.Request();
  request.query(
    `SELECT * FROM OrderDetailInCarts WHERE status = 1`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const orderDetailInCarts = result.recordset;

        // Trả về thông tin chi tiết đơn hàng trong giỏ hàng
        res.status(200).json({
          status: "ok",
          message: "Read all OrderDetailInCart Success",
          data: orderDetailInCarts,
        });
      }
    }
  );
};

// Hàm đọc chi tiết đơn hàng trong giỏ hàng theo ID có trạng thái là 1
const readOrderDetailInCartById = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(
    `SELECT * FROM OrderDetailInCarts WHERE id = ${id} AND status = 1`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const orderDetailInCart = result.recordset[0] || null;
        if (!orderDetailInCart)
          // Không tìm thấy chi tiết đơn hàng trong giỏ hàng theo ID
          res.status(200).json({
            status: "failed",
            message: "OrderDetailInCart not found",
            data: orderDetailInCart,
          });
        // Trả về thông tin chi tiết đơn hàng trong giỏ hàng
        res.status(200).json({
          status: "ok",
          message: "Read OrderDetailInCart success",
          data: orderDetailInCart,
        });
      }
    }
  );
};

// Hàm đọc chi tiết đơn hàng trong giỏ hàng theo ID của người dùng có trạng thái là 1
const readOrderDetailInCartByUserId = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(
    `SELECT * FROM OrderDetailInCarts WHERE customer = ${id} AND status = '1'`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const orderDetailInCart = result.recordset || [];
        // Trả về thông tin chi tiết đơn hàng trong giỏ hàng
        res.status(200).json({
          status: "ok",
          message: "Read OrderDetailInCart success",
          data: orderDetailInCart,
        });
      }
    }
  );
};

// Hàm tạo mới hoặc cập nhật chi tiết đơn hàng trong giỏ hàng
const writeOrderDetailInCart = async (req, res) => {
  const orderDetailInCart = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để lấy danh sách chi tiết đơn hàng trong giỏ hàng
  request.query(`SELECT * FROM OrderDetailInCarts`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const orderDetailInCarts = result.recordset;

      // Kiểm tra xem chi tiết đơn hàng trong giỏ hàng đã tồn tại hay chưa
      const orderDetailInCartExist = orderDetailInCarts.find(
        (u) =>
          u.product === orderDetailInCart.product &&
          u.color === orderDetailInCart.color &&
          u.size === orderDetailInCart.size &&
          u.customer === orderDetailInCart.customer &&
          u.status
      );

      if (orderDetailInCartExist) {
        // Nếu đã tồn tại, cập nhật số lượng
        request.query(
          `UPDATE OrderDetailInCarts SET quantity = '${orderDetailInCartExist.quantity + orderDetailInCart.quantity
          }' WHERE id = ${orderDetailInCartExist.id}`,
          (err, result) => {
            if (err) {
              // Xử lý lỗi cập nhật chi tiết đơn hàng trong giỏ hàng
              console.error(err);
              res
                .status(200)
                .json({ status: "error", message: "Database error" });
            } else {
              const out = result.rowsAffected[0];
              if (out) {
                // Trả về thông báo thành công
                return res.status(200).json({
                  status: "ok",
                  message: "Add new Success",
                  data: 1,
                });
              } else
                // Trả về thông báo thất bại
                return res.status(200).json({
                  status: "failed",
                  message: "Add new Failed",
                });
            }
          }
        );
      } else {
        // Nếu chưa tồn tại, tạo mới chi tiết đơn hàng trong giỏ hàng
        request.query(
          `INSERT INTO OrderDetailInCarts (product, color, size, quantity, customer, [check], createdDate) VALUES ('${orderDetailInCart.product
          }','${orderDetailInCart.color}','${orderDetailInCart.size}','${orderDetailInCart.quantity
          }','${orderDetailInCart.customer}','${orderDetailInCart.check
          }','${moment().format("YYYY-MM-DD HH:mm")}')`,
          (err, result) => {
            if (err) {
              // Xử lý lỗi tạo mới chi tiết đơn hàng trong giỏ hàng
              console.error(err);
              res
                .status(200)
                .json({ status: "error", message: "Database error2" });
            } else {
              const out = result.rowsAffected[0];
              if (out) {
                // Trả về thông báo thành công
                return res.status(200).json({
                  status: "ok",
                  message: "add new Success",
                  data: 2,
                });
              } else
                // Trả về thông báo thất bại
                return res.status(200).json({
                  status: "failed",
                  message: "Add new Failed",
                });
            }
          }
        );
      }
    }
  });
};

// Hàm cập nhật chi tiết đơn hàng trong giỏ hàng theo ID
const updateOrderDetailInCart = async (req, res) => {
  const id = req.params.id;
  const orderDetailInCart = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để cập nhật chi tiết đơn hàng trong giỏ hàng
  request.query(
    `UPDATE OrderDetailInCarts SET quantity='${orderDetailInCart.quantity}', [check]='${orderDetailInCart.check}' WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi cập nhật chi tiết đơn hàng trong giỏ hàng
        console.error(err);
        res.status(200).json({ status: "error", message: "Database error" });
      } else {
        const out = result.rowsAffected[0];
        if (out) {
          // Trả về thông báo cập nhật thành công
          return res.status(200).json({
            status: "ok",
            message: "Update Success",
            data: out || null,
          });
        } else
          // Trả về thông báo cập nhật thất bại
          return res
            .status(200)
            .json({ status: "failed", message: "Update Failed" });
      }
    }
  );
};

// Hàm thay đổi trạng thái của chi tiết đơn hàng trong giỏ hàng theo ID
const changeStatusOrderDetailInCart = async (req, res) => {
  try {
    const id = req.params.id;
    const status = JSON.parse(req.params.status);

    // Tạo một Request mới
    const request = new sql.Request();

    // Thực hiện truy vấn SQL để thay đổi trạng thái chi tiết đơn hàng trong giỏ hàng
    const queryResult = await request.query(
      `UPDATE OrderDetailInCarts SET status = '${status}' WHERE id = ${id}`
    );

    const rowsAffected = queryResult.rowsAffected[0];

    if (rowsAffected > 0) {
      // Trả về thông báo thay đổi trạng thái thành công
      res.status(200).json({
        status: "ok",
        message: "Change status success",
        data: rowsAffected,
      });
    } else {
      // Trả về thông báo thay đổi trạng thái thất bại
      res.status(200).json({
        status: "failed",
        message: "Change status failed",
      });
    }
  } catch (err) {
    // Xử lý lỗi kết nối đến cơ sở dữ liệu
    console.error(err);
    res.status(200).json({ status: "error", message: "Database error" });
  }
};

// Hàm vô hiệu hóa chi tiết đơn hàng trong giỏ hàng theo ID
const disableOrderDetailInCart = async (id) => {
  try {
    const request = new sql.Request();

    // Thực hiện truy vấn SQL để vô hiệu hóa chi tiết đơn hàng trong giỏ hàng
    const queryResult = await request.query(
      `UPDATE OrderDetailInCarts SET status = '0' WHERE id = ${id}`
    );

    return queryResult.rowsAffected[0];
  } catch (err) {
    // Xử lý lỗi kết nối đến cơ sở dữ liệu
    throw new Error("Database error");
  }
};

// Xuất các hàm xử lý để sử dụng trong module khác
module.exports = {
  readOrderDetailInCart,
  readOrderDetailInCartById,
  readOrderDetailInCartByUserId,
  writeOrderDetailInCart,
  updateOrderDetailInCart,
  changeStatusOrderDetailInCart,
  disableOrderDetailInCart,
};
