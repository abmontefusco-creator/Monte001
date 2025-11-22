import mongoose from "mongoose";

const progettiSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Progetti = mongoose.model("Progetti", progettiSchema, "progetti");

export default Progetti;