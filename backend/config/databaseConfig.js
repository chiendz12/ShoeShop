const sql = require("mssql");

// Cấu hình kết nối đến SQL Server
const config = {
  user: "sa",
  password: "sa",
  server: "LAPTOP-7H9JQBUD",
  database: "SportShop",
  options: {
    // trustedConnection:true,
    encrypt: false, // Tắt SSL
  },
};
// Tắt bảo mật TLS (Chỉ sử dụng trong môi trường phát triển, không nên sử dụng trong môi trường sản xuất)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Kết nối đến SQL Server sử dụng cấu hình đã được định nghĩa
sql.connect(config, (err) => {
  if (err) {
    console.error("Error connecting to SQL Server: ", err);
  } else {
    console.log("Connected to SQL Server");
  }
});
// Xuất đối tượng kết nối SQL để sử dụng ở các module khác (exports)
module.exports = sql;
