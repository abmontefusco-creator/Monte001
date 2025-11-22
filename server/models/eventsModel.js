import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Events = mongoose.model("Events", eventsSchema, "events");

export default Events;