const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  route: { type: String, required: true },
  timeSlot: { type: String, required: true },
  weather: { type: String, required: true },
  feedback: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
