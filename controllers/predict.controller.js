const RouteHistory = require("../models/RouteHistory");
const Feedback = require("../models/Feedback");
const { calculateCrowdScore, mapScoreToLevel } = require("../ai/crowdScoring");
const { getWeatherScore } = require("../ai/weatherImpact");
const { mapFeedback } = require("../ai/behaviorModel");
const { getTimeScore } = require("../utils/timeUtils");

exports.predictCrowd = async (req, res) => {
  try {
    const { mode, line, station, timeSlot, weather, feedback } = req.body;

    // 1. Get AI Factor Scores
    const timeScore = getTimeScore(timeSlot);
    const weatherScore = getWeatherScore(weather);
    const feedbackScore = mapFeedback(feedback); // Current user input

    // 2. Get Historical Score (from DB)
    let historyScore = 0;
    const history = await RouteHistory.findOne({ mode, line, station });
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
    if (feedback && feedback !== "Normal") {
        const newFeedback = new Feedback({
            mode,
            line,
            station,
            timeSlot,
            weather,
            feedback
        });
        await newFeedback.save();

        if (!history) {
            const newHistory = new RouteHistory({ mode, line, station, avgCrowdScore: feedbackScore, count: 1 });
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

exports.getDashboardData = async (req, res) => {
  try {
    const majorRoutes = [
      "Churchgate - Virar (Western)",
      "CSMT - Kalyan (Central)",
      "Metro Line 1 (Versova - Ghatkopar)",
      "Bus Line 138 (Backbay - CST)"
    ];

    // Determine current time slot
    const now = new Date();
    const hour = now.getHours();
    let timeSlot = "Normal";
    if ((hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 20)) {
      timeSlot = "Peak";
    }

    const weather = "Sunny"; // Default for dashboard overview
    const timeScore = getTimeScore(timeSlot);
    const weatherScore = getWeatherScore(weather);

    const dashboardData = await Promise.all(majorRoutes.map(async (route) => {
      // Get History
      let historyScore = 0;
      const history = await RouteHistory.findOne({ route });
      if (history) {
        historyScore = history.avgCrowdScore;
      }

      // Calculate Score
      const finalScore = calculateCrowdScore(
        0, // No specific user feedback for general dashboard
        timeScore,
        weatherScore,
        historyScore
      );

      const crowdLevel = mapScoreToLevel(finalScore);
      
      return {
        route,
        level: crowdLevel,
        // Optional: You could add color codes here or handle in frontend
      };
    }));

    res.json({
      timestamp: now,
      timeSlot,
      data: dashboardData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
