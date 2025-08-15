import React, { useEffect, useState } from "react";

function FavouritesList() {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error("Fehler beim Abrufen der Favoriten");
      }

      const data = await res.json();
      setFavourites(data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Favoriten:", error);
      setFavourites([]);
    }
  };

  const deleteFavourite = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:5000/api/favorite/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Fehler beim Löschen");
    }

    fetchFavourites();
  } catch (error) {
    console.error("Fehler beim Löschen des Favoriten:", error);
  }
};

  useEffect(() => {
    fetchFavourites();
  }, []);



  return (
    <div>
      <h3>Favoriten</h3>
      <ul className="list-group">
        {favourites.map((restaurant) => (
          <li key={restaurant.id} className="list-group-item d-flex align-items-center">
            <div>
              <span style={{ fontSize: 20, marginRight: 8 }}>❤️</span>
              <span>{restaurant.name}</span>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => deleteFavourite(restaurant.id)}>
              Entfernen
            </button>
          </li>
        ))}
      </ul>
      </div>);
   }

export default FavouritesList;
