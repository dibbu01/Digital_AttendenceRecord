import mongoose from "mongoose";

const poEntrySchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  po1: String,
  po2: String,
  po3: String,
  po4: String,
  po5: String,
  po6: String,
  po7: String,
  po8: String,
  po9: String,
  po10: String,
  po11: String,
  po12: String,
}, {
  timestamps: true
});

poEntrySchema.index({ staffId: 1, subjectCode: 1 }, { unique: true });

const POEntry = mongoose.model("POEntry", poEntrySchema);
export default POEntry;
