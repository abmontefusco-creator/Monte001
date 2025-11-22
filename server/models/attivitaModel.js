import mongoose from "mongoose";

const attivitaSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Attivita = mongoose.model("Attivita", attivitaSchema, "attivita");

export default Attivita;