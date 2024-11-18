require("dotenv").config();
const mongoose = require("mongoose");
const Trip = require("../models/tripModel");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Lỗi: MONGO_URI không được định nghĩa trong file .env");
    process.exit(1);
  }
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Đã kết nối thành công tới MongoDB Atlas");
      processDatabase();
    })
    .catch((err) => {
      console.error("Lỗi kết nối:", err);
      process.exit(1);
    });
};

const processDatabase = async () => {
  try {
    const trips = await Trip.find();
    console.log("Kết nối thành công");
  } catch (err) {
    console.error("Lỗi khi xử lý dữ liệu:", err);
  }
};

module.exports = { connectDB };
