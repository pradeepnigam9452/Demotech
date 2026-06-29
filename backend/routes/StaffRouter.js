
// const express = require("express");
// const router = express.Router();
// const {auth,isAdmin} = require('../middlewares/authMiddleware')
// const {
//   getAllStaff,
//   createStaff,
//   getSingleStaff,
//   updateStaffData,
//   deleteStaff,stafflogin ,getStaffdetails
// } = require("../controller/StaffController");

// router.get("/allstaff",getAllStaff);

// // router.get("/staff/profile", getStaffdetails);
// router.get("/staff/profile", auth, getStaffdetails);
// router.post("/createstaff", createStaff);

// router.get("/staff/:id", getSingleStaff);

// router.put("/updatestaff/:id",  updateStaffData);

// router.delete("/deletestaff/:id", deleteStaff);


// // for staff login

// router.post('/staff/login',stafflogin)  



// module.exports = router;

const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/authMiddleware");
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

router.get("/allstaff", getAllStaff);

router.get("/staff/profile", auth, getStaffdetails);

// image upload middleware added here
router.post("/createstaff", upload.single("profileImage"), createStaff);

router.get("/staff/:id", getSingleStaff);

// image update middleware added here
router.put(
  "/updatestaff/:id",
  upload.single("profileImage"),
  updateStaffData
);


router.delete("/deletestaff/:id", deleteStaff);

router.post("/staff/login", stafflogin);

module.exports = router;