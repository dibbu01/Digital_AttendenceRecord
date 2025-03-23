import express from 'express';
import { studentAttendance, studentAttendanceUpdate } from '../controller/data.student.controller.js';

const router=express.Router()

router.post('/studentattendance',studentAttendance)
router.post('/studentattendanceupdate',studentAttendanceUpdate)

export default router;