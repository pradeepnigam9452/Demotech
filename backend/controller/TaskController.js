const Task = require("../models/Task");
const Staff = require("../models/Staff");

module.exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, deadline  } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Title and assigned staff are required",
      });
    }

    const staffIds = Array.isArray(assignedTo) ? assignedTo : [assignedTo];

    if (staffIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one staff",
      });
    }

    const staffList = await Staff.find({
      _id: { $in: staffIds },
    });

    if (staffList.length !== staffIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more staff members not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: staffIds,
      assignedBy: req.user.id,
      priority: priority || "medium",
      deadline,
      
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email staffId category")
      .populate("assignedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Task created and assigned successfully",
      data: populatedTask,
    });
  } catch (error) {
    console.log("Create task error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email staffId category")
      .populate("assignedBy", "name email")
      .populate("workLogs.staff", "name staffId category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("assignedTo", "name email staffId category")
      .populate("workLogs.staff", "name staffId category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.addTaskProgress = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description, hoursWorked, status } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Work description is required",
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      assignedTo: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or this task is not assigned to you",
      });
    }

    const finalStatus = status || "in-progress";

    task.workLogs.push({
      staff: req.user.id,
      description,
      hoursWorked: hoursWorked || 0,
      status: finalStatus,
    });

    if (task.status === "pending") {
      task.status = "in-progress";
    }

    if (finalStatus === "completed") {
      task.status = "completed";
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email staffId category")
      .populate("workLogs.staff", "name staffId category");

    res.status(200).json({
      success: true,
      message: "Task progress added successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log("Add task progress error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateTaskAssignedStaff = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo || !Array.isArray(assignedTo) || assignedTo.length === 0) {
      return res.status(400).json({
        success: false,
        message: "assignedTo must be a non-empty array",
      });
    }

    const staffList = await Staff.find({
      _id: { $in: assignedTo },
    });

    if (staffList.length !== assignedTo.length) {
      return res.status(404).json({
        success: false,
        message: "One or more staff members not found",
      });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo,
      },
      { new: true }
    )
      .populate("assignedTo", "name email staffId category")
      .populate("assignedBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task assigned staff updated successfully",
      data: task,
    });
  } catch (error) {
    console.log("Update assigned staff error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};