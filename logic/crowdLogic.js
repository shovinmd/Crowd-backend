function predictCrowd(time, weather, feedback) {
  let score = 0;

  if (time === "Peak") score += 3;
  if (weather === "Rainy") score += 2;
  if (feedback === "Overcrowded") score += 3;

  if (score >= 6) return "High";
  if (score >= 3) return "Medium";
  return "Low";
}

module.exports = predictCrowd;
