import express from "express";
import Report from "../models/Report.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new report (Doctor Only)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { patientId, reportData } = req.body;
    const newReport = new Report({ patientId, doctorId: req.user.id, reportData });

    await newReport.save();
    res.status(201).json({ message: "Report Created Successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get reports for a specific patient (Patient Only)
router.get("/:patientId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const reports = await Report.find({ patientId: req.user.id }).populate("doctorId", "name");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get all reports for a doctor (Doctor Only)
router.get("/doctor/reports", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const reports = await Report.find({ doctorId: req.user.id }).populate("patientId", "name");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
