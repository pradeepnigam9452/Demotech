// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controller/projectController");


router.post("/addProject", upload.single("image"),addProject);
router.get("/getAllProjects", getAllProjects);
router.put("/updateProject/:id",upload.single("image"), updateProject);
router.delete("/deleteProject/:id", deleteProject);

module.exports = router;
