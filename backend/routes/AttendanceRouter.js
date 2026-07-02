
const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/authMiddleware");
const {
  markAttendance,
  getMyAttendance,
  getAttendanceById
} = require("../controller/AttendanceController");

router.post("/staff/me/attendance", auth, markAttendance);
router.get("/staff/me/attendance", auth, getMyAttendance);

router.get("/admin/attendance/:id", auth, isAdmin, getAttendanceById);

module.exports = router;