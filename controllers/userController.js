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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};
