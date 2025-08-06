const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [exists] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length > 0) return res.status(409).json({ error: 'E-Mail bereits registriert.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    res.status(201).json({ message: 'Registrierung erfolgreich' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Serverfehler bei der Registrierung' });
  }
};

exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length === 0) return res.status(400).json({ error: 'Ungültige Anmeldedaten' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Falsches Passwort' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '2h' });
    res.json({ token, name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Serverfehler bei der Anmeldung' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const [favs] = await db.query('SELECT * FROM favorites WHERE user_id = ?', [req.user.userId]);
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Laden der Favoriten' });
  }
};

exports.toggleFavorite = async (req, res) => {
    
    try {
        const userId = req.user.userId;
        const { place_id, name, kontakt, bewertung, lat, lng } = req.body;
        const [rows] = await db.query('SELECT id FROM favorites WHERE user_id = ? AND place_id = ?',[userId, place_id]);
    if (rows.length > 0) {
      await db.query('DELETE FROM favorites WHERE user_id = ? AND place_id = ?', [userId, place_id]);
      return res.json({ removed: true });
    } else {
      await db.query(
        `INSERT INTO favorites (user_id, place_id, name, kontakt, bewertung, lat, lng)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, place_id, name, kontakt, bewertung, lat, lng]
      );
      return res.json({ added: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Verwalten der Favoriten' });
  }
};

exports.getProfile = async (req, res) => {
    const userId = req.user.userId;
    const [rows] = await db.execute('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    if (!rows.length) 
        return res.status(404).json({ error: 'Benutzer nicht gefunden'});
    res.json(rows[0]);
}