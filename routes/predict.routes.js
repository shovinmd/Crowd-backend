const express = require("express");
const router = express.Router();
const predictController = require("../controllers/predict.controller");

router.get("/dashboard", predictController.getDashboardData);
router.post("/", predictController.predictCrowd);

module.exports = router;
