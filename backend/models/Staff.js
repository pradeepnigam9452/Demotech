const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
      name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Invalid mobile number"],
    },

    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

  category: {
  type: String,
  enum: [
    "HR",
    "admin",
    "Frontend Developer",
    "Backend Developer",
    "MERN Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Project Manager",
    "Business Analyst",
    "Digital Marketer",
    "Content Writer",
    "Sales Executive",
    "Support Engineer",
    "Intern",
    "Other",
  ],
  default: "Other",
},

    designation: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    github:{
      type : String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married"],
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },


    pincode: {
      type: String,
      trim: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },

    salary: {
      type: Number,
      min: 0,
    },

    experience: {
      type: Number,
      default: 0,
    },
    // password: {
    //   type: String,
    //   select: false, 
    // },

    password: {
  type: String,
  required: true,
  select: false,
},

    role: {
      type: String,
      enum: ["staff"],
      default: "staff",
    },
    
    aadhaarNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },

    remarks: {
      type: String,  // here we can add additional notes or comments about staff
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", staffSchema);

