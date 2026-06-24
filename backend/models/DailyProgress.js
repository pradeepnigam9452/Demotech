const mongoose = require("mongoose");

const dailyProgressSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    workDetails: {
      type: String,
      required: true,
      trim: true,
    },

    hoursWorked: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "In Progress",
    },
  },
  { timestamps: true }
);

dailyProgressSchema.index({
  project: 1,
  staff: 1,
  date: 1,
});

module.exports = mongoose.model("DailyProgress", dailyProgressSchema);