const express = require("express");
const cors = require("cors");
const auth = require('./authController');
const authMW = require('./authMiddleware');
const placesRoutes = require('./routes/places');
const userdash = require('./routes/user');
require("dotenv").config();
const db = require('./db');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser')
const initDB = require('./initDB');
const favorites = require('./routes/favorites');


app.use(cors(
  { origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}
));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/user", userdash);
app.use("/api/places", placesRoutes);
app.post('/api/register', auth.register);
app.post('/api/login', auth.login);
app.use('/api/favorites', authMW.verify, require('./routes/favorites'));
app.get('/api/favorites', authMW.verify, auth.getFavorites);
app.post('/api/favorite', authMW.verify, auth.toggleFavorite);
app.get('/api/profile', authMW.verify, auth.getProfile);


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
