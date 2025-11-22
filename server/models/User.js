import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   _id: { type: String },  
  nome: String,
  email: String,
  tenantId: String,
});

const User = mongoose.model("User", userSchema);
export default User;
