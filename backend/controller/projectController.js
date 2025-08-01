// controllers/projectController.js
const Project = require("../models/Project");
 
// 🔹 Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Add a new project
const addProject = async (req, res) => {
   try {
    const { title, description,features, link } = req.body;
    const image = req.file?.filename;

    const newProject = new Project({ title, description,features, link, image });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Update an existing project
const updateProject = async (req, res) => {
  try {
    if (typeof req.body.features === "string") {
      req.body.features = req.body.features.split(",").map(f => f.trim());
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
