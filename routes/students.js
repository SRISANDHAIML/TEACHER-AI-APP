import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Add Student
router.post("/", async (req, res) => {
  const { name, email, teacherId } = req.body;
  try {
    const student = new Student({ name, email, teacherId });
    await student.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding student" });
  }
});

// Get Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
});

export default router;
