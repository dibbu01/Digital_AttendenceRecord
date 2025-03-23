import express from "express"
import { adminlogin, adminsignup,adminlogout} from "../controller/auth.admin.controller.js";
//import protectroute from '../middleware/protectroute.js';
import { signup } from "../controller/auth.user.controller.js";
const router = express.Router();

router.post('/adminlogin',adminlogin)
router.post('/adminsignup',adminsignup)
router.post('/adminlogout',adminlogout)
router.post('/signup',signup)
// router.get('/me',protectroute,getme)

export default router;