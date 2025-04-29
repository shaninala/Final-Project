const express = require('express');
const router = express.Router();
const { getCoordinatesByZip } = require('../controllers/geocodeController');

// Route: GET /api/geocode?zipCode=12345 example
router.get('/', getCoordinatesByZip);

module.exports = router;