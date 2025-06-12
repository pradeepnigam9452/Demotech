import React, { useState } from "react";
import emailjs from 'emailjs-com';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // Prevent double click

  setLoading(true);
  const { name, mobile, subject, description } = formData;

  try {
    await emailjs.send(
      'service_ibtaz8m',
      'template_a3y7md1',
      {
        name,
        mobile,
        subject,
        description,
      },
      'XSgISvDkBsE3gzZ5W'
    );
    alert('Enquiry sent successfully!');
    onClose();
  } catch (err) {
    alert('Failed to send enquiry.');
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5852527e] bg-opacity-30">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-4xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-[#016386] mb-4">Enquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-4 py-2 rounded transition duration-300 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#016386] hover:bg-[#014f59]'}`}
          >
            {loading ? 'Sending...' : 'Send to E-mail'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
