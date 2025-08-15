import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function RestaurantItem({ restaurant }) {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [stars, setStars] = useState(0);
  const [isfavourite, setIsFavourite] = useState(false)

  const toggleFavourite = async () => {
    const token = localStorage.getItem("token");
    if(isfavourite) {
      try {
      const response = await fetch(
        `http://localhost:5000/api/favorite/${restaurant.id}`, {
          method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setIsFavourite(false);
      console.log("Favorit gesetzt?", isfavourite);
    } catch (err) {
      console.error("Fehler beim Abrufen:", err);
    } 
    } else {
      try {
      const response = await fetch(
        `http://localhost:5000/api/favorite`, {
          method: "POST",
                headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
               },
                body: JSON.stringify({
                    place_id: restaurant.id,
                    name: restaurant.name,
                    kontakt: restaurant.kontakt,
                    bewertung: restaurant.bewertung,
                    lat: restaurant.lat,
                    lng: restaurant.lng
                })
        }
      );
      const data = await response.json();
      setIsFavourite(true);
      console.log("Favorit gesetzt?", isfavourite);
    } catch (err) {
      console.error("Fehler beim Abrufen:", err);
    } 
    }
  }

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const token = localStorage.getItem("token");
      if(!token) return;

      try {
        const response = await fetch(`http://localhost:5000/api/favorite/${restaurant.id}`,
          {method: "GET", headers: { Authorization: `Bearer ${token}`},
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen des Favoritenstatus");
        }

        const data = await response.json();
        setIsFavourite(data.isfavourite);
      } catch (err) {
        console.error("Fehler beim Abrufen des Favoritenstatus:", err);
      }
    };

    fetchFavoriteStatus();
  }, [restaurant.id]);

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


useEffect(()=>{
  console.log(restaurant);
}, [])


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
        <div className="ms-auto d-flex gap-2">
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
