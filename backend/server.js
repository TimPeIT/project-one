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

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Registrierung-Logik...
  res.json({ message: "Registrierung erfolgreich!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "E-Mail und Passwort sind erforderlich." });
  } 
  res.json({ message: "Anmeldung erfolgreich!", token: "example-token" }); 
});



app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
