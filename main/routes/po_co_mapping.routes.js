import express from "express";
import protectUser from "../middleware/protectrouteuser.js";
import { addPOCOEntry, getPOCOEntries,updatePOCOEntry } from "../controller/po_co_mapping.controller.js";

const router = express.Router();

//Route to add/update PO-CO mapping
router.post("/PoComapping", protectUser, addPOCOEntry);

//Route to get PO-CO mapping for a subject
router.get("/PoComapping/:subjectCode", protectUser, getPOCOEntries);

router.put("/PoComapping/:subjectCode", protectUser, updatePOCOEntry);

export default router;
