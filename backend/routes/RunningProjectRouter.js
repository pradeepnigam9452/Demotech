const express = require("express");

const router = express.Router();
const {auth,isAdmin} = require("../middlewares/authMiddleware");


const {
  createRunningProject,

  getAllRunningProjects,

  getRunningProjectById,

  updateRunningProject,

  deleteRunningProject,

  assignProjectToStaff,

  getMyProjectRequests,

  respondToProjectRequest,

  unassignStaffFromProject,

  deleteAssignmentRequest,

  getMyRunningProjects,
  addProjectWorkUpdate,
  removeProjectFromStaff

} = require(
  "../controller/RunningProjectAssignment"
);


// ======================================================
// ADMIN CRUD
// ======================================================

router.post(
  "/admin/running-projects",
  auth,
  isAdmin,
  createRunningProject
);


router.get(
  "/admin/running-projects",
  auth,
  isAdmin,
  getAllRunningProjects
);


router.get(
  "/admin/running-projects/:id",
  auth,
  isAdmin,
  getRunningProjectById
);


router.put(
  "/admin/running-projects/:id",
  auth,
  isAdmin,
  updateRunningProject
);


router.delete(
  "/admin/running-projects/:id",

  deleteRunningProject
);


// ======================================================
// ADMIN ASSIGN PROJECT
// ======================================================

router.post(
  "/admin/running-projects/:projectId/assign",
  auth,
  isAdmin,
  assignProjectToStaff
);


// ======================================================
// ADMIN UNASSIGN STAFF
// ======================================================

router.patch(
  "/admin/running-projects/:projectId/unassign/:staffId",
  auth,
  isAdmin,
  unassignStaffFromProject
);


// ======================================================
// ADMIN DELETE ASSIGNMENT REQUEST
// ======================================================

router.delete(
  "/admin/running-projects/:projectId/assignments/:assignmentId",
  auth,
  isAdmin,
  deleteAssignmentRequest
);


// ======================================================
// STAFF GET ASSIGNMENT REQUESTS
// ======================================================

router.get(
  "/staff/running-project-requests",
  auth,
  getMyProjectRequests
);


// ======================================================
// STAFF ACCEPT / REJECT
// ======================================================

router.patch(
  "/staff/running-projects/:projectId/assignments/:assignmentId/respond",
  auth,
  respondToProjectRequest
);


// ======================================================
// STAFF ACCEPTED PROJECTS
// ======================================================

router.get(
  "/staff/my-running-projects",
  auth,
  getMyRunningProjects
);

// Staff: accept or reject request
router.patch(
  "/staff/running-project-requests/:assignmentId/respond",
  auth,
  respondToProjectRequest
);


router.post(
  "/staff/running-projects/:assignmentId/work-update",
  auth,
  addProjectWorkUpdate
);


router.patch(
  "/admin/staff/:staffId/running-projects/:projectId/remove",
  auth,
  isAdmin,
  removeProjectFromStaff
);

module.exports = router;