import React, { useEffect, useState } from "react";

function FavouritesList() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorite")) || [];
    setFavourites(favs);
  }, []);

  return (
    <div>
      <h3>Favoriten</h3>
      <ul className="list-group">
        {favourites.map((restaurant) => (
          <li key={restaurant.id} className="list-group-item d-flex align-items-center">
            <img src="./icons/herz.png" alt="Herz" style={{ width: 24, marginRight: 8 }} />
            <span>{restaurant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritesList;