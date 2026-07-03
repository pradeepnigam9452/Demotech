const mongoose = require("mongoose");
const CareerJob = require("../models/CareerJob");
const CareerApplication = require("../models/CareerApplication");

const makeArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

// ==============================
// Create Job
// POST /api/careers/jobs
// ==============================
const createJob = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      jobType,
      experience,
      salary,
      skills,
      description,
      responsibilities,
      requirements,
      isActive,
    } = req.body;

    if (!title || !department || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, department and description are required",
      });
    }

    const job = await CareerJob.create({
      title,
      department,
      location,
      jobType,
      experience,
      salary,
      skills: makeArray(skills),
      description,
      responsibilities: makeArray(responsibilities),
      requirements: makeArray(requirements),
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

// ==============================
// Get All Active Jobs
// GET /api/careers/jobs
// ==============================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await CareerJob.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

// ==============================
// Get Single Job
// GET /api/careers/jobs/:id
// ==============================
const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await CareerJob.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Get Single Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
};

// ==============================
// Update Job
// PUT /api/careers/jobs/:id
// ==============================
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const payload = { ...req.body };

    if (payload.skills) payload.skills = makeArray(payload.skills);
    if (payload.responsibilities) {
      payload.responsibilities = makeArray(payload.responsibilities);
    }
    if (payload.requirements) {
      payload.requirements = makeArray(payload.requirements);
    }

    const job = await CareerJob.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
};

// ==============================
// Delete Job
// DELETE /api/careers/jobs/:id
// ==============================
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await CareerJob.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};

// ==============================

// ==============================
// Get All Applications
// GET /api/careers/applications
// ==============================
const getAllApplications = async (req, res) => {
  try {
    const applications = await CareerApplication.find()
      .populate("job", "title department location jobType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

const applyForJob = async (req, res) => {
  try {
    const { jobId, name, email, phone, portfolio, message } = req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Job ID, name, email and phone are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const job = await CareerJob.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const application = await CareerApplication.create({
      job: jobId,
      name,
      email,
      phone,
      portfolio,
      message,
      resume: `/uploads/resumes/${req.file.filename}`,
      resumeOriginalName: req.file.originalname,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit application",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await CareerApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const application = await CareerApplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Update Application Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};

    
  

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  applyForJob,
  getAllApplications,
  deleteApplication,
  updateApplication
};