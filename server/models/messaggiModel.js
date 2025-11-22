import mongoose from "mongoose";

const messaggiSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Messaggi = mongoose.model("Messaggi", messaggiSchema, "messaggi");

export default Messaggi;