const express = require("express");
const cors = require("cors");
const placesRoutes = require("./routes/places");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use("/api/places", placesRoutes);

app.get("/", (req,res)=>{
  console.log("Hallo Welt");
  res.send("Hallo Welt")
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
