const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerJob",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
    },

    resumeLink: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Selected", "Rejected"],
      default: "Pending",
    },
    resume: {
  type: String,
  required: true,
},

resumeOriginalName: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);