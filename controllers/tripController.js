const Trip = require("../models/tripModel");
// Lấy tất cả các trip
exports.getAllTrips = async (req, res) => {
  try {
    // Lấy tất cả các trip từ database
    const Trips = await Trip.find();
    res.status(200).json(Trips);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};
// Thêm một trip mới
exports.addTrip = async (req, res) => {
  const { cityName, tripName, guestName, time } = req.body;
  try {
    // Lưu trip mới vào database
    const newTrip = new Trip({ cityName, tripName, guestName, time });
    res.status(201).json(newTrip); // Tra ve du lieu Trip moi vua tao
  } catch (err) {
    console.log("Lỗi khi thêm dữ iệu vào trip:", err);
    res.status(500).json({ error: "Lỗi khi thêm dữ liệu" });
  }
};
// Cập nhật thông tin của một trip dựa trên ID
exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const { cityName, tripName, guestName, time } = req.body;
  try {
    const trip = await Trip.findByIdAndUpdate(id);
    if (!trip) {
      return res.status(404).json({ error: "Không tìm thấy trip" });
    }
    // Cập nhật thông tin trip
    trip.cityName = cityName || trip.cityName;
    trip.tripName = tripName || trip.tripName;
    trip.guestName = guestName || trip.guestName;
    trip.time = time || trip.time;
    await trip.save(); // Lưu thông tin trip đã cập nhật vào database

    res.json(trip); // Trả về thông tin trip đã cập nhật
  } catch (err) {
    console.error("Lỗi khi cập nhật trip:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật trip" });
  }
};
