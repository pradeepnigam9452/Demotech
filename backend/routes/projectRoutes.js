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


router.post("/", upload.single("image"),addProject);

router.get("/", getAllProjects);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
