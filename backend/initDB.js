const fs = require('fs');
const db = require('./db');

(async () => {
  try {
    await db.query(`CREATE DATABASE IF NOT EXISTS restaurant_guide_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log('Datenbank erfolgreich erstellt oder bereits vorhanden.');

  } catch (err) {
    console.error("Fehler bei der DB-Erstellung:", err);
  }

  const sql = fs.readFileSync('./datenbank.sql', 'utf8');
  try {
    await db.query(sql); // sql darf dann KEIN `USE` mehr enthalten!
    console.log('Datenbankstruktur erfolgreich importiert!');
  } catch (err) {
    console.error('Fehler beim Import:', err);
  }
})();
