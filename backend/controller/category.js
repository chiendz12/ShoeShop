// Import các thư viện và module cần thiết
const moment = require("moment/moment");  // Thư viện quản lý thời gian
const sql = require("../config/databaseConfig");  // Module cấu hình kết nối SQL Server

// Hàm đọc tất cả các danh mục (categories)
const readCategory = async (req, res) => {
  const request = new sql.Request();
  request.query(`SELECT * FROM Categories`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const categories = result.recordset;

      // Trả về danh sách các danh mục
      res.status(200).json({
        status: "ok",
        message: "Read all Category Success",
        data: categories,
      });
    }
  });
};

// Hàm đọc danh mục theo ID
const readCategoryById = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(`SELECT * FROM Categories WHERE id = ${id}`, (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const category = result.recordset[0] || null;
      if (!category)
        // Không tìm thấy danh mục theo ID
        res.status(200).json({
          status: "failed",
          message: "Category not found",
          data: category,
        });

      // Trả về thông tin của danh mục
      res.status(200).json({
        status: "ok",
        message: "Read Category success",
        data: category,
      });
    }
  });
};

// Hàm tạo mới một danh mục
const writeCategory = async (req, res) => {
  const category = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các danh mục
  request.query(`SELECT * FROM Categories`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const categories = result.recordset;
      if (categories.some((u) => u.name === category.name)) {
        // Tên danh mục đã tồn tại
        return res.status(200).json({ message: "Category existed" });
      }

      // Thực hiện truy vấn SQL để thêm mới một danh mục
      request.query(
        `INSERT INTO Categories (name, description, createdDate) VALUES ('${category.name
        }',N'${category.description}','${moment().format(
          "YYYY-MM-DD HH:mm"
        )}')`,
        async (err, result) => {
          if (err) {
            // Xử lý lỗi thêm mới danh mục
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Trả về thông tin của danh mục vừa được thêm mới
              return res.status(200).json({
                status: "ok",
                message: "Add new Success",
                data: (
                  await request.query(
                    "SELECT TOP(1) * FROM Categories ORDER BY id DESC"
                  )
                ).recordset[0],
              });
            } else
              // Thêm mới danh mục thất bại
              return res
                .status(200)
                .json({ status: "failed", message: "Add new Failed" });
          }
        }
      );
    }
  });
};

// Hàm cập nhật thông tin một danh mục
const updateCategory = async (req, res) => {
  const id = req.params.id;
  const category = req.body;
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các danh mục
  request.query(`SELECT * FROM Categories`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const categories = result.recordset;
      if (categories.length === 0) {
        // Không tìm thấy danh mục
        return res.status(200).json({ message: "Category not found" });
      }
      if (categories.filter((u) => u.name === category.name).length > 1) {
        // Tên danh mục đã tồn tại
        return res.status(200).json({ message: "Category existed" });
      }
      const categoryCurrent = categories[0];

      // Thực hiện truy vấn SQL để cập nhật thông tin danh mục
      request.query(
        `UPDATE Categories SET name='${category.name}', description=N'${category.description}' WHERE id = ${id}`,
        (err, result) => {
          if (err) {
            // Xử lý lỗi cập nhật danh mục
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Cập nhật danh mục thành công
              return res.status(200).json({
                status: "ok",
                message: "Update Success",
                data: out || null,
              });
            } else
              // Cập nhật danh mục thất bại
              return res
                .status(200)
                .json({ status: "failed", message: "Update Failed" });
          }
        }
      );
    }
  });
};

// Hàm thay đổi trạng thái của một danh mục
const changeStatusCategory = async (req, res) => {
  const id = req.params.id;
  const status = JSON.parse(req.params.status);
  const request = new sql.Request();

  // Thực hiện truy vấn SQL để kiểm tra danh sách các danh mục
  request.query(`SELECT * FROM Categories`, async (err, result) => {
    if (err) {
      // Xử lý lỗi kết nối đến cơ sở dữ liệu
      res.status(200).json({ error: "Database error1" });
    } else {
      const categories = result.recordset;
      if (categories.length === 0) {
        // Không tìm thấy danh mục
        return res.status(200).json({ message: "Category not found" });
      }

      // Thực hiện truy vấn SQL để thay đổi trạng thái của danh mục
      request.query(
        `UPDATE Categories SET status = '${status}' WHERE id = ${id}`,
        (err, result) => {
          if (err) {
            // Xử lý lỗi thay đổi trạng thái danh mục
            console.error(err);
            res
              .status(200)
              .json({ status: "error", message: "Database error2" });
          } else {
            const out = result.rowsAffected[0];
            if (out) {
              // Thay đổi trạng thái danh mục thành công
              return res.status(200).json({
                status: "ok",
                message: "Change status success",
                data: out || null,
              });
            } else
              // Thay đổi trạng thái danh mục thất bại
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
  readCategory,
  readCategoryById,
  writeCategory,
  updateCategory,
  changeStatusCategory,
};
