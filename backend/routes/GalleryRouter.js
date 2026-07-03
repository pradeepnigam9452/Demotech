const express = require("express");
const router = express.Router();

const uploadGallery = require("../middlewares/galleryUpload");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

const {
  createGallery,
  getAllGallery,
  getActiveGallery,
  updateGallery,
  deleteGallery,
} = require("../controller/GalleryController");

router.post(
  "/gallery",
  auth,
  isAdmin,
  uploadGallery.single("image"),
  createGallery
);

router.get("/gallery", getAllGallery);

router.get("/gallery/active", getActiveGallery);


router.put(
  "/gallery/:id",
  auth,
  isAdmin,
  uploadGallery.single("image"),
  updateGallery
);

router.delete("/gallery/:id", auth, isAdmin, deleteGallery);

module.exports = router;