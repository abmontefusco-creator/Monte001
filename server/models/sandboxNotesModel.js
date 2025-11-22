
import mongoose from "mongoose";

const sandboxNotesSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const SandboxNotes = mongoose.model("SandboxNotes", sandboxNotesSchema, "sandboxNotes");

export default SandboxNotes;