
const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/authMiddleware");
const selfies = require("../middlewares/selfies");
const {
  markAttendance,
  getMyAttendance,
  getAttendanceById,getStaffAttendanceByAdmin
} = require("../controller/AttendanceController");

router.post("/staff/me/attendance", auth, selfies.single("selfie"), markAttendance);
router.get("/staff/me/attendance", auth, getMyAttendance);

router.get("/admin/attendance/:id", auth, isAdmin, getAttendanceById);
router.get(
  "/admin/attendance/:staffId",
  auth,
  isAdmin,
  getStaffAttendanceByAdmin
);


module.exports = router;