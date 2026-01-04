function getTimeScore(timeSlot) {
  // Peak hours = learned congestion pattern
  if (timeSlot === "Peak") return 3;
  return 1;
}

module.exports = { getTimeScore };
