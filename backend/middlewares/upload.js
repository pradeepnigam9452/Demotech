// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Folder path
// const uploadPath = "uploads/projects";

// // Create folder if it doesn't exist
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true }); // creates nested folders too
// }

// // Storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter (optional: images only)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;



const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create folder if not exists
const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/projects";

    // Staff profile image
    if (file.fieldname === "profileImage") {
      uploadPath = "uploads/staff";
    }

    // Project image
    if (file.fieldname === "image" || file.fieldname === "projectImage") {
      uploadPath = "uploads/projects";
    }

    createFolder(uploadPath);
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;