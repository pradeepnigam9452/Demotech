// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Service from "../Section/Service";
// import { motion } from 'framer-motion';

// export default function OurServices() {
//     const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };
//   return (
//     <>
//     <Navbar/>
//       <section className="relative py-16 sm:py-20 md:py-20 bg-gradient-to-br from-gray-700 to-gray-900 text-white overflow-hidden">
//         {/* Blurred background blobs */}
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#378bf977] rounded-full blur-3xl opacity-30"
//           animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-30"
//           animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         />

//         <motion.div
//           className="relative z-10 text-center px-4 sm:px-6"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1
//             variants={itemVariants}
//             className="text-3xl sm:text-4xl md:text-5xl font-bold"
//           >
//             Our <span className="text-[#5a9efa]">Services</span>
//           </motion.h1>
//           <motion.p
//             variants={itemVariants}
//             className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
//           >
//             Explore our comprehensive range of services designed to elevate your business and enhance your digital presence.
//           </motion.p>
//         </motion.div>
//       </section>
//     <Service/>
//     <Footer/>
//       </>
//   );
// }



// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Service from "../Section/Service";
// import { motion } from "framer-motion";

// export default function OurServices() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       <Navbar />



//       {/* Services Component */}
//       <Service />

//       {/* NEW: Call to Action Section */}
//       <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
//         <motion.div
//           className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
//           style={{ background: "#378af9" }}
//           animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-blue-100/30"
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//               Ready to <span className="text-[#378af9]">Start Your Project</span>?
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
//               Let’s discuss your idea and turn it into a powerful digital solution. Our team is here to help you grow.
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center">
            
//                 <button className="inline-flex items-center gap-2 bg-[#378af9] text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2">
//                   Get a Free Quote
//                   <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </button>
               
              
//               <a href="/contact">
//                 <button className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
//                   Contact Us
//                 </button>
//               </a>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }



import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Service from "../Section/Service";
import EnquiryModal from "../components/EnquiryModal"; // adjust path if needed
import { motion } from "framer-motion";
import Servicescomponets from '../Section/Servicescomponets'
export default function OurServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />

      {/* Services Component */}
     

      <Servicescomponets />

       <Service />

      {/* Call to Action Section */}
      <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-blue-100/30"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to <span className="text-[#378af9]">Start Your Project</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Let’s discuss your idea and turn it into a powerful digital solution. Our team is here to help you grow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Get a Free Quote — opens modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#378af9] text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2"
              >
                Get a Free Quote
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Contact Us — navigates to contact page */}
              <a href="/contact">
                <button className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  Contact Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}