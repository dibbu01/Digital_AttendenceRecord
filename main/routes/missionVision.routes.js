import express from 'express';
const router = express.Router();
import { addMissionVision, getMissionVision } from '../controller/missionVision.controller.js';
import protectroute from '../middleware/protectrouteuser.js';

router.post('/mission-vision',protectroute,addMissionVision);
router.get('/mission-vision',protectroute,getMissionVision);

export default router;  
