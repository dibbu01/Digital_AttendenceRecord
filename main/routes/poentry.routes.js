import express from "express";
import { addPOEntry, getPOEntries, updatePOEntry  } from "../controller/poentry.controller.js";
import protectUser from "../middleware/protectrouteuser.js";

const router = express.Router();

router.post("/poentry", protectUser, addPOEntry);
router.get("/poentry", protectUser, getPOEntries);
router.put("/poentry", protectUser, updatePOEntry); 

export default router;
