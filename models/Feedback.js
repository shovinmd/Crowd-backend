const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Device-based user ID
  mode: { type: String, required: true }, // Train, Metro, Bus, Airport
  line: { type: String, required: true }, // Western, Central, Metro Line 1, etc.
  station: { type: String, required: true }, // Station name
  timeSlot: { type: String, required: true },
  weather: { type: String, required: true },
  feedback: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
