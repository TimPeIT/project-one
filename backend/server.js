const express = require("express");
const cors = require("cors");
const placesRoutes = require("./routes/places");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/places", placesRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
