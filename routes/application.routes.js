import express from "express";
import { applyForJob } from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
// POST /api/v1/jobs/:jobId/apply
router.post("/jobs/:jobId/apply", applyForJob);

export default router;