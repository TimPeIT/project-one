import React, { useEffect, useRef, useState } from "react";
import { getSterneIcons } from "../utils/helpers";

function RestaurantItem({ restaurant }) {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (showMap && mapRef.current && !mapInstanceRef.current) {
      const { google } = window;
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: restaurant.lat, lng: restaurant.lng },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: mapInstanceRef.current,
        title: restaurant.name,
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
            Bewertung: {getSterneIcons(restaurant.bewertung)} ({restaurant.bewertung})
          </small>
        </div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Schließen" : "Karte"}
        </button>
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
