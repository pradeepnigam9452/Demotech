const express = require("express");
const router = express.Router();

const resumeUpload = require("../middlewares/resumeUpload");

// const {
//   createJob,
//   getAllJobs,
//   getSingleJob,
//   updateJob,
//   deleteJob,
//   applyForJob,
//   getAllApplications,
// } = require("../controllers/careerController");

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  applyForJob,
  getAllApplications, deleteApplication
} = require("../controller/careerController");

// Public routes
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getSingleJob);
router.post("/apply", resumeUpload.single("resume"), applyForJob);

// Admin routes
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get("/applications", getAllApplications);
router.delete("/applications/:id", deleteApplication);

module.exports = router;