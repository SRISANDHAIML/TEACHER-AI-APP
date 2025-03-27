import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("Teacher", TeacherSchema);
