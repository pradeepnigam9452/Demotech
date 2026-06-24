const Staff = require("../models/Staff");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
module.exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GENERATE STAFF ID
const generateStaffId = async () => {
  const lastStaff = await Staff.findOne({ staffId: { $regex: /^BLX/ } }).sort({
    createdAt: -1,
  });
  if (!lastStaff || !lastStaff.staffId) return "BLX001";
  const lastNumber = Number(lastStaff.staffId.replace("BLX", ""));
  return `BLX${String(lastNumber + 1).padStart(3, "0")}`;
};

// CREATE STAFF

module.exports.createStaff = async (req, res) => {
  try {
    const existingEmail = await Staff.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const staffId = await generateStaffId();

  const { password } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      ...req.body,
      staffId,
      password : hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staffId: staff.staffId,
      
      // staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE STAFF
module.exports.getSingleStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STAFF
module.exports.updateStaffData = async (req, res) => {
  try {
    const { id } = req.params;
    delete req.body.staffId; // staffId update nahi hoga
    const staff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE STAFF
module.exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.stafflogin = async (req, res) => {
  try {
    const { staffId, password } = req.body;

    if (!staffId || !password) {
      return res.status(400).json({
        success: false,
        message: "Staff ID and password are required",
      });
    }

    const staff = await Staff.findOne({ staffId }).select("+password");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const matchPass = await bcrypt.compare(
      password,
      staff.password
    );

    if (!matchPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

const staffData = staff.toObject();
delete staffData.password;


    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: staffData,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getStaffdetails = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).select("-password");
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }
    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};