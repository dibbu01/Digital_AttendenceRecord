import express from "express";
import protectUser from "../middleware/protectrouteuser.js";
import {
  addAssessment,
  getAssessments,
  updateAssessment
} from "../controller/assessment.controller.js";

const router = express.Router();

// Add a new assessment entry
router.post("/assessment", protectUser, addAssessment);

// Get assessments for the logged-in staff
router.get("/assessment", protectUser, getAssessments);

// Update existing assessment entry
router.put("/assessment", protectUser, updateAssessment);

export default router;
