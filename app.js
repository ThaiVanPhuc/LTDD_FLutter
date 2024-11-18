const express = require("express");
const path = require("path");
const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/userRoutes");
const Db = require("./config/config");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({}));
// Cấu hình route
app.use("/api", tripRoutes);
app.use("/api/users", userRoutes);

app.use(
  "/resource/images",
  express.static(path.join(__dirname, "resource", "images"))
);

// Connect Db
Db.connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
