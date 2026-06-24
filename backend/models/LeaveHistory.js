const mongoose = require("mongoose");

const leaveHistorySchema = new mongoose.Schema(
  {
    leaveType: {
      type: String,
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Approved",
    },

    adminRemark: {
      type: String,
      default: "",
    },

    totalEmployees: {
      type: Number,
      default: 0,
    },
leaveIds: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leave",
  },
],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveHistory", leaveHistorySchema);