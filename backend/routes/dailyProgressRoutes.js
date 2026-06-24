const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");

const {
  addDailyProgress,
  getProjectProgress,
  getMyAllProgress,
} = require("../controller/dailyProgressController");

router.post("/staff/progress", auth, addDailyProgress);

router.get("/staff/progress", auth, getMyAllProgress);

router.get("/staff/progress/:projectId", auth, getProjectProgress);

module.exports = router;