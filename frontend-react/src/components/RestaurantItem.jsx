import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function RestaurantItem({ restaurant }) {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [stars, setStars] = useState(0);
  const [isfavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      const favs = JSON.parse(stored);
      setIsFavourite(favs.some((f) => f.id === restaurant.id));
    }
  }, [restaurant.id]);

  const toggleFavourite = () => {
    let favs = JSON.parse(localStorage.getItem("favourites")) || [];
    if(isfavourite) {
      favs = favs.filter((f) => f.id !== restaurant.id);
    } else {
      favs.push(restaurant);
    }
    localStorage.setItem("favourites", JSON.stringify(favs));
    setIsFavourite(!isfavourite);
  }

  useEffect(() => {
  if (showMap && mapRef.current && !mapInstanceRef.current) {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: restaurant.lat, lng: restaurant.lng },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map,
        title: restaurant.name,
      });

      mapInstanceRef.current = map;
    }).catch((err) => {
      console.error("Fehler beim Laden von Google Maps:", err);
    });
  }
}, [showMap, restaurant]);


  return (
    <li className="list-group-item d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{restaurant.name}</strong>
          <br />
          <small>{restaurant.kontakt}</small>
          <br />
          <small>
            Bewertung: ({restaurant.bewertung})
          </small>
        </div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Schließen" : "Karte"}
        </button>
        <button
        className={`btn btn-sm ${isfavourite ? "btn-danger" : "btn-outline-danger"}`}
        onClick={toggleFavourite}
        title={isfavourite ? "Aus Favoriten enternen" : "Zu Favoriten hinzufügen"}
        >❤️</button>
      </div>
      {showMap && (
        <div className="mt-3">
          <div
            ref={mapRef}
            style={{ height: "300px", width: "100%" }}
            className="border rounded"
          />
        </div>
      )}
    </li>
  );
}

export default RestaurantItem;
