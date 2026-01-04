const express = require("express");
const predictCrowd = require("../logic/crowdLogic");
const router = express.Router();

router.post("/", (req, res) => {
  const { time, weather, feedback } = req.body;
  const crowdLevel = predictCrowd(time, weather, feedback);
  res.json({ crowdLevel });
});

module.exports = router;
