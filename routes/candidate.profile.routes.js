import express from "express";
import {
  createProfile,
  getMyProfile,
  updateBasicInfo,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  updateSkills,
  updateResume,
  updateVisibility,
  updateJobPreferences,
} from "../controllers/candidate.profile.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
 
const router = express.Router();

// All routes below are protected - candidate must be logged in
router.use(protect);
router.use(authorize("candidate")); // Only candidates can access these routes

// Profile
router.post("/", createProfile);
router.get("/profile", getMyProfile);

// Basic Info
router.patch("/basic-info", updateBasicInfo);

// Experience
router.post("/experience", addExperience);
router.patch("/experience/:experienceId", updateExperience);
router.delete("/experience/:experienceId", deleteExperience);

// Education
router.post("/education", addEducation);
router.patch("/education/:educationId", updateEducation);
router.delete("/education/:educationId", deleteEducation);
 
// Skills
router.patch("/skills", updateSkills);
 
// Resume
router.patch("/resume", updateResume);
 
// Visibility
router.patch("/visibility", updateVisibility);
 
// Job Preferences
router.patch("/job-preferences", updateJobPreferences);
 
export default router;