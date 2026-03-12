import express from "express";
import {
  createJob,
  updateJob,
  deactivateJob,
  getRecruiterJobs
} from "../controllers/job.controller.js";

const router = express.Router();

// Method chaining 
router
    .route("/")
    .post(createJob)
    .get(getRecruiterJobs);
router.patch("/:id", updateJob);
router.patch("/:id/deactivate", deactivateJob);

export default router;