import express from "express";
import Assignment from "../models/Assignment.js";
import { generateAssignment } from "../geminiService.js";

const router = express.Router();

// ✅ Create an AI-generated Assignment
router.post('/generate-assignment', async (req, res) => {
  const { title, syllabus, difficulty, createdBy } = req.body;

  if (!title || !syllabus || !difficulty || !createdBy) {
    return res.status(400).json({ error: "All fields (title, syllabus, difficulty, createdBy) are required." });
  }

  try {
    console.log("🧠 Generating AI-based assignment for:", syllabus);

    // ✅ Generate AI assignment description
    const assignmentText = await generateAssignment(syllabus);

    // ✅ Create a new Assignment document
    const newAssignment = new Assignment({ 
      title, 
      description: assignmentText, 
      difficulty, 
      createdBy 
    });

    await newAssignment.save();
    res.status(201).json({ 
      message: "✅ Assignment created successfully", 
      assignment: newAssignment 
    });
  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    res.status(500).json({ error: "Failed to generate assignment." });
  }
});

// ✅ Get All Assignments
router.get('/all', async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("createdBy", "name");
    res.json(assignments);
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments." });
  }
});

export default router;
