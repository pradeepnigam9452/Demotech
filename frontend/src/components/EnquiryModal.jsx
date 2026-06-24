// import React, { useState } from "react";
// import emailjs from 'emailjs-com';

// const EnquiryModal = ({ isOpen, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     subject: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (loading) return; // Prevent double click
//   setLoading(true);
//   const { name, mobile, subject, description } = formData;

//   try {
//     await emailjs.send(
//       'service_ibtaz8m',
//       'template_a3y7md1',
//       {
//         name,
//         mobile,
//         subject,
//         description,
//       },
//       'XSgISvDkBsE3gzZ5W'
//     );
//     alert('Enquiry sent successfully!');
//     onClose();
//   } catch (err){
//     alert('Failed to send enquiry.');
//   } finally {
//     setLoading(false);
//   }
// };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5852527e] bg-opacity-30">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
//         <button
//           className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-4xl font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-semibold text-[#016386] mb-4">Enquiry Form</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 bg-white">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
//             required
//           />
//           <input
//             type="tel"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             placeholder="Mobile Number"
//             pattern="[0-9]{10}"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
//             required
//           />
//           <input
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder="Subject"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
//             required
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016386]"
//             rows="4"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full text-white px-4 py-2 rounded transition duration-300 
//             ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#016386] hover:bg-[#014f59]'}`}
//           >
//             {loading ? 'Sending...' : 'Send to E-mail'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EnquiryModal;



// import React, { useState } from "react";
// import emailjs from 'emailjs-com';
// import { X, Send, User, Phone, Mail as SubjectIcon, FileText } from 'lucide-react';

// const EnquiryModal = ({ isOpen, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     subject: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     const { name, mobile, subject, description } = formData;

//     try {
//       await emailjs.send(
//         'service_ibtaz8m',
//         'template_a3y7md1',
//         {
//           name,
//           mobile,
//           subject,
//           description,
//         },
//         'XSgISvDkBsE3gzZ5W'
//       );



//       alert('Enquiry sent successfully!');
//       onClose();
//       setFormData({ name: "", mobile: "", subject: "", description: "" });
//     } catch (err) {
//       alert('Failed to send enquiry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transition-all duration-300">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>

//         {/* Header */}
//         <div className="p-6 pb-2">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
//               <FileText size={20} className="text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">Enquiry Form</h2>
//           </div>
//           <p className="text-sm text-gray-500 ml-13">Fill in the details below to send us your enquiry</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Name Field */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <User size={18} />
//             </div>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Full Name"
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
//               required
//             />
//           </div>

//           {/* Mobile Field */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <Phone size={18} />
//             </div>
//             <input
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="Mobile Number"
//               pattern="[0-9]{10}"
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
//               required
//             />
//           </div>

//           {/* Subject Field */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <SubjectIcon size={18} />
//             </div>
//             <input
//               type="text"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               placeholder="Subject"
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
//               required
//             />
//           </div>

//           {/* Description Field */}
//           <div className="relative">
//             <div className="absolute left-3 top-4 text-gray-400">
//               <FileText size={18} />
//             </div>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description / Message"
//               rows={4}
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all duration-300 ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
//             }`}
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Sending...</span>
//               </>
//             ) : (
//               <>
//                 <Send size={18} />
//                 <span>Send Enquiry</span>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer Note */}
//         <div className="px-6 pb-6">
//           <p className="text-xs text-gray-400 text-center">
//             We'll get back to you within 24 hours
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryModal;.


import React, { useState } from "react";
import emailjs from 'emailjs-com';
import axios from 'axios';
import { X, Send, User, Phone, Mail as SubjectIcon, FileText } from 'lucide-react';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState({
  name: "",
  number: "",
  subject: "",
  message: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
const { name, number, subject, message } = formData;
    try {
      // 1. Send email via EmailJS
      // await emailjs.send(
      //   'service_ibtaz8m',
      //   'template_a3y7md1',
      //   {
      //     name,
      //     mobile,
      //     subject,
      //     description,
      //   },
      //   'XSgISvDkBsE3gzZ5W'
      // );

  

  await axios.post('/api/addEnquiry', {
  name,
  number,
  subject,
  message,
});

      alert('Enquiry sent successfully!');
      onClose();
      // setFormData({ name: "", mobile: "", subject: "", description: "" });
        setFormData({
  name: "",
  number: "",
  subject: "",
  message: "",
});

    } catch (err) {
      console.error('Error:', err);
      alert('Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transition-all duration-300">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Enquiry Form</h2>
          </div>
          <p className="text-sm text-gray-500 ml-13">Fill in the details below to send us your enquiry</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Mobile Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Mobile Number"
              pattern="[0-9]{10}"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Subject Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SubjectIcon size={18} />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Description Field */}
          <div className="relative">
            <div className="absolute left-3 top-4 text-gray-400">
              <FileText size={18} />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Description / Message"
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-400 text-center">
            We'll get back to you within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;