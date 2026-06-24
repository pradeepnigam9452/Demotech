// controllers/projectController.js
const fs = require("fs");
const path = require("path");
const Project = require("../models/Project");
const Staff = require('../models/Staff')
// 🔹 Get all projects
const getAllProjects = async (req, res) => {
  try {
    // const projects = await Project.find().sort({ createdAt: 1 });
    const projects = await Project.find()
  .populate("assignedTo", "name staffId category email")
  .sort({ createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Add a new project
const addProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    let features = [];

    try {
      features = JSON.parse(req.body.features);
      if (!Array.isArray(features)) {
        return res.status(400).json({ error: "Features must be an array" });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Invalid features format (must be JSON array string)" });
    }

    const image = req.file?.filename;

    // Optional: validate required fields
    if (!title || !description || !link || features.length === 0) {
      return res
        .status(400)
        .json({ error: "All fields including features are required" });
    }

    const newProject = new Project({
      title,
      description,
      features,
      link,
      image,
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add Project Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update an existing project
const updateProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    let features = req.body.features;

    // Handle features JSON
    if (typeof features === "string") {
      features = JSON.parse(features); // Convert from stringified array to real array
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // If new image is uploaded, delete old image from disk
    if (req.file) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "projects",
        project.image,
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      project.image = req.file.filename;
    }

    project.title = title;
    project.description = description;
    project.link = link;
    project.features = features;

    await project.save();
    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// 🔹 Delete a project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const assignProjectToStaff = async (req, res) => {
  try {
    const { projectId, staffIds } = req.body;

    if (!projectId || !staffIds || !Array.isArray(staffIds)) {
      return res.status(400).json({
        success: false,
        message: "Project ID and staffIds array are required",
      });
    }

    const staff = await Staff.find({ _id: { $in: staffIds } });

    if (staff.length !== staffIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more staff members not found",
      });
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        assignedTo: staffIds,
        assignedDate: new Date(),
        status: "Assigned",
      },
      { new: true }
    ).populate("assignedTo", "name email staffId category");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project assigned successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyAssignedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      assignedTo: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,assignProjectToStaff,getMyAssignedProjects
};
