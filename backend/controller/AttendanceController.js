
// const Attendance = require("../models/Attendance");
// const Staff = require("../models/Staff");
// const Leave = require("../models/Leave");
// const mongoose = require("mongoose");

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("en-CA", {
//     timeZone: "Asia/Kolkata",
//   });
// };

// // Today date in India timezone
// const getTodayDate = () => {
//   return formatDate(new Date());
// };

// // Convert any saved date to YYYY-MM-DD
// const normalizeDate = (dateValue) => {
//   if (!dateValue) return null;

//   if (typeof dateValue === "string") {
//     return dateValue.length >= 10 ? dateValue.slice(0, 10) : formatDate(dateValue);
//   }

//   return formatDate(dateValue);
// };

// // Get month name like June 2026
// const getMonthName = (monthKey) => {
//   return new Date(`${monthKey}-01T00:00:00.000Z`).toLocaleString("en-US", {
//     month: "long",
//     year: "numeric",
//     timeZone: "UTC",
//   });
// };

// // Get working dates between start and end date
// // Sunday is skipped
// const getWorkingDates = (startDate, endDate) => {
//   const dates = [];

//   const start = new Date(`${startDate}T00:00:00.000Z`);
//   const end = new Date(`${endDate}T00:00:00.000Z`);

//   while (start <= end) {
//     const day = start.getUTCDay();

//     // 0 means Sunday
//     if (day !== 0) {
//       dates.push(start.toISOString().split("T")[0]);
//     }

//     start.setUTCDate(start.getUTCDate() + 1);
//   }

//   return dates;
// };

// // Reusable summary builder
// const buildAttendanceSummary = async (staff) => {
//   const attendance = await Attendance.find({
//     staff: staff._id,
//   }).sort({ date: -1 });

//   const today = getTodayDate();

//   const joiningDate = staff.joiningDate
//     ? formatDate(staff.joiningDate)
//     : attendance.length > 0
//     ? normalizeDate(attendance[attendance.length - 1].date)
//     : today;

//   const workingDates = getWorkingDates(joiningDate, today);
//   const workingDateSet = new Set(workingDates);

//   // Present map
//   const attendanceMap = new Map();

//   attendance.forEach((item) => {
//     const date = normalizeDate(item.date);

//     if (date && workingDateSet.has(date) && item.status === "Present") {
//       attendanceMap.set(date, item);
//     }
//   });

//   const presentDates = new Set(attendanceMap.keys());

//   // Admin approved leaves
//   const adminLeaves = await Leave.find({
//     staff: staff._id,
//     status: "Approved",
//   }).sort({ fromDate: -1 });

//   const leaveMap = new Map();

//   adminLeaves.forEach((leave) => {
//     if (!leave.fromDate) return;

//     const fromDate = normalizeDate(leave.fromDate);
//     const toDate = leave.toDate ? normalizeDate(leave.toDate) : fromDate;

//     const leaveDates = getWorkingDates(fromDate, toDate);

//     leaveDates.forEach((date) => {
//       // Leave count only if:
//       // 1. Date is working day
//       // 2. Staff is not already present on that date
//       if (workingDateSet.has(date) && !presentDates.has(date)) {
//         leaveMap.set(date, leave);
//       }
//     });
//   });

//   const leaveDates = new Set(leaveMap.keys());

//   // Month wise summary
//   const monthMap = new Map();

//   workingDates.forEach((date) => {
//     const monthKey = date.slice(0, 7);

//     if (!monthMap.has(monthKey)) {
//       monthMap.set(monthKey, {
//         month: monthKey,
//         monthName: getMonthName(monthKey),

//         totalWorkingDays: 0,
//         presentDays: 0,
//         leaveDays: 0,
//         adminLeaveDays: 0,
//         absentDays: 0,

//         dates: [],
//       });
//     }

//     const monthData = monthMap.get(monthKey);

//     let status = "Absent";
//     let remarks = "";

//     if (presentDates.has(date)) {
//       status = "Present";
//       remarks = attendanceMap.get(date)?.remarks || "";
//       monthData.presentDays += 1;
//     } else if (leaveDates.has(date)) {
//       status = "Leave";
//       remarks =
//         leaveMap.get(date)?.reason ||
//         leaveMap.get(date)?.adminRemark ||
//         "Leave approved by admin";

//       monthData.leaveDays += 1;
//       monthData.adminLeaveDays += 1;
//     } else {
//       monthData.absentDays += 1;
//     }

//     monthData.totalWorkingDays += 1;

//     monthData.dates.push({
//       date,
//       status,
//       remarks,
//     });
//   });

//   const monthWiseAttendance = Array.from(monthMap.values()).sort((a, b) =>
//     b.month.localeCompare(a.month)
//   );

//   const totalWorkingDays = workingDates.length;
//   const presentDays = presentDates.size;
//   const leaveDays = leaveDates.size;
//   const adminLeaveDays = leaveDates.size;

//   const absentDays = Math.max(
//     totalWorkingDays - presentDays - leaveDays,
//     0
//   );

//   return {
//     summary: {
//       totalRecords: totalWorkingDays,
//       totalWorkingDays,
//       presentDays,
//       leaveDays,
//       adminLeaveDays,
//       absentDays,
//     },
//     monthWiseAttendance,
//     attendance,
//     adminLeaves,
//   };
// };

// module.exports.markAttendance = async (req, res) => {
//   try {
//     // =====================================
//     // FIND STAFF
//     // =====================================

//     const staff = await Staff.findById(req.user.id);

//     if (!staff) {
//       return res.status(404).json({
//         success: false,
//         message: "Staff not found",
//       });
//     }

//     // =====================================
//     // REQUEST DATA
//     // =====================================

//     const {
//       latitude,
//       longitude,
//       accuracy,
//       remarks,
//     } = req.body;

//     // =====================================
//     // SELFIE VALIDATION
//     // =====================================

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Selfie is required to mark attendance",
//       });
//     }

//     // =====================================
//     // LOCATION VALIDATION
//     // =====================================

//     if (
//       latitude === undefined ||
//       longitude === undefined
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Live location is required to mark attendance",
//       });
//     }

//     const lat = Number(latitude);
//     const lng = Number(longitude);

//     if (
//       Number.isNaN(lat) ||
//       Number.isNaN(lng)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Invalid location coordinates",
//       });
//     }

//     // Validate coordinate range
//     if (
//       lat < -90 ||
//       lat > 90 ||
//       lng < -180 ||
//       lng > 180
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Location coordinates are outside the valid range",
//       });
//     }

//     // =====================================
//     // CHECK TODAY ATTENDANCE
//     // =====================================

//     const today = getTodayDate();

//     const alreadyMarked =
//       await Attendance.findOne({
//         staff: staff._id,
//         date: today,
//       });

//     if (alreadyMarked) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Attendance already marked today",
//       });
//     }

//     // =====================================
//     // GET LOCATION NAME
//     // =====================================

//     const locationDetails =
//       await getLocationDetails(
//         lat,
//         lng
//       );

//     console.log(
//       "Detected location:",
//       locationDetails
//     );

//     // =====================================
//     // SELFIE PATH
//     // =====================================

//     const selfiePath =
//       `/uploads/selfies/${req.file.filename}`;

//     // =====================================
//     // CREATE ATTENDANCE
//     // =====================================

//     const attendance =
//       await Attendance.create({
//         staff: staff._id,

//         staffId: staff.staffId,

//         date: today,

//         status: "Present",

//         checkIn: new Date(),

//         remarks: remarks || "",

//         selfie: selfiePath,

//         location: {
//           type: "Point",

//           // GeoJSON order:
//           // longitude first
//           // latitude second
//           coordinates: [
//             lng,
//             lat,
//           ],

//           name:
//             locationDetails.name,

//           fullAddress:
//             locationDetails.fullAddress,

//           accuracy: accuracy
//             ? Number(accuracy)
//             : undefined,

//           capturedAt: new Date(),
//         },
//       });

//     // =====================================
//     // RESPONSE
//     // =====================================

//     return res.status(201).json({
//       success: true,

//       message:
//         "Attendance marked successfully",

//       data: attendance,
//     });
//   } catch (error) {
//     console.error(
//       "Mark attendance error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// module.exports.getMyAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.find({
//       staff: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: attendance.length,
//       data: attendance,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // Admin get attendance by staff MongoDB id or staffId

// module.exports.getAttendanceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const staffQuery = mongoose.Types.ObjectId.isValid(id)
//       ? {
//           $or: [{ _id: id }, { staffId: id }],
//         }
//       : {
//           staffId: id,
//         };
//     const staff = await Staff.findOne(staffQuery).select(
//       "name email staffId designation category joiningDate , "
//     );
//     if (!staff) {
//       return res.status(404).json({
//         success: false,
//         message: "Staff not found",
//       });
//     }

//     const result = await buildAttendanceSummary(staff);

//     return res.status(200).json({
//       success: true,
//       staff,
//       ...result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





const Attendance = require("../models/Attendance");
const Staff = require("../models/Staff");
const Leave = require("../models/Leave");
const mongoose = require("mongoose");
const axios = require("axios");


// ======================================================
// DATE FORMAT
// ======================================================

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
};


// ======================================================
// TODAY DATE IN INDIA TIMEZONE
// ======================================================

const getTodayDate = () => {
  return formatDate(new Date());
};


// ======================================================
// NORMALIZE DATE
// ======================================================

const normalizeDate = (dateValue) => {
  if (!dateValue) {
    return null;
  }

  if (typeof dateValue === "string") {
    return dateValue.length >= 10
      ? dateValue.slice(0, 10)
      : formatDate(dateValue);
  }

  return formatDate(dateValue);
};


// ======================================================
// GET MONTH NAME
// Example: July 2026
// ======================================================

const getMonthName = (monthKey) => {
  return new Date(
    `${monthKey}-01T00:00:00.000Z`
  ).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};


// ======================================================
// GET WORKING DATES
// Sunday skipped
// ======================================================

const getWorkingDates = (
  startDate,
  endDate
) => {
  const dates = [];

  const start = new Date(
    `${startDate}T00:00:00.000Z`
  );

  const end = new Date(
    `${endDate}T00:00:00.000Z`
  );

  while (start <= end) {
    const day = start.getUTCDay();

    // Sunday = 0
    if (day !== 0) {
      dates.push(
        start.toISOString().split("T")[0]
      );
    }

    start.setUTCDate(
      start.getUTCDate() + 1
    );
  }

  return dates;
};


// ======================================================
// GET LOCATION NAME FROM LATITUDE AND LONGITUDE
// Reverse Geocoding
// ======================================================

const getLocationDetails = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "jsonv2",

          lat: latitude,

          lon: longitude,

          addressdetails: 1,

          zoom: 18,
        },

        headers: {
          "User-Agent":
            "demotechAttendanceSystem/1.0",

          "Accept-Language": "en",
        },

        timeout: 10000,
      }
    );


    const data = response.data || {};

    const address =
      data.address || {};


    // ==================================================
    // LOCAL AREA NAME
    // ==================================================

    const areaName =
      address.road ||
      address.neighbourhood ||
      address.suburb ||
      address.residential ||
      address.quarter ||
      address.hamlet ||
      address.village ||
      "";


    // ==================================================
    // CITY NAME
    // ==================================================

    const cityName =
      address.city ||
      address.town ||
      address.municipality ||
      address.city_district ||
      address.county ||
      "";


    // ==================================================
    // STATE AND COUNTRY
    // ==================================================

    const stateName =
      address.state || "";

    const countryName =
      address.country || "";


    // Remove duplicate names
    const uniqueLocationParts = [
      areaName,
      cityName,
    ].filter(
      (value, index, array) =>
        value &&
        array.indexOf(value) === index
    );


    const locationName =
      uniqueLocationParts.join(", ");


    return {
      // Example:
      // Ayodhya Bypass, Bhopal

      name:
        locationName ||
        cityName ||
        data.name ||
        "Unknown Location",


      // Complete address

      fullAddress:
        data.display_name ||
        [
          areaName,
          cityName,
          stateName,
          countryName,
        ]
          .filter(Boolean)
          .join(", "),
    };

  } catch (error) {
    console.error(
      "Reverse geocoding error:",
      error.response?.data ||
        error.message
    );


    // Do not fail attendance only because
    // address API failed
    return {
      name: `${latitude}, ${longitude}`,

      fullAddress: "",
    };
  }
};


