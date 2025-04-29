// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware Setup
app.use(cors()); // Enable CORS so frontend can talk to the backend
app.use(express.json()); // Parse incoming JSON requests

// Import and use gas station search routes 
const placesRoutes = require('./routes/placesRoutes');
app.use('/api/places', placesRoutes);

// Google API Key from your .env file
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Geocode Route - Convert Zip Code to Coordinates
app.get('/api/geocode', async (req, res) => {
  const zipCode = req.query.zipCode;

  // Validate request
  if (!zipCode) {
    return res.status(400).json({ error: 'Zip Code is required' });
  }

  try {
    // Call Google Geocoding API
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: zipCode,
          key: GOOGLE_API_KEY,
        },
      }
    );

    // Check if response is OK
    if (geocodeResponse.data.status === 'OK') {
      return res.json(geocodeResponse.data); // Send coordinates and address info
    } else {
      // Google API may return errors in the error_message field
      return res.status(400).json({
        error: geocodeResponse.data.error_message || 'Geocoding failed',
      });
    }
  } catch (error) {
    console.error('Geocoding error:', error.message); // Log server-side error
    return res.status(500).json({ error: 'Error retrieving geocode data.' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
