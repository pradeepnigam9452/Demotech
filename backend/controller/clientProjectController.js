const ClientProject = require('../models/Client');

// 🔹 Add a new project
const addClientProject = async (req, res) => {
  try {
    const { projectName, clientName, companyName, mobile, email, projectDetail, link } = req.body;
    const logo = req.file?.filename;

    if (!logo) return res.status(400).json({ error: 'Logo is required' });

    const newProject = new ClientProject({
      logo,
      projectName,
      clientName,
      companyName,
      mobile,
      email,
      projectDetail,
      link,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get all projects
const getAllClientProjects = async (req, res) => {
  try {
    const projects = await ClientProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Delete a project
const deleteClientProject = async (req, res) => {
  try {
    const deleted = await ClientProject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update a project
const updateClientProject = async (req, res) => {
  try {
    const { projectName, clientName, companyName, mobile, email, projectDetail, link } = req.body;
    const updateData = {
      projectName,
      clientName,
      companyName,
      mobile,
      email,
      projectDetail,
      link,
    };

    if (req.file?.filename) {
      updateData.logo = req.file.filename;
    }

    const updated = await ClientProject.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Project not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addClientProject,
  getAllClientProjects,
  deleteClientProject,
  updateClientProject,
};
