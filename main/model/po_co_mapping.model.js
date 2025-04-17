import mongoose from "mongoose";

const MappingSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectCode: { type: String, required: true },
  mappings: [
    {
      courseOutcome: {
        type: String,
        enum: ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"], // ✅ Restrict COs
        required: true
      },
      poScores: {
        PO1: { type: Number, min: 1, max: 3, default: 1 },
        PO2: { type: Number, min: 1, max: 3, default: 1 },
        PO3: { type: Number, min: 1, max: 3, default: 1 },
        PO4: { type: Number, min: 1, max: 3, default: 1 },
        PO5: { type: Number, min: 1, max: 3, default: 1 },
        PO6: { type: Number, min: 1, max: 3, default: 1 },
        PO7: { type: Number, min: 1, max: 3, default: 1 },
        PO8: { type: Number, min: 1, max: 3, default: 1 },
        PO9: { type: Number, min: 1, max: 3, default: 1 },
        PO10: { type: Number, min: 1, max: 3, default: 1 },
        PO11: { type: Number, min: 1, max: 3, default: 1 },
        PO12: { type: Number, min: 1, max: 3, default: 1 }
      }
    }
  ]
});

const MappingModel = mongoose.model("PO_CO_Mapping", MappingSchema);

export default MappingModel;
