import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Chats = mongoose.model("Chats", chatsSchema, "chats");

export default Chats;