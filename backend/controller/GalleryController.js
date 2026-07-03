const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// helper: convert windows path "\" to "/"
const normalizePath = (filePath) => {
  return filePath ? filePath.replace(/\\/g, "/") : "";
};

// helper: delete image from uploads folder
const deleteFile = (filePath) => {
  if (!filePath) return;

  const fullPath = path.join(__dirname, "..", filePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};


module.exports.createGallery = async (req, res) => {
  try {
    const { title, description, category, imageAlt, projectLink, status } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const gallery = await Gallery.create({
      title,
      description,
      category,
      imageAlt,
      projectLink,
      status,
      image: normalizePath(req.file.path),
      uploadedBy: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      data: gallery,
    });
  } catch (error) {
    console.log("Create Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL GALLERY IMAGES
// ===============================

module.exports.getAllGallery = async (req, res) => {
  try {
    const { category, status } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const gallery = await Gallery.find(filter)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.log("Get Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ACTIVE GALLERY ONLY
// ===============================
module.exports.getActiveGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ status: "Active" }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.log("Get Active Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// UPDATE GALLERY IMAGE
// ===============================
module.exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    const { title, description, category, imageAlt, projectLink, status } =
      req.body;

    if (title) gallery.title = title;
    if (description !== undefined) gallery.description = description;
    if (category) gallery.category = category;
    if (imageAlt !== undefined) gallery.imageAlt = imageAlt;
    if (projectLink !== undefined) gallery.projectLink = projectLink;
    if (status) gallery.status = status;

    // if new image uploaded, delete old image and save new image
    if (req.file) {
      deleteFile(gallery.image);
      gallery.image = normalizePath(req.file.path);
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      data: gallery,
    });
  } catch (error) {
    console.log("Update Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE GALLERY IMAGE
// ===============================
module.exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    deleteFile(gallery.image);

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.log("Delete Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};