const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Logo",
        "Project Image",
        "Office Image",
        "Team Image",
        "Event Image",
        "Banner",
        "Digital Marketing",
        "Other",
      ],
      default: "Other",
    },

    imageAlt: {
      type: String,
      trim: true,
    },

    projectLink: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);