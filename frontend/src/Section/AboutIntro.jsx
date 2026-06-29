

// import React from "react";
// import { motion } from "framer-motion";

// const AboutIntro = () => {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
//   };


//   return (
//     <section className="w-full relative overflow-hidden bg-white py-16 md:py-24">
//       {/* Subtle decorative blobs */}
//       <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl" />
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gray-100/50 rounded-full blur-3xl" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {/* Text Content */}
//           <motion.div variants={itemVariants} className="space-y-6">
          

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
//               About{" "}
//               <span className="">Binarylogix</span>
//             </h2>

//             <div className="w-20 h-1 bg-blue-500 rounded-full" />

//             <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
//               <p>
//                 With over a year of industry experience, <strong className="text-blue-700">Binarylogix Technologies LLP</strong>{" "}
//                 specializes in delivering innovative and results‑driven solutions in{" "}
//                 <strong>website development, mobile application development, software development,</strong> and{" "}
//                 <strong>digital marketing.</strong>
//               </p>
//               <p>
//                 We are dedicated to helping businesses grow by leveraging technology that enhances digital presence,
//                 streamlines processes, and drives real impact. Whether you need a responsive website, a custom mobile app,
//                 or a complete digital marketing strategy — we tailor every solution to your specific business goals.
//               </p>
//               <p>
//                 Our team of experts focuses on quality, creativity, and performance to transform your ideas into scalable,
//                 user‑friendly digital products that stand out in today’s competitive market.
//               </p>
//               <p className="font-medium text-blue-800">
//                 Let Binarylogix be your trusted partner in digital transformation.
//               </p>
//             </div>

            
//           </motion.div>

//           {/* Image with clean frame and floating label */}
//           <motion.div
//             variants={imageVariants}
//             className="relative flex justify-center lg:justify-end"
//           >
//             <div className="relative w-full max-w-md lg:max-w-lg">
//               {/* Soft shadow behind image */}
//               <div className="absolute -inset-4 bg-gray-100/60 rounded-2xl blur-xl" />

//               <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/50 bg-white">
//                 <img
//                   src="/about.png"
//                   alt="About Binarylogix"
//                   className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
//                 />
//               </div>

            
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutIntro;




// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import EnquiryModal from '../components/EnquiryModal' // adjust path as needed

// const AboutIntro = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   return (
//     <section className="w-full relative overflow-hidden bg-white py-16 md:py-24">
//       {/* Subtle decorative blobs */}
//       <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl" />
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gray-100/50 rounded-full blur-3xl" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {/* Text Content */}
//           <motion.div variants={itemVariants} className="space-y-6">
            

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
//               About{" "}
//               <span className="text-blue-600">Binarylogix</span>
//             </h2>

//             <div className="w-20 h-1 bg-blue-500 rounded-full" />

//             <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
//               <p>
//                 With over a year of industry experience, <strong className="text-blue-700">Binarylogix Technologies LLP</strong>{" "}
//                 specializes in delivering innovative and results‑driven solutions in{" "}
//                 <strong>website development, mobile application development, software development,</strong> and{" "}
//                 <strong>digital marketing.</strong>
//               </p>
//               <p>
//                 We are dedicated to helping businesses grow by leveraging technology that enhances digital presence,
//                 streamlines processes, and drives real impact. Whether you need a responsive website, a custom mobile app,
//                 or a complete digital marketing strategy — we tailor every solution to your specific business goals.
//               </p>
//               <p>
//                 Our team of experts focuses on quality, creativity, and performance to transform your ideas into scalable,
//                 user‑friendly digital products that stand out in today’s competitive market.
//               </p>
//               <p className="font-medium text-blue-800">
//                 Let Binarylogix be your trusted partner in digital transformation.
//               </p>
//             </div>

//             {/* Call-to-action button -> opens enquiry modal */}
//             <div className="pt-4">
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Get in Touch
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>

//           {/* Image with clean frame */}
//           <motion.div
//             variants={imageVariants}
//             className="relative flex justify-center lg:justify-end"
//           >
//             <div className="relative w-full max-w-md lg:max-w-lg">
//               <div className="absolute -inset-4 bg-gray-100/60 rounded-2xl blur-xl" />
//               <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/50 bg-white">
//                 <img
//                   src="/about.png"
//                   alt="About Binarylogix"
//                   className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Enquiry Modal */}
//       <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   );
// };

// export default AboutIntro;


import React, { useState } from "react";
import { motion } from "framer-motion";
import EnquiryModal from "../components/EnquiryModal"; // adjust path as needed

const AboutIntro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants – matching the theme
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated background blobs – exactly like HeroSection */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-10"
        style={{ background: "#378af9" }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
        style={{ background: "#378af9" }}
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Badge – consistent with other sections */}
           

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              About{" "}
              <span className="text-[#378af9]">Binarylogix</span>
            </h2>

            <div className="w-20 h-1 bg-[#378af9] rounded-full" />

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                With over a year of industry experience,{" "}
                <strong className="text-[#378af9]">Binarylogix Technologies LLP</strong>{" "}
                specializes in delivering innovative and results‑driven solutions in{" "}
                <strong>website development, mobile application development, software development,</strong> and{" "}
                <strong>digital marketing.</strong>
              </p>
              <p>
                We are dedicated to helping businesses grow by leveraging technology that enhances digital presence,
                streamlines processes, and drives real impact. Whether you need a responsive website, a custom mobile app,
                or a complete digital marketing strategy — we tailor every solution to your specific business goals.
              </p>
              <p>
                Our team of experts focuses on quality, creativity, and performance to transform your ideas into scalable,
                user‑friendly digital products that stand out in today’s competitive market.
              </p>
              <p className="font-medium text-[#378af9]">
                Let Binarylogix be your trusted partner in digital transformation.
              </p>
            </div>

            {/* CTA – now matches the primary button style (rounded-full) */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#378af9] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2"
              >
                Get in Touch
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Image – clean frame with same shadow style */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-gray-100/60 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                <img
                  src="/about.png"
                  alt="About Binarylogix"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default AboutIntro;