const jwt = require('jsonwebtoken');
const db = require('./db');
const JWT_SECRET = process.env.JWT_SECRET


exports.verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Kein gültiger Token im Header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Fehler:", error.message);
    return res.status(403).json({ error: 'Token ungültig' });
  }
};