const express = require("express");
const cors = require("cors");
const auth = require('./authController');
const authMW = require('./authMiddleware');

const app = express();
const PORT = 5000;

app.use(cors(), express.json());

app.post('/api/register', auth.register);
app.post('/api/login', auth.login);
app.get('/api/favorites', authMW.verify, auth.getFavorites);
app.post('/api/favorite', authMW.verify, auth.toggleFavorite);
app.get('/api/profile', authMW.verify, auth.getProfile);


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
