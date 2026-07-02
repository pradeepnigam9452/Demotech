const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // multer setup
const {
  addClientProject,
  getAllClientProjects,
  deleteClientProject,
  updateClientProject,
} = require('../controller/clientProjectController');

// 🔹 Add new project (with logo upload)
router.post('/add', upload.single('logo'), addClientProject);

// 🔹 Get all projects
router.get('/getAllClientProjects', getAllClientProjects);

// 🔹 Delete a project
router.delete('/:id', deleteClientProject);

// 🔹 Update a project (optional logo)
router.put('/:id', upload.single('logo'), updateClientProject);

module.exports = router;
