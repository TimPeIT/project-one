const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 5000;

app.use(cors());
app.use(express.json());

require('dotenv').config();
const apiKey = process.env.API_KEY;
console.log(`API Key: ${apiKey}`);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// const restaurants = [
//     { id: 1, name: "Tim Raue", city: "Berlin", cuisine: "Asiatisch", rating: 4.8, favorite: false },
//     { id: 2, name: "Tantris", city: "München", cuisine: "Französisch", rating: 4.7, favorite: true },
//     { id: 3, name: "Vorspiel", city: "Hamburg", cuisine: "International", rating: 4.3, favorite: false },
//     { id: 4, name: "Essigbrätlein", city: "Nürnberg", cuisine: "Moderne Küche", rating: 4.6, favorite: false },
//     { id: 5, name: "The Table", city: "Hamburg", cuisine: "Moderne europäische Küche", rating: 4.9, favorite: true },
//     { id: 6, name: "Aqua", city: "Wolfsburg", cuisine: "Modern Kreativ", rating: 4.9, favorite: false },
//     { id: 7, name: "Restaurant Überfahrt", city: "Rottach-Egern", cuisine: "Modern Europäisch", rating: 4.8, favorite: true },
//     { id: 8, name: "Schwarzwaldstube", city: "Baiersbronn", cuisine: "Französisch", rating: 4.9, favorite: true },
//     { id: 9, name: "Horváth", city: "Berlin", cuisine: "Österreichisch", rating: 4.5, favorite: false },
//     { id: 10, name: "Steirereck", city: "Frankfurt am Main", cuisine: "Modern Österreichisch", rating: 4.6, favorite: false },
//     { id: 11, name: "CODA", city: "Berlin", cuisine: "Gourmet-Dessert", rating: 4.7, favorite: true },
//     { id: 12, name: "Le Moissonnier", city: "Köln", cuisine: "Französisch", rating: 4.4, favorite: false },
//     { id: 13, name: "Sosein", city: "Heroldsberg", cuisine: "Kreativ", rating: 4.5, favorite: false },
//     { id: 14, name: "Facil", city: "Berlin", cuisine: "Modern Europäisch", rating: 4.8, favorite: true },
//     { id: 15, name: "Vendôme", city: "Bergisch Gladbach", cuisine: "Französisch modern", rating: 4.9, favorite: true },
//     { id: 16, name: "Lo Studente", city: "Ochsenhauen", cuisine: "Italienisch", rating: 4.2, favorite: false }
// ];

app.get('/api/restaurants' , async (req, res) => {
    try {
        const { city, cuisine, favorite, minRating, maxRating } = req.query;

        const result = [...restaurants];

        if (city) {
            result = result.filter(r => r.city.toLowerCase() === city.toLowerCase());
        }

        if (cuisine) {
            result = result.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
        }

        if (favorite === 'true') {
            result = result.filter(r => r.favorite === true);
        }

        if (minRating) {
            const min = parseFloat(minRating);
            if (!isNaN(min)) {
                result = result.filter(r => r.rating >= min);
            }
        }

        if (maxRating) {
            const min = parseFloat(maxRating);
            if (!isNaN(max)) {
                result = result.filter(r => r.rating <= max);
            }
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Fehler beim Abrufen der Restaurants:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.post('/api/restaurants' , async (req, res) => {
    try {
        const { name, city, cuisine, rating, favorite = false } = req.body;

        if (!name || !city || !cuisine || !rating) {
            return res.status(400).json({ error: 'Name, Stadt, Küche und Bewertung sind erforderlich.' });
        }

        const newRestaurant = {
            id: restaurants.length + 1,
            name,
            city,
            cuisine,
            rating: parseFloat(rating),
            favorite: favorite === 'true'
        };
        restaurants.push(newRestaurant);
        res.status(201).json(newRestaurant);

    } catch (error) {
        console.error('Fehler beim Hinzufügen des Restaurants:', error);
        res.status(500).json({ error: 'Serverfehler beim Erstellen' });

    }
});

app.put('/api/restaurants/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const { name, city, cuisine, rating, favorite } = req.body;

        const restaurant = restaurants.find(r => r.id === parseInt(id));
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant nicht gefunden' });
        }

        if (name) restaurant.name = name;
        if (city) restaurant.city = city;
        if (cuisine) restaurant.cuisine = cuisine;
        if (rating) restaurant.rating = parseFloat(rating);
        if (favorite !== undefined) restaurant.favorite = favorite === 'true';

        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Restaurants:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});



app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`)});
module.exports = app; // Exportiere die App für Tests