

const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ============================
// GET ALL STAFF
// ============================
module.exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find()
      .select("-password")
      .sort({ createdAt: -1 });

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


const generateStaffId = async () => {
  const lastStaff = await Staff.findOne({
    staffId: { $regex: /^BLX/ },
  }).sort({ createdAt: -1 });

  if (!lastStaff || !lastStaff.staffId) return "BLX001";

  const lastNumber = Number(lastStaff.staffId.replace("BLX", ""));

  return `BLX${String(lastNumber + 1).padStart(3, "0")}`;
};


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

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImage = "";

    if (req.file) {
      profileImage = `/uploads/staff/${req.file.filename}`;
    }

    const staff = await Staff.create({
      ...req.body,
      staffId,
      password: hashedPassword,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staffId: staff.staffId,
      data: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        staffId: staff.staffId,
        profileImage: staff.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.getSingleStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff id",
      });
    }

    const staff = await Staff.findById(id).select("-password");

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

// ============================
// UPDATE STAFF
// // ============================
// module.exports.updateStaffData = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid staff id",
//       });
//     }

//     delete req.body.staffId; // staffId update nahi hoga

//     // Email duplicate check
//     if (req.body.email) {
//       req.body.email = req.body.email.toLowerCase().trim();

//       const existingEmail = await Staff.findOne({
//         email: req.body.email,
//         _id: { $ne: id },
//       });

//       if (existingEmail) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already exists",
//         });
//       }
//     }

//     // Password update ho raha hai to hash karo
//     if (req.body.password) {
//       req.body.password = await bcrypt.hash(req.body.password, 10);
//     } else {
//       delete req.body.password;
//     }

//     const staff = await Staff.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     if (!staff) {
//       return res.status(404).json({
//         success: false,
//         message: "Staff not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Staff updated successfully",
//       data: staff,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
module.exports.updateStaffData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff id",
      });
    }

    // Pehle old staff find karo
    const oldStaff = await Staff.findById(id);

    if (!oldStaff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    delete req.body.staffId; // staffId update nahi hoga

    // Email duplicate check
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase().trim();

      const existingEmail = await Staff.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Password update ho raha hai to hash karo
    if (req.body.password && req.body.password.trim() !== "") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete req.body.password;
    }

    // ✅ Image update handling
    if (req.file) {
      req.body.profileImage = `/uploads/staff/${req.file.filename}`;

      // Old image delete karna ho to
      if (oldStaff.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          oldStaff.profileImage.replace(/^\/+/, "")
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const staff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

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

// ============================
// DELETE STAFF
// ============================
module.exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff id",
      });
    }

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

// ============================
// STAFF LOGIN
// ============================
module.exports.stafflogin = async (req, res) => {
  try {
    const { staffId, password } = req.body;

    if (!staffId || !password) {
      return res.status(400).json({
        success: false,
        message: "Staff ID and password are required",
      });
    }

    const staff = await Staff.findOne({
      staffId: staffId.trim().toUpperCase(),
    }).select("+password");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const matchPass = await bcrypt.compare(password, staff.password);

    if (!matchPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is missing in environment variables",
      });
    }

    const staffData = staff.toObject();
    delete staffData.password;

    const token = jwt.sign(
      {
        id: staff._id,
        role: staff.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: staffData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET STAFF DETAILS BY TOKEN
// ============================
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