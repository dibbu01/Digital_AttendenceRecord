import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectCode: { type: String, required: true },
  assessmentType: { type: String, required: true, enum: ["A1", "A2"] }, // A1 or A2 only
  methodI: { 
    type: String, 
    required: true,
    enum: ["Test - 1", "Test - 2"], // Fixed options
  },
  methodII: { 
    type: String, 
    required: true, 
    enum: ["Quiz", "Assignment", "Seminar", "Tutorial", "Case Study", "Mini Project"] 
  },
  weightageI: { type: Number, required: true, min: 0, max: 100 },
  weightageII: { type: Number, required: true, min: 0, max: 100 },
  marksI: { type: Number, required: true, min: 0, max: 100 },
  marksII: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

// Middleware to enforce methodI values based on assessmentType
assessmentSchema.pre("validate", function (next) {
  if (this.assessmentType === "A1") {
    this.methodI = "Test - 1";
  } else if (this.assessmentType === "A2") {
    this.methodI = "Test - 2";
  }
  next();
});

export default mongoose.model("Assessment", assessmentSchema);
