const { fetchNearbyGasStations } = require('../services/googlePlacesService');

// Controller to handle API requests for fetching nearby gas stations
exports.getNearbyGasStations = async (req, res) => {
  // Extract latitude and longitude from query parameters
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    // Use the service to fetch gas stations near the given coordinates
    const stations = await fetchNearbyGasStations(lat, lng);

    // Respond with the list of gas stations
    res.json(stations);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch gas stations.' });
  }
};
