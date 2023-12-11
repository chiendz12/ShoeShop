// Import các thư viện và module cần thiết
const moment = require("moment/moment");  // Thư viện quản lý thời gian
const sql = require("../config/databaseConfig");  // Module cấu hình kết nối SQL Server
const bcrypt = require("bcryptjs");  // Thư viện mã hóa mật khẩu

// Hàm xử lý đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL
  request.query(
    `SELECT * FROM Users WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        // Xử lý lỗi kết nối đến cơ sở dữ liệu
        res.status(200).json({ status: "error", error: "Database error" });
      } else {
        const user = result.recordset[0] || null;
        if (!user) {
          // Username không tồn tại
          return res.status(200).json({
            status: "failed",
            message: "Username not found",
          });
        }
        if (!user.status)
          // Người dùng bị tắt
          return res
            .status(200)
            .json({ status: "failed", message: "User is Disabled" });
        if (!bcrypt.compareSync(password, user.password)) {
          // Mật khẩu không chính xác
          return res
            .status(200)
            .json({ status: "failed", message: "Password Incorrect" });
        }

        // Đăng nhập thành công
        res
          .status(200)
          .json({ status: "ok", message: "Login Success", data: user });
      }
    }
  );
};

// Hàm xử lý đăng ký
const register = async (req, res) => {
  const user = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách người dùng
  request.query(`SELECT * FROM Users`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", message: "Database error1" });
    } else {
      user.role = 2;  // Gán vai trò mặc định là 2 (người dùng thông thường)
      const users = result.recordset;
      if (users.length === 0) user.role = 1;  // Nếu không có người dùng, gán vai trò là 1 (quản trị viên)
      else if (users.some((u) => u.username === user.username)) {
        // Username đã tồn tại
        return res
          .status(200)
          .json({ status: "failed", message: "Username existed" });
      }

      // Thực hiện truy vấn SQL để thêm người dùng mới
      request.query(
        `INSERT INTO Users (firstName, lastName, username, password, createdDate, role) VALUES (N'${user.firstName
        }',N'${user.lastName}','${user.username}','${await bcrypt.hash(
          user.password,
          12
        )}','${moment().format("YYYY-MM-DD HH:mm")}','${user.role}')`,
        (err, result) => {
          if (err) {
            // Xử lý lỗi thêm người dùng
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error 2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Đăng ký thành công
              return res.status(200).json({
                status: "ok",
                message: "Register Success",
                data: out || null,
              });
            } else
              // Đăng ký thất bại
              return res.status(200).json({
                status: "failed",
                message: "Register Failed",
              });
          }
        }
      );
    }
  });
};

// Xuất các hàm xử lý để sử dụng trong module khác
module.exports = { login, register };
