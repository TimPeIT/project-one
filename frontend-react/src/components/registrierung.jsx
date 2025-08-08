import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registrierung() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [meldung, setMeldung] = useState("");
    const isPasswordValid = password.length >= 8;
    const passwordMatches = password === confirmPassword;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMeldung("");
        if (password !== confirmPassword) {
            setMeldung("Passwörter stimmen nicht überein.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMeldung("Registrierung erfolgreich!");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => navigate("/anmeldung"), 2000);
            } else {
                setMeldung(data.error || "Fehler bei der Registrierung. Überprüfen Sie Ihre Eingaben.");
            }
        } catch (err) {
            setMeldung("Serverfehler. Bitte versuchen Sie es später erneut.");
        }
    };

    return (
        <div className="container my-4">
            <div className="card p-4 shadow">
                <h3>Registrieren</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label>Passwort wiederholen</label>
                        <input
                          type="password"
                          className="form-control"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          required
                        />
                        {!isPasswordValid && password && (
                            <div className ="text-danger mt-2">
                                <p className ="text-danger mt-2">Passwort muss mindestens 8 Zeichen lang sein. </p>
                            </div>
                        )}
                        {!passwordMatches && confirmPassword && (
                            <div className ="text-danger mt-2">
                                <p className ="text-danger mt-2">Passwort stimmen nicht überein. </p>
                            </div>
                        )}
                        {isPasswordValid && passwordMatches && (
                            <div className ="text-danger mt-2">
                                <p className ="text-danger mt-2">Registrierung erfolgreich! </p>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Registrieren</button>
                </form>
                {meldung && <div className="mt-3">{meldung}</div>}
            </div>
        </div>
    );
}

export default Registrierung;