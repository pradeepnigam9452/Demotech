const Attendance = require("../models/Attendance");
const Staff = require("../models/Staff");

module.exports.markAttendance = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await Attendance.findOne({
      staff: staff._id,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      staff: staff._id,
      staffId: staff.staffId,
      date: today,
      status: "Present",
      remarks: req.body?.remarks || "",
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      staff: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