// ======================================================
// BUILD ATTENDANCE SUMMARY
// ======================================================

const buildAttendanceSummary = async (
  staff
) => {
  const attendance =
    await Attendance.find({
      staff: staff._id,
    }).sort({
      date: -1,
    });


  const today =
    getTodayDate();


  const joiningDate =
    staff.joiningDate
      ? formatDate(staff.joiningDate)

      : attendance.length > 0
      ? normalizeDate(
          attendance[
            attendance.length - 1
          ].date
        )

      : today;


  const workingDates =
    getWorkingDates(
      joiningDate,
      today
    );


  const workingDateSet =
    new Set(workingDates);


  // ==================================================
  // PRESENT MAP
  // ==================================================

  const attendanceMap =
    new Map();


  attendance.forEach((item) => {
    const date =
      normalizeDate(item.date);


    if (
      date &&
      workingDateSet.has(date) &&
      item.status === "Present"
    ) {
      attendanceMap.set(
        date,
        item
      );
    }
  });


  const presentDates =
    new Set(
      attendanceMap.keys()
    );


  // ==================================================
  // ADMIN APPROVED LEAVES
  // ==================================================

  const adminLeaves =
    await Leave.find({
      staff: staff._id,

      status: "Approved",
    }).sort({
      fromDate: -1,
    });


  const leaveMap =
    new Map();


  adminLeaves.forEach((leave) => {
    if (!leave.fromDate) {
      return;
    }


    const fromDate =
      normalizeDate(
        leave.fromDate
      );


    const toDate =
      leave.toDate
        ? normalizeDate(
            leave.toDate
          )
        : fromDate;


    const leaveDates =
      getWorkingDates(
        fromDate,
        toDate
      );


    leaveDates.forEach((date) => {
      if (
        workingDateSet.has(date) &&
        !presentDates.has(date)
      ) {
        leaveMap.set(
          date,
          leave
        );
      }
    });
  });


  const leaveDates =
    new Set(
      leaveMap.keys()
    );


  // ==================================================
  // MONTH WISE SUMMARY
  // ==================================================

  const monthMap =
    new Map();


  workingDates.forEach((date) => {
    const monthKey =
      date.slice(0, 7);


    if (
      !monthMap.has(monthKey)
    ) {
      monthMap.set(
        monthKey,
        {
          month: monthKey,

          monthName:
            getMonthName(
              monthKey
            ),

          totalWorkingDays: 0,

          presentDays: 0,

          leaveDays: 0,

          adminLeaveDays: 0,

          absentDays: 0,

          dates: [],
        }
      );
    }


    const monthData =
      monthMap.get(
        monthKey
      );


    let status = "Absent";

    let remarks = "";


    // Present
    if (
      presentDates.has(date)
    ) {
      status = "Present";

      remarks =
        attendanceMap.get(date)
          ?.remarks || "";

      monthData.presentDays += 1;
    }

    // Leave
    else if (
      leaveDates.has(date)
    ) {
      status = "Leave";


      remarks =
        leaveMap.get(date)
          ?.reason ||

        leaveMap.get(date)
          ?.adminRemark ||

        "Leave approved by admin";


      monthData.leaveDays += 1;

      monthData.adminLeaveDays += 1;
    }

    // Absent
    else {
      monthData.absentDays += 1;
    }


    monthData.totalWorkingDays += 1;


    monthData.dates.push({
      date,

      status,

      remarks,
    });
  });


  const monthWiseAttendance =
    Array.from(
      monthMap.values()
    ).sort((a, b) =>
      b.month.localeCompare(
        a.month
      )
    );


  // ==================================================
  // TOTAL SUMMARY
  // ==================================================

  const totalWorkingDays =
    workingDates.length;


  const presentDays =
    presentDates.size;


  const leaveDays =
    leaveDates.size;


  const adminLeaveDays =
    leaveDates.size;


  const absentDays =
    Math.max(
      totalWorkingDays -
        presentDays -
        leaveDays,

      0
    );


  return {
    summary: {
      totalRecords:
        totalWorkingDays,

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


// ======================================================
// MARK ATTENDANCE
// ======================================================

module.exports.markAttendance = async (
  req,
  res
) => {
  try {

    // ==================================================
    // FIND STAFF
    // ==================================================

    const staff =
      await Staff.findById(
        req.user.id
      );


    if (!staff) {
      return res.status(404).json({
        success: false,

        message:
          "Staff not found",
      });
    }


    // ==================================================
    // GET BODY DATA
    // ==================================================

    const {
      latitude,

      longitude,

      accuracy,

      remarks,

    } = req.body;


    // ==================================================
    // SELFIE VALIDATION
    // ==================================================

    if (!req.file) {
      return res.status(400).json({
        success: false,

        message:
          "Selfie is required to mark attendance",
      });
    }


    // ==================================================
    // LOCATION VALIDATION
    // ==================================================

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Live location is required to mark attendance",
      });
    }


    const lat =
      Number(latitude);


    const lng =
      Number(longitude);


    if (
      Number.isNaN(lat) ||
      Number.isNaN(lng)
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid location coordinates",
      });
    }


    // Latitude range validation
    if (
      lat < -90 ||
      lat > 90
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid latitude value",
      });
    }


    // Longitude range validation
    if (
      lng < -180 ||
      lng > 180
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid longitude value",
      });
    }


    // ==================================================
    // TODAY DATE
    // ==================================================

    const today =
      getTodayDate();


    // ==================================================
    // CHECK ALREADY MARKED
    // ==================================================

    const alreadyMarked =
      await Attendance.findOne({
        staff: staff._id,

        date: today,
      });


    if (alreadyMarked) {
      return res.status(400).json({
        success: false,

        message:
          "Attendance already marked today",
      });
    }


    // ==================================================
    // GET LOCATION NAME
    // ==================================================

    const locationDetails =
      await getLocationDetails(
        lat,
        lng
      );


    console.log(
      "Detected Location:",
      locationDetails
    );


    // ==================================================
    // SELFIE URL
    // ==================================================

    const selfiePath =
      `/uploads/selfies/${req.file.filename}`;


    // ==================================================
    // CREATE ATTENDANCE
    // ==================================================

    const attendance =
      await Attendance.create({

        staff: staff._id,


        staffId:
          staff.staffId,


        date:
          today,


        status:
          "Present",


        checkIn:
          new Date(),


        remarks:
          remarks || "",


        // Selfie URL
        selfie:
          selfiePath,


        // Location
        location: {

          type:
            "Point",


          // IMPORTANT:
          // GeoJSON order is:
          // [longitude, latitude]

          coordinates: [
            lng,
            lat,
          ],


          // Example:
          // Ayodhya Bypass, Bhopal

          name:
            locationDetails.name,


          // Complete address

          fullAddress:
            locationDetails.fullAddress,


          accuracy:
            accuracy
              ? Number(accuracy)
              : undefined,


          capturedAt:
            new Date(),
        },
      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    return res.status(201).json({

      success: true,


      message:
        `Attendance marked successfully at ${locationDetails.name}`,


      data:
        attendance,
    });

  } catch (error) {

    console.error(
      "Mark attendance error:",
      error
    );


    return res.status(500).json({

      success: false,


      message:
        error.message,
    });
  }
};


