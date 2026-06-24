const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/authMiddleware");

const {
  createTask,
  getAllTasks,
  getMyTasks,
  addTaskProgress,
  updateTaskAssignedStaff,
  deleteTask,
} = require("../controller/taskController");

// Admin routes
router.post("/admin/tasks", auth, isAdmin, createTask);
router.get("/admin/tasks", auth, isAdmin, getAllTasks);

router.put("/admin/tasks/:taskId/assign", auth, isAdmin, updateTaskAssignedStaff);

router.delete("/admin/tasks/:taskId", auth, isAdmin, deleteTask);


// Staff routes
router.get("/staff/tasks", auth, getMyTasks);
router.post("/staff/tasks/:taskId/progress", auth, addTaskProgress);

module.exports = router;