import POCOEntry from "../model/po_co_mapping.model.js";
import User from "../model/auth.model.js";

// Add PO-CO Mapping Entry
export const addPOCOEntry = async (req, res) => {
  const { subjectCode, mappings } = req.body; // mappings should be an array of { CO, PO, rating }
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    const exists = await POCOEntry.findOne({ staffId, subjectCode });
    if (exists) {
      return res.status(400).json({ message: "PO-CO mapping already exists for this subject" });
    }

    const newEntry = await POCOEntry.create({ staffId, subjectCode, mappings });
    res.status(201).json({ message: "PO-CO Mapping entry added", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get PO-CO Mapping Entries for Current Staff
export const getPOCOEntries = async (req, res) => {
  try {
    const pocoEntries = await POCOEntry.find({ staffId: req.user._id });
    res.status(200).json({ data: pocoEntries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  }
};

// Update PO-CO Mapping Entry
export const updatePOCOEntry = async (req, res) => {
  const { subjectCode, mappings } = req.body;
  const staffId = req.user._id;

  try {
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "Unauthorized subject" });
    }

    const updated = await POCOEntry.findOneAndUpdate(
      { staffId, subjectCode },
      { $set: { mappings } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "No existing PO-CO entry found" });
    }

    res.status(200).json({ message: "PO-CO Mapping updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating", error });
  }
};
