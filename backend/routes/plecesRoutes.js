const express = require("express");
const router = express.Router();
const { getNearbyGasStations } = require("../controllers/placesController");

// Route to get stations by lat/lng
router.get("/", getNearbyGasStations);

module.exports = router;