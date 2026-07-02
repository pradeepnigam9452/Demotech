// const express = require("express");
// const router = express.Router();

// const { auth } = require("../middlewares/authMiddleware");

// const {
//   applyLeave,
//   getMyLeaves,
// } = require("../controller/leaveController");

// // router.post("/staff/leave", auth, applyLeave);
// // router.get("/staff/leave", auth, getMyLeaves);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getAllLeaveRequests,
  updateLeaveStatus,adminSetLeave,getAdminLeaveStats ,deleteAdminSetLeave
} = require("../controller/leaveController");

const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post("/staff/me/leave", auth, applyLeave);
router.get("/staff/me/leave", auth, getMyLeaves);

router.get("/admin/leaves", auth, isAdmin, getAllLeaveRequests);

router.put("/admin/leaves/:id/status", auth, isAdmin, updateLeaveStatus);


router.post("/admin/set-leave", auth, isAdmin, adminSetLeave);

router.get(
  "/admin/set-leave/stats",
  auth,
  isAdmin,
  getAdminLeaveStats
);

router.delete(
  "/admin/set-leave/:historyId",
  auth,
  isAdmin,
  deleteAdminSetLeave
);
module.exports = router;