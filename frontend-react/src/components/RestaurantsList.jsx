import React, { useRef, useState } from "react";
import RestaurantItem from "./RestaurantItem";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const plzRef = useRef();
  const queryRef = useRef();
  const radiusRef = useRef();

  const fetchRestaurants = async () => {
    const city = plzRef.current?.value || "";
    const cuisine = queryRef.current?.value || "";
    const radius = radiusRef.current?.value || "";

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/places/search?city=${city}&cuisine=${cuisine}&radius=${radius}`
      );
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      console.error("Fehler beim Abrufen:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Suchformular */}
      <div className="container my-4">
        <div className="card p-4 shadow">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                ref={queryRef}
                type="text"
                className="form-control"
                placeholder="Gericht oder Land suchen..."
              />
            </div>
            <div className="col-md-2">
              <input
                ref={plzRef}
                type="text"
                className="form-control"
                placeholder="Postleitzahl"
              />
            </div>
            <div className="col-md-2">
              <input
                ref={radiusRef}
                type="number"
                className="form-control"
                placeholder="Radius (km)"
              />
            </div>
            <div className="col-md-2">
              <select className="form-select">
                <option disabled selected>
                  Bewertung
                </option>
                <option value="5">5 Sterne</option>
                <option value="4">4 Sterne</option>
                <option value="3">3 Sterne</option>
                <option value="2">2 Sterne</option>
                <option value="1">1 Stern</option>
              </select>
            </div>
            <div className="col-md-2">
              <button onClick={fetchRestaurants} className="btn btn-primary w-100">
                Suchen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ergebnisliste */}
      <div className="container">
        <div className="card p-4 shadow">
          <h4 className="mb-3">Gefundene Restaurants</h4>
          {loading ? (
            <p>Lade Restaurants...</p>
          ) : restaurants.length === 0 ? (
            <p>Keine Restaurants gefunden.</p>
          ) : (
            <ul className="list-group">
              {restaurants.map((res) => (
                <RestaurantItem key={res.id} restaurant={res} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default RestaurantList;
