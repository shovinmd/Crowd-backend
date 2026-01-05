const Feedback = require("../models/Feedback");
const RouteHistory = require("../models/RouteHistory");
const { mapFeedback } = require("../ai/behaviorModel");

exports.submitFeedback = async (req, res) => {
  try {
    const { userId, mode, line, station, timeSlot, weather, feedback } = req.body;

    // 1. Store feedback
    const newFeedback = new Feedback({
      userId,
      mode,
      line,
      station,
      timeSlot,
      weather,
      feedback
    });
    await newFeedback.save();

    // 2. Update route history (Incremental Learning)
    // Algorithm 5: Behavior Pattern Memory
    const feedbackScore = mapFeedback(feedback);

    let history = await RouteHistory.findOne({ mode, line, station });
    if (!history) {
      history = new RouteHistory({
        mode,
        line,
        station,
        avgCrowdScore: feedbackScore,
        count: 1
      });
    } else {
      // Incremental average update
      // New Avg = ((Old Avg * Count) + New Score) / (Count + 1)
      const totalScore = (history.avgCrowdScore * history.count) + feedbackScore;
      history.count += 1;
      history.avgCrowdScore = totalScore / history.count;
    }
    await history.save();

    res.status(201).json({ message: "Feedback stored and model updated", history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
