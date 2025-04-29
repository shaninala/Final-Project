const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// In-memory cache to store fetched gas stations data by location
let cachedStations = {}; 

const fetchNearbyGasStations = async (lat, lng) => {
  const cacheKey = `${lat}_${lng}`; //  = unique key for each location

  // Check if cached data exists for this specific location
  if (cachedStations[cacheKey]) {
    console.log(`Returning cached gas stations for location (${lat}, ${lng})...`);
    return cachedStations[cacheKey];
  }

  const radius = 5000; // 5km 
  const type = "gas_station";

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status !== "OK") {
      throw new Error("Google Places API request failed.");
    }

   
    const enrichedStations = await Promise.all(
      response.data.results.map(async (place) => {
        const { place_id, name, vicinity, geometry } = place;
        const { lat: stationLat, lng: stationLng } = geometry.location;

        // Get address details (city, zip code)
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${stationLat},${stationLng}&key=${GOOGLE_API_KEY}`;
        const geocodeResponse = await axios.get(geocodeUrl);

        let city = "";
        let zipCode = "";
        if (geocodeResponse.data.status === "OK") {
          const components = geocodeResponse.data.results[0]?.address_components || [];
          components.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              zipCode = component.long_name;
            }
          });
        }

        return {
          id: place_id,
          name,
          address: vicinity,
          city,
          zipCode,
          fuelTypes: ["Regular", "Premium", "Diesel", "Midgrade"],
          selfService: true,
          price: {
            regular: +(Math.random() * (4 - 3) + 3).toFixed(2),
            premium: +(Math.random() * (4.5 - 3.5) + 3.5).toFixed(2),
            diesel: +(Math.random() * (4.2 - 3.2) + 3.2).toFixed(2),
            midgrade: +(Math.random() * (4.3 - 3.3) + 3.3).toFixed(2), 
          },
        };
      })
    );

    // Save the enriched data to the cache for this location
    cachedStations[cacheKey] = enrichedStations;
    console.log(`Caching gas stations for location (${lat}, ${lng})...`);
    return enrichedStations;
  } catch (error) {
    console.error("Error fetching gas stations:", error.message);
    throw new Error("Failed to fetch gas station data.");
  }
};

// Function to manually clear the entire cache
const clearCache = () => {
  cachedStations = {};
  console.log("Cache cleared.");
};

module.exports = { fetchNearbyGasStations, clearCache };
