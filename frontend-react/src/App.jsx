import React, { useEffect, useState } from "react";
import RestaurantList from "./components/RestaurantsList";
import { Routes, Route, Link } from "react-router-dom";
import Registrierung from "./components/registrierung";
import Anmeldung from "./components/Anmeldung";
import Home from "./components/Home"; 

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
        {/* <p className="small text-muted">{datumUhrzeit}</p> */}
      </header>
        <div>
          <nav className="text-center mt-2">
            <Link to="/" className="btn btn-outline-secondary me-2">Home</Link> |{" "}
            <Link to="/anmeldung" className="btn btn-outline-primary me-2">Anmeldung</Link> |{" "}
            <Link to="/register" className="btn btn-outline-success">Registrierung</Link> |{" "}
          </nav>
        </div>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anmeldung" element={<Anmeldung />} />
            <Route path="/register" element={<Registrierung />} />
          </Routes> 
        </main>

      <RestaurantList />
    <footer className="text-center mt-4 mb-3">
      <p>© 2025 Restaurant Guide Finder · <a href="#">Impressum</a></p>
    </footer>
    </>
  );
}

export default App;
