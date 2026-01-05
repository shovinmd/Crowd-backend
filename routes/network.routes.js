const express = require('express');
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const predictionController = require("../controllers/predict.controller");
const transportController = require("../controllers/transport.controller");

// Feedback routes
router.post("/feedback", feedbackController.submitFeedback);

// Prediction routes
router.post("/predict", predictionController.predictCrowd);

// Transport routes
router.get('/transport/modes', transportController.getTransportModes);
router.get('/transport/lines/:mode', transportController.getTransportLines);
router.get('/transport/stations/:mode/:line', transportController.getTransportStations);
router.get('/routes', transportController.getRouteHistory);
router.get('/popular-routes', transportController.getPopularRoutes);

// Existing network route
router.get("/network", transportController.getTransportNetwork);

module.exports = router;
