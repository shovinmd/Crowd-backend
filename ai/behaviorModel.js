// Algorithm 2: Feedback Intelligence Engine
function mapFeedback(feedback) {
  // Convert raw feedback into usable signals
  const mapping = {
    "Comfortable": 0,
    "Normal": 1,
    "Long Wait": 2,
    "Overcrowded": 3
  };
  return mapping[feedback] || 1; // Default to Normal if undefined
}

module.exports = { mapFeedback };
