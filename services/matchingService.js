import Candidate from "../models/candidate.model.js";
import Job from "../models/job.model.js";


export const calculateMatchScore = (candidateSkills, jobSkills) => {

  const matchedSkills = candidateSkills.filter(skill =>
    jobSkills.includes(skill)
  );

  const score = (matchedSkills.length / jobSkills.length) * 100;

  return {
    score: Math.round(score),
    matchedSkills
  };

};

export const matchCandidatesToJobs = async () => {

  const candidates = await Candidate.find();
  const jobs = await Job.find();

  const matches = [];

  candidates.forEach(candidate => {

    jobs.forEach(job => {

      const result = calculateMatchScore(
        candidate.skills,
        job.requiredSkills
      );

      if (result.score >= 50) {
        matches.push({
          candidate: candidate.name,
          job: job.title,
          score: result.score
        });
      }

    });

  });

  return matches;
};