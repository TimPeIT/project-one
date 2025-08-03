const axios = require('axios');
require('dotenv').config();

const GOOGLE_API_KEY = process.env.API_KEY;

module.exports = function (app) {
  app.get('/api/places/search', async (req, res) => {
    const { city, cuisine, radius } = req.query;
    if (!city) {
      return res.status(400).json({ error: "Parameter 'city' ist erforderlich." });
    }

    try {
      const query = `${cuisine || 'restaurant'} in ${city}`;

      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query,
          radius: radius ? radius * 1000 : 5000, // Umwandlung von km in Meter
          key: GOOGLE_API_KEY
        }
      });

      const results = response.data.results.map((place, index) => ({
        id: index,
        name: place.name,
        kontakt: place.formatted_address,
        bewertung: place.rating ? place.rating.toString() : "Keine",
        location: place.formatted_address,
        lat: place.geometry?.location?.lat,
        lng: place.geometry?.location?.lng
      }));

      res.status(200).json(results);
    } catch (error) {
      console.error('Fehler bei Google Places:', error.message);
      res.status(500).json({ error: 'Fehler beim Abrufen von Restaurants über die Google Places API.' });
    }
  });
};
