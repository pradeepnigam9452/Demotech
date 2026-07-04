const mongoose = require("mongoose");

const runningProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    clientName: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
    },

    deadline: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High" ,"Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Planning",
        "In Progress",
        "On Hold",
        "Completed",
      ],
      default: "Planning",
    },

    assignedStaff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],
      workUpdates: [
      {
        description: {
          type: String,
          required: true,
          trim: true,
        },

        hoursWorked: {
          type: Number,
          default: 0,
          min: 0,
        },

        workStatus: {
          type: String,
          enum: [
            "In Progress",
            "Completed",
            "Blocked",
          ],
          default: "In Progress",
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RunningProject",
  runningProjectSchema
);