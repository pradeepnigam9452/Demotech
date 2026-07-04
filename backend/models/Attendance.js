

// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema(
//   {
//     staff: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Staff",
//       required: true,
//     },

//     staffId: {
//       type: String,
//       required: true,
//     },

//     date: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["Present", "Absent", "Half Day", "Leave"],
//       default: "Present",
//     },

//     checkIn: {
//       type: Date,
//       default: Date.now,
//     },

//     checkOut: {
//       type: Date,
//     },

//     selfie: {
//       type: String,
//       required: true,
//     },

//     location: {
//       type: {
//         type: String,
//         enum: ["Point"],
//         default: "Point",
//       },

//       coordinates: {
//         type: [Number],
//         required: true,
//       },

//       accuracy: {
//         type: Number,
//       },

//       capturedAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },

//     remarks: {
//       type: String,
//       maxlength: 300,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// attendanceSchema.index(
//   {
//     staff: 1,
//     date: 1,
//   },
//   {
//     unique: true,
//   }
// );

// attendanceSchema.index({
//   location: "2dsphere",
// });

// module.exports = mongoose.model(
//   "Attendance",
//   attendanceSchema
// );


const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    staffId: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Leave"],
      default: "Present",
    },

    checkIn: {
      type: Date,
      default: Date.now,
    },

    checkOut: {
      type: Date,
    },

    // Attendance selfie
    selfie: {
      type: String,
      required: true,
    },

    // Current location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      // [longitude, latitude]
      coordinates: {
        type: [Number],
        required: true,
      },

      // Example:
      // Ayodhya Bypass, Bhopal
      name: {
        type: String,
        default: "",
      },

      // Full address
      fullAddress: {
        type: String,
        default: "",
      },

      accuracy: {
        type: Number,
      },

      capturedAt: {
        type: Date,
        default: Date.now,
      },
    },

    remarks: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

// One attendance record per staff per day
attendanceSchema.index(
  {
    staff: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

// Geo location index
attendanceSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);