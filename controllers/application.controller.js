import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Apply for a job
export const applyForJob = async (req, res, next) => {
  try {
    // Step 1: Get data from request body
    const { name, email, experience } = req.body;
    
    // Step 2: Get job ID from URL parameters
    const jobId = req.params.jobId;

    // Step 3: Validate required fields
    if (!name || !email || !jobId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, and jobId are required",
      });
    }

    // Step 4: Check if the job exists
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Step 5: Check if the candidate has already applied for this job
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

    // Step 6: Create the application
    const application = await Application.create({
      name,
      email,
      experience: experience || 0, // Default to 0 if not provided
      job: jobId,
      recruiter: job.recruiter, // Get the recruiter who posted the job
      stage: "applied", // Default stage is "applied"
    });

    // Step 7: Send success response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    // Step 8: Handle any errors
    next(error);
  }
};