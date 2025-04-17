import Assessment from "../model/assessment.model.js";
import User from "../model/auth.model.js";

// Add new assessment entry
export const addAssessment = async (req, res) => {
  const { subjectCode, assessmentType, methodII, weightageI, weightageII, marksI, marksII } = req.body;
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    // Validate total weightage and marks
    if (weightageI + weightageII > 100 || marksI + marksII > 100) {
      return res.status(400).json({ message: "Total weightage or marks exceed limit (100)" });
    }

    // Check if entry exists
    const exists = await Assessment.findOne({
      staffId,
      subjectCode,
      assessmentType, // 👈 this makes the check specific to A1 or A2
    });
    
    if (exists) {
      return res.status(400).json({
        message: `${assessmentType} already exists for this subject`,
      });
    }
    

    // Create new entry (methodI auto-set in model)
    const newAssessment = await Assessment.create({ staffId, subjectCode, assessmentType, methodII, weightageI, weightageII, marksI, marksII });

    res.status(201).json({ message: "Assessment entry added", data: newAssessment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get assessments for current staff
export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ staffId: req.user._id });
    res.status(200).json({ data: assessments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments", error });
  }
};

// Update assessment entry
export const updateAssessment = async (req, res) => {
  const { subjectCode, assessmentType, methodII, weightageI, weightageII, marksI, marksII } = req.body;
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    // Validate total weightage and marks
    if (weightageI + weightageII > 100 || marksI + marksII > 100) {
      return res.status(400).json({ message: "Total weightage or marks exceed limit (100)" });
    }

    // Update existing entry
    const updatedAssessment = await Assessment.findOneAndUpdate(
      { staffId, subjectCode, assessmentType },
      { $set: { methodII, weightageI, weightageII, marksI, marksII } },
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "No existing assessment found" });
    }

    res.status(200).json({ message: "Assessment updated successfully", data: updatedAssessment });
  } catch (error) {
    res.status(500).json({ message: "Error updating assessment", error });
  }
};
