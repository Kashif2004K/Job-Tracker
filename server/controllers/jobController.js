import Job from "../models/Job.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, company, status } = req.body;

    const job = await Job.create({
      title,
      company,
      status,
      user: req.user._id, // comes from JWT middleware
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS (ONLY LOGGED IN USER)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB STATUS
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // update fields
    job.title = req.body.title || job.title;
    job.company = req.body.company || job.company;
    job.status = req.body.status || job.status;

    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};