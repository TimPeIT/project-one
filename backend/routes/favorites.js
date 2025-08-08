const express = require('express');
const db = require('../db');
const router = express.Router();
const SECRET = process.env.JWT_SECRET;
const { verify } = require('../authMiddleware');



router.post("/api/favorite", verify, async (req, res) => {
    const user_id = req.user.userId;
    const { place_id, name, kontakt, bewertung, lat, lng } = req.body;

    try {
        await db.query(
            `INSERT INTO favorites (user_id, place_id, name, kontakt, bewertung, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, place_id, name, kontakt, bewertung, lat, lng]
        );
        res.status(201).json({ message: "Favorit gespeichert" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Speichern in DB" });
    }
});

// DELETE /api/favorites/:id
router.delete("/api/favorite/:restaurant_id", verify, async (req, res) => {
  const  userId  = req.user.userId;
  const restaurantId = req.params.restaurant_id

  try {
    await db.query("DELETE FROM favorites WHERE place_id = ? AND user_id = ?", [restaurantId, userId]);
    res.status(200).json({ message: "Favorit gelöscht" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Löschen des Favoriten" });
  }
});

// GET /api/favorites
router.get("/api/favorite", verify, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [favorites] = await db.query("SELECT * FROM favorites WHERE user_id = ?", [userId]);
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Abrufen der Favoriten" });
  }
});


module.exports = router;