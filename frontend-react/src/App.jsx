import React, { useEffect } from "react";
import RestaurantList from "./components/RestaurantList";

function App() {
  useEffect(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Berlin",
    });
    const el = document.getElementById("date-time");
    if (el) el.textContent = formatter.format(now) + " (MEZ)";
  }, []);

  return (
    <>
      <header className="text-center p-3 bg-light shadow-sm">
        <h1>Restaurant Guide Finder</h1>
      </header>
      <RestaurantList />
      <footer className="text-center mt-4 mb-3">
        <p>© 2025 Restaurant Guide Finder · <a href="#">Impressum</a></p>
      </footer>
    </>
  );
}

export default App;
