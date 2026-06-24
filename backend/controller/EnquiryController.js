const Enquiry = require('../models/Enquiries')

module.exports.addEnquiry = async (req, res) => {
  try {
    const { name, number, subject, message } = req.body; 
    if (!name || !number || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newEnquiry = await Enquiry.create({
      name,
      number,
      subject,
      message,
      status: 'pending', 
    });
    res.status(201).json({
      success: true,
      message: 'Enquiry sent successfully',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error('Add Enquiry Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.updateEnquiryStatus = async (req, res) => {

   try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id); 

    if (!deleted) return res.status(404).json({ error: 'Not found' });

    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
