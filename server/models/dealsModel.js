import mongoose from "mongoose";

const dealsSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Deals = mongoose.model("Deals", dealsSchema, "deals");

export default Deals;