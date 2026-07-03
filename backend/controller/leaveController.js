const Leave = require("../models/Leave");

const Staff = require("../models/Staff");

const LeaveHistory = require("../models/LeaveHistory");

module.exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const leave = await Leave.create({
      staff: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ staff: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("staff", "name email staffId category number")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    // if (!["Approved", "Rejected" , "Pending"].includes(status)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Status must be Approved, Rejected or Pending",
    //   });
    // }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminRemark: adminRemark || "",
      },
      { new: true }
    ).populate("staff", "name email staffId category");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Leave ${status.toLowerCase()} successfully`,
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.adminSetLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason, status, adminRemark } =
      req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "Leave type, from date, to date and reason are required",
      });
    }

    const staffList = await Staff.find({ status: "Active" });

    if (staffList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active staff found",
      });
    }

    const finalStatus = status || "Approved";
    const finalRemark =
      adminRemark || "Leave assigned to all employees by admin";

    const leaves = staffList.map((staff) => ({
      staff: staff._id,
      leaveType,
      fromDate,
      toDate,
      reason,
      status: finalStatus,
      adminRemark: finalRemark,
    }));

  

    const createdLeaves = await Leave.insertMany(leaves);

await LeaveHistory.create({
  leaveType,
  fromDate,
  toDate,
  reason,
  status: finalStatus,
  adminRemark: finalRemark,
  totalEmployees: staffList.length,
  leaveIds: createdLeaves.map((leave) => leave._id),
  createdBy: req.user?.id,
});
    res.status(201).json({
      success: true,
      message: "Leave assigned and history saved successfully",
      count: leaves.length,
    });
  } catch (error) {
    console.log("Admin set leave error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports.getAdminLeaveStats = async (req, res) => {
  try {
    const history = await LeaveHistory.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports.deleteAdminSetLeave = async (req, res) => {
  try {
    const { historyId } = req.params;

    const history = await LeaveHistory.findById(historyId);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Leave history not found",
      });
    }

    if (history.leaveIds && history.leaveIds.length > 0) {
      await Leave.deleteMany({
        _id: { $in: history.leaveIds },
      });
    } else {
      await Leave.deleteMany({
        leaveType: history.leaveType,
        fromDate: history.fromDate,
        toDate: history.toDate,
        reason: history.reason,
        adminRemark: history.adminRemark,
      });
    }

    await LeaveHistory.findByIdAndDelete(historyId);

    res.status(200).json({
      success: true,
      message: "Leave cancelled and deleted successfully",
    });
  } catch (error) {
    console.log("Delete admin leave error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};