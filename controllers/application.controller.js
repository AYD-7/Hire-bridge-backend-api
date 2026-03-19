import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Apply for a job
export const applyForJob = async (req, res, next) => {
  try {
    // Step 1: Get candidate details from logged in user (not from body)
    const name = req.user.name;
    const email = req.user.email;

    // Step 2: Get job ID from URL parameters
    const jobId = req.params.jobId;

    // Step 3: Get experience and resume from request
    const { experience } = req.body;
    const resume = req.file ? req.file.path : null;

    // Step 4: Validate required fields
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Step 5: Check resume was uploaded
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume",
      });
    }

    // Step 6: Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Step 7: Check if candidate already applied for this job
    const existingApplication = await Application.findOne({
      email,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Step 8: Create the application
    const application = await Application.create({
      name,
      email,
      resume,
      experience: experience || 0,
      job: jobId,
      recruiter: job.recruiter,
      stage: "applied",
    });

    // Step 9: Send success response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    next(error);
  }
};