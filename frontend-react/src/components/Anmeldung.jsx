import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Anmeldung() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [meldung, setMeldung] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMeldung("");
        try {
            const response = await fetch("http://localhost:5173/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
                setMeldung("Anmeldung erfolgreich!");
            } else {
                setMeldung(data.error || "Anmeldung fehlgeschlagen.");
            }
        } catch (err) {
            setMeldung("Serverfehler. Bitte versuche es später erneut.");
        }
    };

    return (
        <div className="container my-4">
            <div className="card p-4 shadow">
                <h3>Anmelden</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>E-Mail</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Passwort</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Anmelden</button>
                </form>
                {meldung && <div className="mt-3">{meldung}</div>}
            </div>
        </div>
    );
}

export default Anmeldung;