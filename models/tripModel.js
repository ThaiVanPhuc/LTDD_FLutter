const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema(
  {
    cityName: { type: String, required: true },
    tripName: { type: String, required: true },
    guestName: { type: String, required: true },
    time: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    guestAvatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Trip = mongoose.model("Trips", tripSchema); // Tạo một model với tên là Trips dựa trên schema tripSchema, tạo tên trong database
module.exports = Trip;
