// const express = require("express");
// const router = express.Router();

// const { auth ,isAdmin } = require("../middlewares/authMiddleware");

// const {
//   markAttendance,
//   getMyAttendance,
//   getAttendanceById
// } = require("../controller/attendanceController");

// // router.post("/staff/attendance", auth, markAttendance);
// // router.get("/staff/attendance", auth, getMyAttendance);

// router.post("/staff/me/attendance", auth, markAttendance);

// router.get("/staff/me/attendance", auth, getMyAttendance);

// // router.get("/admin/attendance/:id", auth,  getAttendanceById);

// router.get("/admin/attendance/:id", auth, isAdmin, getAttendanceById);
// module.exports = router;


const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/authMiddleware");
const {
  markAttendance,
  getMyAttendance,
  getAttendanceById
} = require("../controller/attendanceController");

router.post("/staff/me/attendance", auth, markAttendance);
router.get("/staff/me/attendance", auth, getMyAttendance);

router.get("/admin/attendance/:id", auth, isAdmin, getAttendanceById);

module.exports = router;