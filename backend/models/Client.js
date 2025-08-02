// models/ClientProject.js
const mongoose = require('mongoose');

const clientProjectSchema = new mongoose.Schema(
  {
    logo: {
      type: String, // Store filename or image URL
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/, // simple email format check
    },
    projectDetail: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClientProject', clientProjectSchema);
