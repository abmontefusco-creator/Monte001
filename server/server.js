import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import User from "./models/User.js";  // 👈 importa il modello

dotenv.config();
//console.log("🔍 MONGO_URI =", process.env.MONGO_URI);
const app = express();
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose.connect("mongodb+srv://ue_amontefusco:AQUILOTTO@clusterm2.5cykqpk.mongodb.net/Percipio?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connessione a MongoDB riuscita"))
  .catch(err => console.error("❌ Errore connessione MongoDB:", err.message));

// --- Rotta di test ---
app.get("/", (req, res) => {
  res.send("Server Express collegato a MongoDB!");
});

// --- Rotta API per tutti gli utenti ---
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
