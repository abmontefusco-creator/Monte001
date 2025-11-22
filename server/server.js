import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";  // ✅ IMPORT ATTIVO
import Contatto from './models/contattoModel.js';
import Attivita from './models/attivitaModel.js';
import Azienda from './models/aziendaModel.js';
import Chats from './models/chatsModel.js';
import Deals from './models/dealsModel.js';
import Events from './models/eventsModel.js';
import Messaggi from './models/messaggiModel.js';
import News from './models/newsModel.js';
import Progetti from './models/progettiModel.js';
import SandboxNotes from "./models/sandboxNotesModel.js";
import Timesheet from "./models/timesheetModel.js";

console.log("✅ SERVER JS IN ESECUZIONE DA:", process.cwd());
console.log("✅ Model User importato:",  User);

const app = express();
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose.connect("mongodb+srv://ue_amontefusco:AQUILOTTO@clusterm2.5cykqpk.mongodb.net/Percipio?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connessione a MongoDB riuscita"))
  .catch(err => console.error("❌ Errore connessione MongoDB:", err.message));


console.log('Checkpoint'); // per vedere se il server arriva lì
debugger;

import { ObjectId } from "mongodb";

app.get("/api/users/:id", async (req, res) => {
    let userId = req.params.id;

    // Se è un ObjectId valido, converti
    if (ObjectId.isValid(userId)) {
        userId = new ObjectId(userId);
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
});

// Rotta API
app.get("/api/users", async (req, res) => {
  try {
    //console.log("🔥 Rotta /api/users chiamata");
    //console.log("🔥 Tipo di User:", typeof User);

    const users = await User.find().lean();
    res.json(users);
    console.log(users);

  } catch (err) {
    console.error("❌ Errore API:", err);
    res.status(500).json({ error: err.message });
  }
});

  // Rotta test
app.get("/", (req, res) => {
  console.log("Server Express collegato a MongoDB!");
  res.send("Server Express collegato a MongoDB!");
});

app.get("/api/contatti", async (req, res) => {
  //const Contatto = getModel("contatti");   // il tuo modello generico
  const data = await Contatto.find().lean();
  res.json(data);
});

app.get("/api/attivita", async (req, res) => {
  //const Contatto = getModel("contatti");   // il tuo modello generico
  const data = await Attivita.find().lean();
  res.json(data);
});

app.get("/api/azienda", async (req, res) => {
  //const Contatto = getModel("contatti");   // il tuo modello generico
  const data = await Azienda.find().lean();
  res.json(data);
});

app.get("/api/chats", async (req, res) => {
  const data = await Chats.find().lean();
  res.json(data);
});

app.get("/api/deals", async (req, res) => {
  const data = await Deals.find().lean();
  res.json(data);
});

app.get("/api/events", async (req, res) => {
  const data = await Events.find().lean();
  res.json(data);
});

app.get("/api/messaggi", async (req, res) => {
  const data = await Messaggi.find().lean();
  res.json(data);
});

app.get("/api/news", async (req, res) => {
  const data = await News.find().lean();
  res.json(data);
});

app.get("/api/progetti", async (req, res) => {
  const data = await Progetti.find().lean();
  res.json(data);
});

app.get("/api/sandboxNotes", async (req, res) => {
  const data = await SandboxNotes.find().lean();
  res.json(data);
});

app.get("/api/timesheet", async (req, res) => {
  const data = await Timesheet.find().lean();
  res.json(data);
});

app.get("/api/timesheet/:id", async (req, res) => {
    let timesheetId = req.params.id;

    // Se è un ObjectId valido, converti
    if (ObjectId.isValid(timesheetId)) {
        userId = new ObjectId(timesheetId);
    }

    const data = await User.findById(timesheetId);
    if (!data) return res.status(404).json({ error: "timesheet not found" });

    res.json(data);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
