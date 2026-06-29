
const Attendance = require("../models/Attendance");
const Staff = require("../models/Staff");
const Leave = require("../models/Leave");
const mongoose = require("mongoose");

// Format date as YYYY-MM-DD according to India timezone
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
};

// Today date in India timezone
const getTodayDate = () => {
  return formatDate(new Date());
};

// Convert any saved date to YYYY-MM-DD
const normalizeDate = (dateValue) => {
  if (!dateValue) return null;

  if (typeof dateValue === "string") {
    return dateValue.length >= 10 ? dateValue.slice(0, 10) : formatDate(dateValue);
  }

  return formatDate(dateValue);
};

// Get month name like June 2026
const getMonthName = (monthKey) => {
  return new Date(`${monthKey}-01T00:00:00.000Z`).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

// Get working dates between start and end date
// Sunday is skipped
const getWorkingDates = (startDate, endDate) => {
  const dates = [];

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);

  while (start <= end) {
    const day = start.getUTCDay();

    // 0 means Sunday
    if (day !== 0) {
      dates.push(start.toISOString().split("T")[0]);
    }

    start.setUTCDate(start.getUTCDate() + 1);
  }

  return dates;
};

// Reusable summary builder
const buildAttendanceSummary = async (staff) => {
  const attendance = await Attendance.find({
    staff: staff._id,
  }).sort({ date: -1 });

  const today = getTodayDate();

  const joiningDate = staff.joiningDate
    ? formatDate(staff.joiningDate)
    : attendance.length > 0
    ? normalizeDate(attendance[attendance.length - 1].date)
    : today;

  const workingDates = getWorkingDates(joiningDate, today);
  const workingDateSet = new Set(workingDates);

  // Present map
  const attendanceMap = new Map();

  attendance.forEach((item) => {
    const date = normalizeDate(item.date);

    if (date && workingDateSet.has(date) && item.status === "Present") {
      attendanceMap.set(date, item);
    }
  });

  const presentDates = new Set(attendanceMap.keys());

  // Admin approved leaves
  const adminLeaves = await Leave.find({
    staff: staff._id,
    status: "Approved",
  }).sort({ fromDate: -1 });

  const leaveMap = new Map();

  adminLeaves.forEach((leave) => {
    if (!leave.fromDate) return;

    const fromDate = normalizeDate(leave.fromDate);
    const toDate = leave.toDate ? normalizeDate(leave.toDate) : fromDate;

    const leaveDates = getWorkingDates(fromDate, toDate);

    leaveDates.forEach((date) => {
      // Leave count only if:
      // 1. Date is working day
      // 2. Staff is not already present on that date
      if (workingDateSet.has(date) && !presentDates.has(date)) {
        leaveMap.set(date, leave);
      }
    });
  });

  const leaveDates = new Set(leaveMap.keys());

  // Month wise summary
  const monthMap = new Map();

  workingDates.forEach((date) => {
    const monthKey = date.slice(0, 7);

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, {
        month: monthKey,
        monthName: getMonthName(monthKey),

        totalWorkingDays: 0,
        presentDays: 0,
        leaveDays: 0,
        adminLeaveDays: 0,
        absentDays: 0,

        dates: [],
      });
    }

    const monthData = monthMap.get(monthKey);

    let status = "Absent";
    let remarks = "";

    if (presentDates.has(date)) {
      status = "Present";
      remarks = attendanceMap.get(date)?.remarks || "";
      monthData.presentDays += 1;
    } else if (leaveDates.has(date)) {
      status = "Leave";
      remarks =
        leaveMap.get(date)?.reason ||
        leaveMap.get(date)?.adminRemark ||
        "Leave approved by admin";

      monthData.leaveDays += 1;
      monthData.adminLeaveDays += 1;
    } else {
      monthData.absentDays += 1;
    }

    monthData.totalWorkingDays += 1;

    monthData.dates.push({
      date,
      status,
      remarks,
    });
  });

  const monthWiseAttendance = Array.from(monthMap.values()).sort((a, b) =>
    b.month.localeCompare(a.month)
  );

  const totalWorkingDays = workingDates.length;
  const presentDays = presentDates.size;
  const leaveDays = leaveDates.size;
  const adminLeaveDays = leaveDates.size;

  const absentDays = Math.max(
    totalWorkingDays - presentDays - leaveDays,
    0
  );

  return {
    summary: {
      totalRecords: totalWorkingDays,
      totalWorkingDays,
      presentDays,
      leaveDays,
      adminLeaveDays,
      absentDays,
    },
    monthWiseAttendance,
    attendance,
    adminLeaves,
  };
};

// Staff mark attendance
module.exports.markAttendance = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const today = getTodayDate();

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

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
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


// Admin get attendance by staff MongoDB id or staffId

module.exports.getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const staffQuery = mongoose.Types.ObjectId.isValid(id)
      ? {
          $or: [{ _id: id }, { staffId: id }],
        }
      : {
          staffId: id,
        };

    const staff = await Staff.findOne(staffQuery).select(
      "name email staffId designation category joiningDate"
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const result = await buildAttendanceSummary(staff);

    return res.status(200).json({
      success: true,
      staff,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



