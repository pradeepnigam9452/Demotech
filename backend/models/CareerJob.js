const mongoose = require("mongoose");

const careerJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "Bhopal, Madhya Pradesh",
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Remote", "Hybrid"],
      default: "Full Time",
    },

    experience: {
      type: String,
      default: "Fresher",
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerJob", careerJobSchema);