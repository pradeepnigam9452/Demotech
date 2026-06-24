const DailyProgress = require("../models/DailyProgress");
const Project = require("../models/Project");

const formatLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

module.exports.addDailyProgress = async (req, res) => {
  try {
    const { projectId, workDetails, hoursWorked, status } = req.body;

    if (!projectId || !workDetails) {
      return res.status(400).json({
        success: false,
        message: "Project ID and work details are required",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      assignedTo: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this project",
      });
    }

    const progress = await DailyProgress.create({
      project: projectId,
      staff: req.user.id,
      workDetails,
      hoursWorked: hoursWorked || 0,
      status: status || "In Progress",
      date: formatLocalDate(),
    });

    res.status(201).json({
      success: true,
      message: "Daily progress added successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;

    const progress = await DailyProgress.find({
      project: projectId,
      staff: req.user.id,
    })
      .populate("project", "title")
      .populate("staff", "name staffId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getMyAllProgress = async (req, res) => {
  try {
    const progress = await DailyProgress.find({
      staff: req.user.id,
    })
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};