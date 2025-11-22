import mongoose from "mongoose";

const contattoSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Contatto = mongoose.model("Contatto", contattoSchema, "contatti");

export default Contatto;