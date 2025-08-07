const db = require("./db");

(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("Verbindung erfolgreich! Ergebnis:", rows[0].result); // Sollte 2 sein
    process.exit(0);
  } catch (err) {
    console.error("Fehler bei der DB-Verbindung:", err.message);
    process.exit(1);
  }
})();
