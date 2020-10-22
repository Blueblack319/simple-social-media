import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model("User", userSchema);
