const moment = require("moment/moment");
const sql = require("../config/databaseConfig");

// Đọc tất cả thông tin về kích thước sản phẩm từ bảng Sizes
const readSize = async (req, res) => {
  const request = new sql.Request();
  request.query(`SELECT * FROM Sizes`, (err, result) => {
    if (err) {
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const sizes = result.recordset;

      res.status(200).json({
        status: "ok",
        message: "Read all Size Success",
        data: sizes,
      });
    }
  });
};

// Đọc thông tin về kích thước sản phẩm dựa trên ID
const readSizeById = async (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.query(`SELECT * FROM Sizes WHERE id = ${id}`, (err, result) => {
    if (err) {
      res.status(200).json({ status: "error", error: "Database error" });
    } else {
      const size = result.recordset[0] || null;
      if (!size)
        res.status(200).json({
          status: "failed",
          message: "Size not found",
          data: size,
        });
      res.status(200).json({
        status: "ok",
        message: "Read Size success",
        data: size,
      });
    }
  });
};

// Thêm mới thông tin về kích thước sản phẩm
const writeSize = async (req, res) => {
  const size = req.body;
  const request = new sql.Request();

  // Truy vấn để kiểm tra xem kích thước đã tồn tại chưa
  request.query(`SELECT * FROM Sizes`, async (err, result) => {
    if (err) {
      res.status(200).json({ error: "Database error1" });
    } else {
      const sizes = result.recordset;
      if (sizes.some((u) => u.size === size.size)) {
        return res.status(200).json({ message: "Size existed" });
      }

      // Thực hiện truy vấn SQL để thêm mới kích thước sản phẩm
      request.query(
        `INSERT INTO Sizes (size, description, createdDate) VALUES ('${size.size
        }',N'${size.description}','${moment().format("YYYY-MM-DD HH:mm")}')`,
        async (err, result) => {
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
                message: "add new Success",
                data: (
                  await request.query(
                    "SELECT TOP(1) * FROM Sizes Order by id desc"
                  )
                ).recordset[0],
              });
            } else
              return res
                .status(200)
                .json({ status: "failed", message: "Add new Failed" });
          }
        }
      );
    }
  });
};

// Cập nhật thông tin về kích thước sản phẩm
const updateSize = async (req, res) => {
  const id = req.params.id;
  const size = req.body;
  const request = new sql.Request();

  // Truy vấn để kiểm tra xem kích thước đã tồn tại chưa
  request.query(`SELECT * FROM Sizes`, async (err, result) => {
    if (err) {
      res.status(200).json({ error: "Database error1" });
    } else {
      const sizes = result.recordset;
      if (sizes.length === 0) {
        return res.status(200).json({ message: "Size not found" });
      }

      // Kiểm tra xem kích thước đã tồn tại trong danh sách hay không
      if (sizes.filter((u) => u.size === size.size).length > 1) {
        return res.status(200).json({ message: "Size existed" });
      }

      const sizeCurrent = sizes[0];

      // Thực hiện truy vấn SQL để cập nhật thông tin kích thước sản phẩm
      request.query(
        `UPDATE Sizes SET size='${size.size}', description=N'${size.description}' WHERE id = ${id}`,
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
                message: "Update Success",
                data: out || null,
              });
            } else
              return res
                .status(200)
                .json({ status: "failed", message: "Update Failed" });
          }
        }
      );
    }
  });
};

// Thay đổi trạng thái của kích thước sản phẩm
const changeStatusSize = async (req, res) => {
  const id = req.params.id;
  const status = JSON.parse(req.params.status);
  const request = new sql.Request();

  // Truy vấn để kiểm tra xem kích thước đã tồn tại chưa
  request.query(`SELECT * FROM Sizes`, async (err, result) => {
    if (err) {
      res.status(200).json({ error: "Database error1" });
    } else {
      const sizes = result.recordset;
      if (sizes.length === 0) {
        return res.status(200).json({ message: "Size not found" });
      }

      // Thực hiện truy vấn SQL để cập nhật trạng thái của kích thước sản phẩm
      request.query(
        `UPDATE Sizes SET status = '${status}' WHERE id = ${id}`,
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
  readSize,
  readSizeById,
  writeSize,
  updateSize,
  changeStatusSize,
};
