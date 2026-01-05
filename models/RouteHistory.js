const mongoose = require("mongoose");

const RouteHistorySchema = new mongoose.Schema({
  mode: { type: String, required: true },
  line: { type: String, required: true },
  station: { type: String, required: true },
  avgCrowdScore: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
});

// Compound unique index for mode + line + station
RouteHistorySchema.index({ mode: 1, line: 1, station: 1 }, { unique: true });

module.exports = mongoose.model("RouteHistory", RouteHistorySchema);
