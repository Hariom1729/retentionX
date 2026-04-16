import express from "express";
import { getPrediction } from "../controllers/predictController.js";

const router = express.Router();

// POST /api/predict
router.post("/predict", getPrediction);

export default router;