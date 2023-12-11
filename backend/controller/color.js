// Import các thư viện và module cần thiết
const moment = require("moment/moment");  // Thư viện quản lý thời gian
const sql = require("../config/databaseConfig");  // Module cấu hình kết nối SQL Server

// Hàm đọc tất cả các màu sắc (colors)
const readColor = async (req, res) => {
  const request = new sql.Request();
  request.query(`SELECT * FROM Colors`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const colors = result.recordset;

      // Trả về danh sách các màu sắc
      res.status(200).json({
        status: "ok",
        message: "Read all Color Success",
        data: colors,
      });
    }
  });
};

// Hàm đọc màu sắc theo ID
const readColorById = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(`SELECT * FROM Colors WHERE id = ${id}`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const color = result.recordset[0] || null;
      if (!color)
        // Không tìm thấy màu sắc theo ID
        res.status(200).json({
          status: "failed",
          message: "Color not found",
          data: color,
        });

      // Trả về thông tin của màu sắc
      res.status(200).json({
        status: "ok",
        message: "Read Color success",
        data: color,
      });
    }
  });
};

// Hàm tạo mới một màu sắc
const writeColor = async (req, res) => {
  const color = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các màu sắc
  request.query(`SELECT * FROM Colors`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const colors = result.recordset;
      if (colors.some((u) => u.name === color.name)) {
        // Tên màu sắc đã tồn tại
        return res.status(200).json({ message: "Color existed" });
      }

      // Thực hiện truy vấn SQL để thêm mới một màu sắc
      request.query(
        `INSERT INTO Colors (name, colorCode, description, createdDate) VALUES (N'${color.name
        }','${color.colorCode}',N'${color.description}','${moment().format(
          "YYYY-MM-DD HH:mm"
        )}')`,
        async (err, result) => {
          if (err) {
            // Xử lý lỗi thêm mới màu sắc
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Trả về thông tin của màu sắc vừa được thêm mới
              return res.status(200).json({
                status: "ok",
                message: "add new Success",
                data: (
                  await request.query(
                    "SELECT TOP(1) * FROM Colors ORDER BY id DESC"
                  )
                ).recordset[0],
              });
            } else
              // Thêm mới màu sắc thất bại
              return res
                .status(200)
                .json({ status: "failed", message: "Add new Failed" });
          }
        }
      );
    }
  });
};

// Hàm cập nhật thông tin một màu sắc
const updateColor = async (req, res) => {
  const id = req.params.id;
  const color = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các màu sắc
  request.query(`SELECT * FROM Colors`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const colors = result.recordset;
      if (colors.length === 0) {
        // Không tìm thấy màu sắc
        return res.status(200).json({ message: "Color not found" });
      }
      if (colors.filter((u) => u.name === color.name).length > 1) {
        // Tên màu sắc đã tồn tại
        return res.status(200).json({ message: "Color existed" });
      }
      const colorCurrent = colors[0];

      // Thực hiện truy vấn SQL để cập nhật thông tin màu sắc
      request.query(
        `UPDATE Colors SET name=N'${color.name}', colorCode='${color.colorCode}', description=N'${color.description}' WHERE id = ${id}`,
        (err, result) => {
          if (err) {
            // Xử lý lỗi cập nhật màu sắc
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Cập nhật màu sắc thành công
              return res.status(200).json({
                status: "ok",
                message: "Update Success",
                data: out || null,
              });
            } else
              // Cập nhật màu sắc thất bại
              return res
                .status(200)
                .json({ status: "failed", message: "Update Failed" });
          }
        }
      );
    }
  });
};

// Hàm thay đổi trạng thái của một màu sắc
const changeStatusColor = async (req, res) => {
  const id = req.params.id;
  const status = JSON.parse(req.params.status);
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các màu sắc
  request.query(`SELECT * FROM Colors`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const colors = result.recordset;
      if (colors.length === 0) {
        // Không tìm thấy màu sắc
        return res.status(200).json({ message: "Color not found" });
      }

      // Thực hiện truy vấn SQL để thay đổi trạng thái của màu sắc
      request.query(
        `UPDATE Colors SET status = '${status}' WHERE id = ${id}`,
        (err, result) => {
          if (err) {
            // Xử lý lỗi thay đổi trạng thái màu sắc
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Thay đổi trạng thái màu sắc thành công
              return res.status(200).json({
                status: "ok",
                message: "Change status success",
                data: out || null,
              });
            } else
              // Thay đổi trạng thái màu sắc thất bại
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

// Xuất các hàm xử lý để sử dụng trong module khác
module.exports = {
  readColor,
  readColorById,
  writeColor,
  updateColor,
  changeStatusColor,
};
