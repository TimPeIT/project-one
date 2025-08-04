const express = require("express");
const router = express.Router();


// Hilfsfunktion fürs allgemeine Daten holen per Fetch
async function fetchFromGoogleApi(endpoint, params) {
  const baseUrl = `https://maps.googleapis.com/maps/api/${endpoint}`;
  const searchParams = new URLSearchParams({ ...params, API_KEY });

  const response = await fetch(`${url}?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error(`Google API Fehler ${response.statusText}`);
  }

  return response.json()
}

// Hilfsfunktion: Stadtname in Koordinaten umwandeln
async function getCoordinatesFromCity(city) {
  const data = await fetchFromGoogleApi("place/nearbysearch/json", { address: city })
  if (!data.results || data.results.length === 0) {
    throw new Error("Diese Koordinaten wurden nicht gefunden");
  }
  return data.results[0].geometry.location;
}

// Haupt-Route für die Suche
router.get("/search", async (req, res) => {
  const { city, cuisine, radius } = req.query;

  if (!city || !radius) {
    return res.status(400).json({ error: "Stadt und Radius sind erforderlich." });
  }

  try {
    const location = await getCoordinatesFromCity(city);

    const data = await fetchFromGoogleApi("place/nearbysearch/json", {
      location: `${location.lat},${location.lng}`,
      radius: parseInt(radius) * 1000, // km → m
      keyword: cuisine || "restaurant",
      type: "restaurant",
      language: "de",
    })

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
