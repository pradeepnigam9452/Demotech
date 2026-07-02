const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/resumes";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `resume-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|doc|docx/;
  const extName = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extName) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  }
};

const resumeUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = resumeUpload;