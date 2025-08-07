const express = require('express');
const router = express.Router();
const { verify } = require('../authMiddleware');
const db = require("../db");

router.get("/me", verify, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Benutzer nicht gefunden" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Fehler beim Abrufen des Benutzers:", err.message);
    res.status(500).json({ error: "Serverfehler" });
  }
});

module.exports = router;