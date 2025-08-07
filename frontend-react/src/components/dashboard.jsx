import React, { useEffect, useState } from "react";

function Dashboard() {
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        const fetchFavourites = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/favorites", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setFavourites(data);
        };
        fetchFavourites();
    }, []);


    const removeFavourite = (id) => {
        const updated = favourites.filter((res) => res.id !== id);
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
                        {favourites.map((res) => (
                            <li
                                key={res.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{res.name}</strong>
                                    <br />
                                    <small>{res.kontakt}</small>
                                </div>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeFavourite(res.id)}
                                >
                                    Entfernen
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;