import Student from "../model/data.student.model.js";

export const studentAttendance = async (req, res) => {
  try {
    const { name, rollno, subjects } = req.body;

    if (!name || !rollno || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newStudent = new Student({
      name,
      rollno,
      subjects
    });

    console.log("New Student Data:", newStudent);

    await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const studentAttendanceUpdate = async (req, res) => {
  try {
    const { rollno, date, attend, subjectCode } = req.body;

    if (!rollno || !date || !attend || !subjectCode) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const student = await Student.findOne({ rollno });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let subjectFound = false;

    
    student.subjects.forEach((subject) => {
      if (subject.subjectCode === subjectCode) {
        subjectFound = true;

      
        const attendanceRecord = subject.attendance.find((record) =>
          record.date.toISOString().split("T")[0] === date
        );

        if (attendanceRecord) {
          
          attendanceRecord.attend = attend;
        } else {
          subject.attendance.push({ date, attend });
        }
      }
    });

    if (!subjectFound) {
      return res.status(404).json({ message: "Subject not found for this student" });
    }

    await student.save();

    res.status(200).json({
      message: "Attendance updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
