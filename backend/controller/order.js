// Import các thư viện và module cần thiết
const moment = require("moment/moment");  // Thư viện quản lý thời gian
const sql = require("../config/databaseConfig");  // Module cấu hình kết nối SQL Server
const { disableOrderDetailInCart } = require("./orderDetailInCart");  // Module xử lý chi tiết đơn hàng trong giỏ hàng

// Hàm đọc tất cả các đơn hàng
const readOrder = async (req, res) => {
  const request = new sql.Request();
  request.query(`SELECT * FROM Orders`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const orders = result.recordset;
      res.status(200).json({
        status: "ok",
        message: "Read all Order Success",
        data: orders.map((o) => {
          o.orderDetails = JSON.parse(o.orderDetails);
          return o;
        }),
      });
    }
  });
};

// Hàm đọc đơn hàng theo ID
const readOrderById = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(`SELECT * FROM Orders WHERE id = ${id}`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const order = result.recordset[0] || null;
      if (!order)
        // Không tìm thấy đơn hàng theo ID
        res.status(200).json({
          status: "failed",
          message: "Order not found",
          data: order,
        });
      else {
        order.orderDetails = JSON.parse(order.orderDetails);
        res.status(200).json({
          status: "ok",
          message: "Read Order success",
          data: order,
        });
      }
    }
  });
};

// Hàm đọc đơn hàng theo ID của người dùng
const readOrderByUserId = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(
    `SELECT * FROM Orders WHERE customer = ${id}`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const orders = result.recordset;

        res.status(200).json({
          status: "ok",
          message: "Read Order Success",
          data: orders.map((o) => {
            o.orderDetails = JSON.parse(o.orderDetails);
            return o;
          }),
        });
      }
    }
  );
};

// Hàm tạo mới một đơn hàng
const writeOrder = async (req, res) => {
  const order = req.body;
  const request = new sql.Request();
  let check = true;

  // Kiểm tra số lượng sản phẩm trong chi tiết đơn hàng
  for (let i = 0; i < order.orderDetails?.length || 0; i++) {
    let od = order.orderDetails[i];
    const currentProductDetail = (
      await request.query(
        `SELECT * FROM ProductDetails WHERE product = ${od.product.id} AND size = ${od.size.id} AND color = ${od.color.id}`
      )
    ).recordset[0];
    if (currentProductDetail?.quantity < od.quantity) {
      res.json({
        status: "failed",
        message: `Product Detail ${od.product.name}-${od.size.size}-${od.color.name} not enough quantity`,
      });
      check = false;
      break;
    }
  }

  if (check === true)
    request.query(
      `INSERT INTO Orders (customer, fullName, phoneNumber, address, total, orderDate, createdDate,orderDetails) VALUES ('${order.customer
      }',N'${order.fullName}','${order.phoneNumber}',N'${order.address}','${order.total
      }','${moment().format("YYYY-MM-DD HH:mm")}','${moment().format(
        "YYYY-MM-DD HH:mm"
      )}',N'${JSON.stringify(order.orderDetails)}')`,
      async (err, result) => {
        if (err) {
          // Xử lý lỗi tạo mới đơn hàng
          res.status(200).json({ status: "error", message: "Database error" });
        } else {
          const out = result.rowsAffected[0];
          if (out) {
            // Cập nhật số lượng sản phẩm và vô hiệu hóa chi tiết đơn hàng trong giỏ hàng
            await order.orderDetails.forEach(async (od) => {
              await request.query(
                `UPDATE ProductDetails SET quantity = quantity - '${od.quantity}' WHERE product = ${od.product.id} AND size = ${od.size.id} AND color = ${od.color.id}`
              );
              await disableOrderDetailInCart(od.id);
            });

            // Trả về thông báo thành công
            return res.status(200).json({
              status: "ok",
              message: "Checkout Success",
              data: out || null,
            });
          } else
            // Tạo mới đơn hàng thất bại
            return res
              .status(200)
              .json({ status: "failed", message: "Checkout Failed" });
        }
      }
    );
};

// Hàm cập nhật thông tin một đơn hàng
const updateOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body;
  const request = new sql.Request();
  request.query(
    `UPDATE Orders SET customer=N'${order.customer}', fullName=N'${order.fullName
    }', phoneNumber='${order.phoneNumber}', address=N'${order.address
    }', total='${order.total}', orderDetails='${JSON.stringify(
      order.orderDetails
    )}' WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi cập nhật đơn hàng
        console.error(err);
        res.status(200).json({ status: "error", message: "Database error" });
      } else {
        const out = result.rowsAffected[0];
        if (out) {
          // Cập nhật thành công
          return res.status(200).json({
            status: "ok",
            message: "Update Success",
            data: out || null,
          });
        } else
          // Cập nhật thất bại
          return res
            .status(200)
            .json({ status: "failed", message: "Update Failed" });
      }
    }
  );
};

// Hàm thay đổi trạng thái của một đơn hàng
const changeStatusOrder = async (req, res) => {
  const id = req.params.id;
  const status = parseInt(req.params.status);
  const request = new sql.Request();

  // Kiểm tra giá trị trạng thái hợp lệ
  if (status >= 0 && status < 3)
    request.query(`SELECT * FROM Orders`, async (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ error: "Database error1" });
      } else {
        const orders = result.recordset;
        if (orders.length === 0) {
          // Không tìm thấy đơn hàng
          return res.status(200).json({ message: "Order not found" });
        }
        request.query(
          `UPDATE Orders SET status = '${status}' WHERE id = ${id}`,
          (err, result) => {
            if (err) {
              // Xử lý lỗi thay đổi trạng thái đơn hàng
              console.error(err);
              res
                .status(200)
                .json({ status: "error", message: "Database error2" });
            } else {
              const out = result.rowsAffected[0];
              if (out) {
                // Thay đổi trạng thái đơn hàng thành công
                if (status === 2) {
                  // Nếu trạng thái là "Hoàn thành" (2), cập nhật lại số lượng sản phẩm
                  JSON.parse(orders[0].orderDetails).forEach(async (od) => {
                    request.query(
                      `UPDATE ProductDetails SET quantity = quantity + '${od.quantity}' WHERE product = ${od.product} AND size = ${od.size} AND color = ${od.color}`
                    );
                  });
                }
                return res.status(200).json({
                  status: "ok",
                  message: "Change status success",
                  data: out || null,
                });
              } else
                // Thay đổi trạng thái đơn hàng thất bại
                return res.status(200).json({
                  status: "failed",
                  message: "Change status failed",
                });
            }
          }
        );
      }
    });
  else
    // Trạng thái không hợp lệ
    return res.status(200).json({
      status: "failed",
      message: "Change status failed",
    });
};

// Xuất các hàm xử lý để sử dụng trong module khác
module.exports = {
  readOrder,
  readOrderById,
  readOrderByUserId,
  writeOrder,
  updateOrder,
  changeStatusOrder,
};
