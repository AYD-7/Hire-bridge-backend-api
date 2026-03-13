import express from "express";
import { registerRecruiter, registerCandidate, login, matchCandidateToJob } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/v1/auth/recruiter/register - to register recruiters
router.route('/recruiter/register').post(registerRecruiter);

// POST /api/v1/auth/candidate/register - to register candidates
router.post("/candidate/register", registerCandidate)

router.route("/login").post(login);

// GET /api/v1/auth/match
router.get("/match", matchCandidateToJob);

export default router;

