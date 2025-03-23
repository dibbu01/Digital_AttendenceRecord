import express from "express";
import { userLogin,userlogout } from "../controller/auth.user.controller.js";

const router = express.Router();

// User Login Route
router.post("/login",userLogin);
router.post("/logout", userlogout);

export default router;
