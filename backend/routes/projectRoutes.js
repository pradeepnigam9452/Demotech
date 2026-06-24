// // routes/projectRoutes.js
// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");

// const {
//   getAllProjects,
//   addProject,
//   updateProject,
//   deleteProject,
// } = require("../controller/projectController");


// router.post("/addProject", upload.single("image"),addProject);
// router.get("/getAllProjects", getAllProjects);
// router.put("/updateProject/:id",upload.single("image"), updateProject);
// router.delete("/deleteProject/:id", deleteProject);

// module.exports = router;




const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const { auth, isAdmin } = require("../middlewares/authMiddleware");

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  assignProjectToStaff,
  getMyAssignedProjects,
} = require("../controller/projectController");

router.post(
  "/addProject",
  upload.single("image"),
  addProject
);
// router.post("/addProject", upload.single("image"),addProject);
router.get("/getAllProjects", getAllProjects);

router.put(
  "/updateProject/:id",
  upload.single("image"),
  updateProject
);

router.delete(
  "/deleteProject/:id",
  deleteProject
);

router.put(
  "/assignProject",
  assignProjectToStaff
);

router.get(
  "/myAssignedProjects",
  auth,
  getMyAssignedProjects
);

module.exports = router;