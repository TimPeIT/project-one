import React, { useEffect, useState } from "react";

function Dashboard() {
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchUser = async () => {
            const res = await fetch("http://localhost:5000/api/user", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                console.error("Fehler beim Abrufen des Benutzers");
                return;
            }
            const data = await res.json();
            setUser(data);
        };

        const fetchFavourites = async () => {
            if (!token) {
                console.error("Kein Token gefunden");
                return;
            }
            const res = await fetch("http://localhost:5000/api/favorites", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                console.error("Fehler beim Abrufen der Favoriten");
                return;
            }
            const data = await res.json();
            setFavourites(data);
        };

        fetchUser();
        fetchFavourites();
    }, []);

    const removeFavourite = (id) => {
        const updated = favourites.filter((res) => res.id !== id);
        setFavourites(updated);
    };

    return (
        <div className="container my-4">
            <div className="mb-4 d-flex align-items-center">
                <h3 className="mb-0">
                    Angemeldet als {user && user.name}
                </h3>
                <button
                    className="btn btn-sm btn-secondary ms-3"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                >
                    Abmelden
                </button>
            </div>

            {favourites.length === 0 ? (
                <p>Keine Favoriten gespeichert.</p>
            ) : (
                <ul className="list-group mt-3">
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
    );
}

export default Dashboard;