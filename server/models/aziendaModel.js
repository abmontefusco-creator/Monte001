import mongoose from "mongoose";

const aziendaSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Azienda = mongoose.model("Azienda", aziendaSchema, "aziende");

export default Azienda;