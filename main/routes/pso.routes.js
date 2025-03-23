import express from 'express';
const router = express.Router();
import { addOrUpdatePso, getPso } from '../controller/pso.controller.js';
import protectRoute from '../middleware/protectrouteuser.js';

// Secure routes with authentication middleware
router.post('/pso', protectRoute, addOrUpdatePso);
router.get('/pso', protectRoute, getPso);

export default router;
