const RouteHistory = require("../models/RouteHistory");
const Feedback = require("../models/Feedback");
const { calculateCrowdScore, mapScoreToLevel } = require("../ai/crowdScoring");
const { getWeatherScore } = require("../ai/weatherImpact");
const { mapFeedback } = require("../ai/behaviorModel");
const { getTimeScore } = require("../utils/timeUtils");

exports.predictCrowd = async (req, res) => {
  try {
    const { route, timeSlot, weather, feedback } = req.body;

    // 1. Get AI Factor Scores
    const timeScore = getTimeScore(timeSlot);
    const weatherScore = getWeatherScore(weather);
    const feedbackScore = mapFeedback(feedback); // Current user input

    // 2. Get Historical Score (from DB)
    let historyScore = 0;
    const history = await RouteHistory.findOne({ route });
    if (history) {
      historyScore = history.avgCrowdScore;
    }

    // 3. Calculate Final Score (Algorithm 1)
    const finalScore = calculateCrowdScore(
      feedbackScore,
      timeScore,
      weatherScore,
      historyScore
    );

    // 4. Map to Level
    const crowdLevel = mapScoreToLevel(finalScore);

    // 5. LEARN: Update History if Feedback is provided
    // Algorithm 5: Behavior Pattern Memory
    if (feedback && feedback !== "Normal") { // Only learn from explicit feedback (or even Normal if provided)
        // Store Feedback Data
        const newFeedback = new Feedback({
            route,
            timeSlot,
            weather,
            feedback
        });
        await newFeedback.save();

        // Update Route History
        if (!history) {
            const newHistory = new RouteHistory({ route, avgCrowdScore: feedbackScore, count: 1 });
            await newHistory.save();
        } else {
            // Incremental Learning Formula
            const totalScore = (history.avgCrowdScore * history.count) + feedbackScore;
            history.count += 1;
            history.avgCrowdScore = totalScore / history.count;
            await history.save();
        }
    }

    // 6. Explainable AI Response
    res.json({
      crowdLevel,
      explanation: {
        feedbackScore,
        timeScore,
        weatherScore,
        historyScore,
        finalScore
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
