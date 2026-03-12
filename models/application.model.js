import mongoose from "mongoose";

// Application Schema
const applicationSchema = new mongoose.Schema(
  {
    // Name
    name: String,

    // Email
    email: String,

    // Resume
    resume: String,

    // Experience
    experience: Number,

    // Job
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    // Recruiter
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },

    // Stage
    stage: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "offered", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;