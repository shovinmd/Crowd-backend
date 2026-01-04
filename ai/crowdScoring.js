const config = require("../config/config");

// Algorithm 1: Crowd Scoring Model (CORE)
function calculateCrowdScore(feedbackScore, timeScore, weatherScore, historyScore) {
  // Weighted Behavior Scoring Model
  const score = 
    (feedbackScore * config.weights.feedback) +
    (timeScore * config.weights.time) +
    (weatherScore * config.weights.weather) +
    (historyScore * config.weights.history);

  return score;
}

function mapScoreToLevel(score) {
  if (score >= config.thresholds.high) return "High";
  if (score >= config.thresholds.medium) return "Medium";
  return "Low";
}

module.exports = { calculateCrowdScore, mapScoreToLevel };
