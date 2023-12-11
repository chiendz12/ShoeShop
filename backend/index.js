const app = require("./app");

// Định nghĩa cổng mà server sẽ lắng nghe
const port = 3001;

// Lắng nghe các kết nối đến server trên cổng đã định nghĩa
app.listen(port, function () {
  // In ra console thông báo khi server bắt đầu lắng nghe
  console.log(`Backend server listening on port ${port}!`);
});
