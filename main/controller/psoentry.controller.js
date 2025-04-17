import PSOEntry from "../model/psoentry.model.js";
import User from "../model/auth.model.js";

// Add new PSO entry
export const addPSOEntry = async (req, res) => {
  const { subjectCode, pso1, pso2, pso3 } = req.body;
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    const exists = await PSOEntry.findOne({ staffId, subjectCode });
    if (exists) {
      return res.status(400).json({ message: "PSO already exists for this subject" });
    }

    const newEntry = await PSOEntry.create({ staffId, subjectCode, pso1, pso2, pso3 });
    res.status(201).json({ message: "PSO entry added", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get PSO entries for current staff
export const getPSOEntries = async (req, res) => {
  try {
    const psoEntries = await PSOEntry.find({ staffId: req.user._id });
    res.status(200).json({ data: psoEntries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  }
};

// Update PSO entries
export const updatePSOEntry = async (req, res) => {
  const { subjectCode, ...updatedPSOs } = req.body;
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    const updated = await PSOEntry.findOneAndUpdate(
      { staffId, subjectCode },
      { $set: updatedPSOs },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "No existing PSO entry found" });
    }

    res.status(200).json({ message: "PSO updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating", error });
  }
};
