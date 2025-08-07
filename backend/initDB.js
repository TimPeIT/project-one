const fs = require('fs');
const db = require('./db');

(async () => {
  const sql = fs.readFileSync('./datenbank.sql', 'utf8');
  try {
    await db.query(sql);
    console.log('Datenbankstruktur erfolgreich importiert!');
  } catch (err) {
    console.error('Fehler beim Import:', err);
  }
})();
