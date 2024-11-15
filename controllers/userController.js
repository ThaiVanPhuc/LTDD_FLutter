const User = require("../models/userModel");

// Lấy tất cả các users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};
