const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

exports.fetchCoordinatesByZip = async (zipCode) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: zipCode,
        key: GOOGLE_API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error('Geocoding failed');
    }

    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error('Geocode API error:', error);
    throw new Error('Failed to fetch coordinates.');
  }
};