// ======================================================
// GET MY ATTENDANCE
// ======================================================

module.exports.getMyAttendance = async (
  req,
  res
) => {
  try {

    const attendance =
      await Attendance.find({
        staff:
          req.user.id,
      }).sort({
        createdAt: -1,
      });


    return res.status(200).json({

      success: true,


      count:
        attendance.length,


      data:
        attendance,
    });

  } catch (error) {

    console.error(
      "Get attendance error:",
      error
    );


    return res.status(500).json({

      success: false,


      message:
        error.message,
    });
  }
};


// ======================================================
// ADMIN GET ATTENDANCE BY MONGODB ID OR STAFF ID
// ======================================================

module.exports.getAttendanceById = async (
  req,
  res
) => {
  try {

    const { id } =
      req.params;


    // ==================================================
    // BUILD STAFF QUERY
    // ==================================================

    const staffQuery =
      mongoose.Types.ObjectId.isValid(
        id
      )
        ? {
            $or: [
              {
                _id: id,
              },

              {
                staffId: id,
              },
            ],
          }

        : {
            staffId: id,
          };


    // ==================================================
    // FIND STAFF
    // ==================================================

    const staff =
      await Staff.findOne(
        staffQuery
      ).select(
        "name email staffId designation category joiningDate"
      );


    if (!staff) {
      return res.status(404).json({

        success: false,


        message:
          "Staff not found",
      });
    }


    // ==================================================
    // BUILD SUMMARY
    // ==================================================

    const result =
      await buildAttendanceSummary(
        staff
      );


    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({

      success: true,


      staff,


      ...result,
    });

  } catch (error) {

    console.error(
      "Admin attendance error:",
      error
    );


    return res.status(500).json({

      success: false,


      message:
        error.message,
    });
  }
};







