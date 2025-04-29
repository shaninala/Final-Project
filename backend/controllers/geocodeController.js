// Import the function to fetch coordinates from the geocode service
const { fetchCoordinatesByZip } = require('../services/geocodeService');


exports.getCoordinatesByZip = async (req, res) => {
  // Extract the zipCode from query parameters
  const { zipCode } = req.query;


  if (!zipCode) {
    return res.status(400).json({ error: 'Zip Code is required' });
  }

  try {
    // Call the service to fetch coordinates using the zip code
    const coordinates = await fetchCoordinatesByZip(zipCode);

    // Respond with the coordinates data
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to get coordinates' });
  }
};
