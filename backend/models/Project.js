// // models/Project.js
// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   link: { type: String, required: true },
//   features: [{ type: String, required:true }]
// }, { timestamps: true });

// module.exports = mongoose.model("Project", projectSchema);



const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    features: [{ type: String, required: true }],

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],

    assignedDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);