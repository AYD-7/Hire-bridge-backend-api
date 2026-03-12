import express from "express";
import {
  getDashboardStats,
  getCandidatePipeline,
  getRecentApplicants
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/stats").get(getDashboardStats);
router.route("/pipeline").get(getCandidatePipeline);
router.route("/recent-applicants").get(getRecentApplicants);

export default router;