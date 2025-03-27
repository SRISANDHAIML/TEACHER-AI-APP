import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // AI-generated assignment text
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }
});

export default mongoose.model("Assignment", AssignmentSchema);
