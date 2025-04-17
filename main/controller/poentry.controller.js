import POEntry from "../model/poentry.model.js";
import User from "../model/auth.model.js";

// Add PO Entry (Only If Staff is Assigned to Subject)
export const addPOEntry = async (req, res) => {
  const { subjectCode, po1, po2, po3, po4, po5, po6, po7, po8, po9, po10, po11, po12 } = req.body;
  const staffId = req.user._id;

  try {
    // Step 1: Fetch logged-in user details
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found." });

    // Step 2: Check subjectCode match
    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "You are not assigned to this subject." });
    }

    // Step 3: Prevent duplicate entry
    const existing = await POEntry.findOne({ staffId, subjectCode });
    if (existing) {
      return res.status(400).json({ message: "PO entry already exists for this subject." });
    }

    // Step 4: Save PO entry
    const poEntry = await POEntry.create({
      staffId,
      subjectCode,
      po1, po2, po3, po4, po5, po6, po7, po8, po9, po10, po11, po12
    });

    res.status(201).json({ message: "PO entry added successfully", data: poEntry });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch All PO Entries for Logged-in Staff
export const getPOEntries = async (req, res) => {
  try {
    const poEntries = await POEntry.find({ staffId: req.user._id });
    res.status(200).json({ data: poEntries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching PO entries", error });
  }
};


// Update specific PO fields for assigned subject
export const updatePOEntry = async (req, res) => {
  const staffId = req.user._id;
  const { subjectCode, ...updatedPOs } = req.body;

  try {
    // Step 1: Verify staff
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found." });

    // Step 2: Ensure subjectCode is assigned to this staff
    if (staff.subjectcode !== subjectCode) {
      return res.status(403).json({ message: "You are not assigned to this subject." });
    }

    // Step 3: Find and update the PO entry
    const poEntry = await POEntry.findOneAndUpdate(
      { staffId, subjectCode },
      { $set: updatedPOs },
      { new: true }
    );

    if (!poEntry) {
      return res.status(404).json({ message: "No existing PO entry found for this subject." });
    }

    res.status(200).json({ message: "PO entry updated successfully", data: poEntry });

  } catch (error) {
    res.status(500).json({ message: "Error updating PO entry", error });
  }
};

