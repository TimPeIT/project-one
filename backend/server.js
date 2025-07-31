const express = require('expres');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const restaurants = [
    { id: 1, name: "Tim Raue", city: "Berlin", cuisine: "Asiatisch", rating: 4.8, favorite: false },
    { id: 2, name: "Tantris", city: "München", cuisine: "Französisch", rating: 4.7, favorite: true },
    { id: 3, name: "Vorspiel", city: "Hamburg", cuisine: "International", rating: 4.3, favorite: false },
    { id: 4, name: "Essigbrätlein", city: "Nürnberg", cuisine: "Moderne Küche", rating: 4.6, favorite: false },
    { id: 5, name: "The Table", city: "Hamburg", cuisine: "Moderne europäische Küche", rating: 4.9, favorite: true },
    { id: 6, name: "Aqua", city: "Wolfsburg", cuisine: "Modern Kreativ", rating: 4.9, favorite: false },
    { id: 7, name: "Restaurant Überfahrt", city: "Rottach-Egern", cuisine: "Modern Europäisch", rating: 4.8, favorite: true },
    { id: 8, name: "Schwarzwaldstube", city: "Baiersbronn", cuisine: "Französisch", rating: 4.9, favorite: true },
    { id: 9, name: "Horváth", city: "Berlin", cuisine: "Österreichisch", rating: 4.5, favorite: false },
    { id: 10, name: "Steirereck", city: "Frankfurt am Main", cuisine: "Modern Österreichisch", rating: 4.6, favorite: false },
    { id: 11, name: "CODA", city: "Berlin", cuisine: "Gourmet-Dessert", rating: 4.7, favorite: true },
    { id: 12, name: "Le Moissonnier", city: "Köln", cuisine: "Französisch", rating: 4.4, favorite: false },
    { id: 13, name: "Sosein", city: "Heroldsberg", cuisine: "Kreativ", rating: 4.5, favorite: false },
    { id: 14, name: "Facil", city: "Berlin", cuisine: "Modern Europäisch", rating: 4.8, favorite: true },
    { id: 15, name: "Vendôme", city: "Bergisch Gladbach", cuisine: "Französisch modern", rating: 4.9, favorite: true }
];

app.get('/api/restaurants', (req, res) => {
    const { city, cuisine, favorite, minRating, maxRating } = req.query;

    let result = [...restaurants];

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
        if(!isNaN(max)) {
        result = result.filter(r => r.rating <= max);
        }
    }

    
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});