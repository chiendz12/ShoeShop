// Import các thư viện cần thiết
const express = require("express");     // Thư viện Express cho Node.js
const cors = require("cors");           // Thư viện giúp xử lý vấn đề CORS (Cross-Origin Resource Sharing)
const route = require("./route/routes");// Import các route từ module routes
const body_parser = require("body-parser"); // Middleware để xử lý dữ liệu JSON từ request body

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng thư viện CORS để cho phép truy cập từ các nguồn khác nhau
app.use(cors());

// Sử dụng middleware body-parser để xử lý dữ liệu JSON từ request body
app.use(body_parser.json());

// Sử dụng các route được định nghĩa trong module routes
app.use("/api", route);

// Xuất đối tượng ứng dụng Express để sử dụng ở các module khác (exports)
module.exports = app;
