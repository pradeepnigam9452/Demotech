const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");

const {
  markAttendance,
  getMyAttendance,
} = require("../controller/attendanceController");

// router.post("/staff/attendance", auth, markAttendance);
// router.get("/staff/attendance", auth, getMyAttendance);

router.post("/staff/me/attendance", auth, markAttendance);
router.get("/staff/me/attendance", auth, getMyAttendance);

module.exports = router;