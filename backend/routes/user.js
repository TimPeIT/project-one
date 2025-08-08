const express = require('express');
const router = express.Router();
const { verify } = require('../authMiddleware');
const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET

router.get("/", verify, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, email FROM users WHERE id = ?`,
      [req.user.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Benutzer nicht gefunden" });
    }
    // Hier wird der Benutzer zurückgegeben, ohne das Passwort
    res.json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email
    });
  } catch (err) {
    console.error("Fehler beim Abrufen des Benutzers:", err.message);
    res.status(500).json({ error: "Serverfehler" });
  }
});

module.exports = router;