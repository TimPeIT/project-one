import React, { useEffect, useState } from "react";

function Dashboard() {
    const [favourites, setFavourites] = useState([]),

    useEffect(() => {
        const stored = localStorage.getItem("favourites");
        if (stored) {
            setFavourites(JSON.parse(stored));
        }
    }, []);

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
};

return (
    <div className="container my-4">
        <div className="card p-4 shadow">
            {favourites.length === 0 ? (
                <p>Keine Favoriten gespeichert.</p>
            ) : (
                <ul className="list-group">
                    <li key={res.id} className="list-group item d-flex justify-content-between">
                        <div>
                            <strong>{res.name}</strong>
                            <br />
                            <small>{res.kontakt}</small>
                        </div>
                        <button className="btn btn-sm btn-danger" onclick={() => removeFavourite(res.id)}>Entfernen</button>
                    </li>
                </ul>
            )}
        </div>
    </div>
);


export default Dashboard;