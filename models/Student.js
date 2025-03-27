import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

export default mongoose.model("Student", StudentSchema);
