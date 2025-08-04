const express = require("express");
const { URLSearchParams } = require("url");
const router = express.Router();




// Hilfsfunktion: Stadtname in Koordinaten umwandeln
async function getCoordinatesFromCity(city) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;
  const searchParams = new URLSearchParams({...params, API_KEY})
  const response = await fetch(`${url}?${searchParams.toString()}`)

  if (response.data.results.length === 0) {
    throw new Error("Keine Koordinaten gefunden.");
  }

  const location = response.data.results[0].geometry.location;
  return location; // { lat: 52.52, lng: 13.405 }
}

// Haupt-Route für die Suche
router.get("/search", async (req, res) => {
  const { city, cuisine, radius } = req.query;

  if (!city || !radius) {
    return res.status(400).json({ error: "Stadt und Radius sind erforderlich." });
  }

  try {
    const location = await getCoordinatesFromCity(city);

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

    const response = await axios.get(url, {
      params: {
        key: GOOGLE_API_KEY,
        location: `${location.lat},${location.lng}`,
        radius: parseInt(radius) * 1000, // km → m
        keyword: cuisine || "restaurant",
        type: "restaurant",
        language: "de",
      },
    });

    const results = response.data.results.map((place) => ({
      id: place.place_id,
      name: place.name,
      kontakt: place.vicinity,
      bewertung: place.rating?.toString() || "Keine",
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }));

    res.json(results);
  } catch (err) {
    console.error("Fehler bei der Google Places API:", err.message);
    res.status(500).json({ error: "Fehler bei der Restaurant-Suche." });
  }
});

module.exports = router;
