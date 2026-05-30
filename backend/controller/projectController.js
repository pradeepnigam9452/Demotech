// controllers/projectController.js
const fs = require("fs");
const path = require("path");
const Project = require("../models/Project");

// 🔹 Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
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

module.exports = {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
};
