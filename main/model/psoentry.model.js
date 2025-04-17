import mongoose from "mongoose";

const psoEntrySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    pso1: { type: String },
    pso2: { type: String },
    pso3: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PSOEntry", psoEntrySchema);
