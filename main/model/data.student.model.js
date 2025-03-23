import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  attendance: [
    {
      date: {
        type: Date,
        required: true,
        default: Date.now, // Default date to current timestamp
      },
      attend: {
        type: String,
        enum: ["present", "absent"],
        required: true,
        default: "present", // Default attendance as "present"
      },
    },
  ],
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollno: {
      type: Number,
      required: true,
      unique: true,
    },
    subjects: [subjectSchema], // Array of subjects with attendance
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
