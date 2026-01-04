// Algorithm 4: Weather Impact Model (PBSP)
function getWeatherScore(weather) {
  // “We model passenger behavior shift during adverse weather.”
  if (weather === "Rainy") {
    return 3; // mode shift expected
  }
  return 1;
}

module.exports = { getWeatherScore };