module.exports.getStaffAttendanceByAdmin = async (req, res) => {
  try {
    const { staffId } = req.params;

    // ================================
    // CHECK STAFF
    // ================================

    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    // ================================
    // GET ATTENDANCE
    // ================================

    const attendance = await Attendance.find({
      staff: staffId,
    }).sort({
      date: -1,
    });

    // ================================
    // OVERALL SUMMARY
    // ================================

    const presentDays = attendance.filter(
      (item) => item.status === "Present"
    ).length;

    const adminLeaveDays = attendance.filter(
      (item) => item.status === "Leave"
    ).length;

    const absentDays = attendance.filter(
      (item) => item.status === "Absent"
    ).length;

    const summary = {
      totalRecords: attendance.length,

      totalWorkingDays:
        presentDays +
        adminLeaveDays +
        absentDays,

      presentDays,

      adminLeaveDays,

      absentDays,
    };

    // ================================
    // MONTH WISE GROUPING
    // ================================

    const monthMap = {};

    attendance.forEach((item) => {
      const date = new Date(item.date);

      const key =
        `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

      const monthName = date.toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      );

      if (!monthMap[key]) {
        monthMap[key] = {
          month: key,
          monthName,

          totalWorkingDays: 0,

          presentDays: 0,

          leaveDays: 0,

          absentDays: 0,

          dates: [],
        };
      }

      monthMap[key].totalWorkingDays += 1;

      if (item.status === "Present") {
        monthMap[key].presentDays += 1;
      }

      if (item.status === "Leave") {
        monthMap[key].leaveDays += 1;
      }

      if (item.status === "Absent") {
        monthMap[key].absentDays += 1;
      }

      monthMap[key].dates.push({
        _id: item._id,

        date: item.date,

        status: item.status,

        location: item.location,

        selfie: item.selfie,

        checkIn: item.checkIn,
      });
    });

    const monthWiseAttendance =
      Object.values(monthMap);

    // ================================
    // RESPONSE
    // ================================

    return res.status(200).json({
      success: true,

      staff: {
        _id: staff._id,
        name: staff.name,
        staffId: staff.staffId,
      },

      summary,

      attendance,

      monthWiseAttendance,
    });
  } catch (error) {
    console.error(
      "Admin staff attendance error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};