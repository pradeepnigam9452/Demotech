// routes/admin.js
const express = require("express");
const router = express.Router();
const { addEnquiry,updateEnquiryStatus,deleteEnquiry ,getAllEnquiries} = require("../controller/EnquiryController");

router.post("/addEnquiry", addEnquiry);  
router.get('/admin/enquiries', getAllEnquiries); 

router.patch('/admin/enquiries/:id/status', updateEnquiryStatus);

router.delete('/admin/enquiries/:id', deleteEnquiry);
module.exports = router;


