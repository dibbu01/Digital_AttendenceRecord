import express from "express";
import {
  addPSOEntry,
  getPSOEntries,
  updatePSOEntry
} from "../controller/psoentry.controller.js";
import protectUser from "../middleware/protectrouteuser.js";

const router = express.Router();

router.post("/psoentry", protectUser, addPSOEntry);
router.get("/psoentry", protectUser, getPSOEntries);
router.put("/psoentry", protectUser, updatePSOEntry);

export default router;
