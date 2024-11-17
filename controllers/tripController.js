const Trip = require("../models/tripModel");
// Lấy tất cả các trip
exports.getAllTrips = async (req, res) => {
  try {
    const Trips = await Trip.find();
    res.status(200).json(Trips);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};
// Thêm một trip mới
exports.addTrip = async (req, res) => {
  const { tripName, time, days, price, avatar } = req.body;
  try {
    if (!tripName || !time || !days || !price || !avatar) {
      return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc" });
    }

    const newTrip = new Trip({
      tripName,
      time,
      days,
      price,
      avatar,
    });

    await newTrip.save();

    res.status(201).json(newTrip);
  } catch (err) {
    console.log("Lỗi khi thêm dữ liệu vào trip:", err);
    res.status(500).json({ error: "Lỗi khi thêm dữ liệu" });
  }
};

// Cập nhật thông tin của một trip dựa trên ID
exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const { tripName, time, days, price, avatar } = req.body;
  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ error: "Không tìm thấy trip" });
    }

    trip.tripName = tripName || trip.tripName;
    trip.time = time || trip.time;
    trip.days = days || trip.days;
    trip.price = price || trip.price;
    trip.avatar = avatar || trip.avatar;

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error("Lỗi khi cập nhật trip:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật trip" });
  }
};

// Xóa một trip dựa trên ID
exports.deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByIdAndDelete(id);
    if (!trip) {
      return res.status(404).json({ error: "Không tìm thấy trip để xóa" });
    }
    res.status(200).json({ message: "Trip đã được xóa thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa trip:", err);
    res.status(500).json({ error: "Lỗi khi xóa trip" });
  }
};
