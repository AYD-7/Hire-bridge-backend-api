import Job from "../models/job.model.js";

// Create a new job
export const createJob = async (req, res, next) => {
    // Try Catch block
    try {
        // Getting recruiter's id based on token generated when the recruiter logs in
        const recruiterId = req.user.id;

        // Destructuring to get core and needed fields
        const { title, description, requiredSkills, experienceLevel, location } = req.body;

        // Data validation
        if (!title || !description || !experienceLevel || !location) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields",
          });
        }

        // Saving a new job
        const job = await Job.create({
          title,
          description,
          requiredSkills,
          experienceLevel,
          location,
          company: req.user.business,
          recruiter: recruiterId,
        });

        // Sending response to the client
        res.status(201).json({
          success: true,
          message: "Job created successfully",
          data: job,
        });
    } catch (error) {
        next(error);
    }
};

// Editing (updating) an already existing job
export const updateJob = async (req, res, next) => {
    try {

        // Finding the job and updating it with what is coming from the client
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // If the job cannot be found by id
        if (!job) {
            return res.status(404).json({
              success: false,
              message: "Job not found"
            });
        }

        // Response sent to client
        res.json({
          success: true,
          message: "Job updated",
          data: job
        });

    } catch (error) {
        next(error);
    }
};

// Deactivating a job
export const deactivateJob = async (req, res, next) => {
    try {
        // Finding the job and changing status from default active to inactive rather than deleting it
        const job = await Job.findByIdAndUpdate(
          req.params.id,
          { status: "inactive" },
          { new: true },
        );

        // Sending response
        res.json({
          success: true,
          message: "Job deactivated",
          data: job,
        });

    } catch (error) {
        next(error);
    }
};

// Finding all the jobs a recruiter has posted
export const getRecruiterJobs = async (req, res, next) => {
    try {

        // Getting recruiter's id based on token generated when the recruiter logs in
        const recruiterId = req.user.id;

        // Finding all jobs and sorting them in a descending order (newest - oldest jobs)
        const jobs = await Job.find({
          recruiter: recruiterId
        }).sort({ createdAt: -1 });

        // Sending a response
        res.json({
          success: true,
          data: jobs
        });

    } catch (error) {
        next(error);
    }
};