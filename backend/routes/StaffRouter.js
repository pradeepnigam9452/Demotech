

// const express = require("express");
// const router = express.Router();

// const { auth, isAdmin,isStaff  } = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/upload");

// const {
//   getAllStaff,
//   createStaff,
//   getSingleStaff,
//   updateStaffData,
//   deleteStaff,
//   stafflogin,
//   getStaffdetails,
// } = require("../controller/StaffController");

// router.get("/allstaff", getAllStaff);

// router.get("/staff/profile", auth, getStaffdetails);

// // image upload middleware added here
// router.post("/createstaff", upload.single("profileImage"), createStaff);

// router.get("/staff/:id", getSingleStaff);

// // image update middleware added here
// router.put(
//   "/updatestaff/:id",
//   upload.single("profileImage"),
//   updateStaffData
// );


// router.delete("/deletestaff/:id", deleteStaff);

// router.post("/staff/login", stafflogin);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  auth,
  isAdmin,
  isStaff,
} = require("../middlewares/authMiddleware");

const upload = require("../middlewares/upload");

const {
  getAllStaff,
  createStaff,
  getSingleStaff,
  updateStaffData,
  deleteStaff,
  stafflogin,
  getStaffdetails,
} = require("../controller/StaffController");


// ======================================================
// STAFF LIST
// ======================================================

router.get(
  "/allstaff",
  getAllStaff
);


// ======================================================
// STAFF LOGIN
// ======================================================

router.post(
  "/staff/login",
  stafflogin
);


// ======================================================
// LOGGED-IN STAFF PROFILE
// ======================================================

router.get(
  "/staff/profile",
  auth,
  getStaffdetails
);


// ======================================================
// CREATE STAFF
// ======================================================

router.post(
  "/createstaff",
  upload.single("profileImage"),
  createStaff
);


// ======================================================
// GET SINGLE STAFF
// Changed from /staff/:id
// ======================================================

router.get(
  "/staff/details/:id",
  getSingleStaff
);


// ======================================================
// UPDATE STAFF
// ======================================================

router.put(
  "/updatestaff/:id",
  upload.single("profileImage"),
  updateStaffData
);


// ======================================================
// DELETE STAFF
// ======================================================

router.delete(
  "/deletestaff/:id",
  deleteStaff
);


module.exports = router;