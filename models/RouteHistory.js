const mongoose = require("mongoose");

const RouteHistorySchema = new mongoose.Schema({
  route: { type: String, required: true, unique: true },
  avgCrowdScore: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model("RouteHistory", RouteHistorySchema);
