import express from 'express';
const router = express.Router();
import { addOrUpdatePo, getPo } from '../controller/po.controller.js';
import protectRoute from '../middleware/protectrouteuser.js';

// Secure routes with authentication middleware
router.post('/po', protectRoute, addOrUpdatePo);
router.get('/po', protectRoute, getPo);

export default router;
