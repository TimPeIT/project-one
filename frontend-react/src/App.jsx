import React, { useEffect, useState } from "react";
import RestaurantList from "./components/RestaurantsList";
import { Routes, Route, Link } from "react-router-dom";
import Registrierung from "./components/registrierung";
import Anmeldung from "./components/Anmeldung";
import Home from "./components/Home"; 
import Dashboard from "./components/dashboard";
import Privat from "./components/Privat";
import FavouritesList from "./components/FavouritesList";

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
        {/* <p className="small text-muted">{datumUhrzeit}</p> */}
      </header>
        <div>
          <nav className="text-center mt-2">
            <Link to="/" className="btn btn-outline-secondary me-2">Home</Link> |{" "}
            <Link to="/dashboard" className="btn btn-outline-info me-2">Dashboard</Link> |{" "}
            <Link to="/anmeldung" className="btn btn-outline-primary me-2">Anmeldung</Link> |{" "}
            <Link to="/register" className="btn btn-outline-success">Registrierung</Link> |{" "}
            <Link to="/favourites" className="btn btn-outline-danger">Favoriten</Link>
          </nav>
        </div>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <Privat>
                <Dashboard />
              </Privat>
            }/>
            <Route path="/anmeldung" element={<Anmeldung />} />
            <Route path="/register" element={<Registrierung />} />
            <Route path="/favourites" element={<FavouritesList />} />
          </Routes> 
        </main>

      <RestaurantList />
    <footer className="text-center mt-4 mb-3">
      <p>© 2025 DineFinder · <a href="#">Impressum</a></p>
    </footer>
    </>
  );
}

export default App;
