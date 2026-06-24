// import React from 'react';
// import { FaLightbulb, FaCogs, FaChartLine } from 'react-icons/fa';

// const WhyChooseUs = () => {
//   const features = [
//     {
//       icon: <FaLightbulb className="text-4xl text-[#016386] mb-4" />,
//       title: 'Tailored Strategies',
//       desc: 'Digital marketing aligned with your goals and customer behavior for maximum impact.',
//     },
//     {
//       icon: <FaCogs className="text-4xl text-[#016386] mb-4" />,
//       title: 'Cutting-Edge Technology',
//       desc: 'We leverage the latest tools to keep your brand competitive and adaptive.',
//     },
//     {
//       icon: <FaChartLine className="text-4xl text-[#016386] mb-4" />,
//       title: 'Results-Driven Approach',
//       desc: 'Using data-driven insights, we deliver performance that translates into growth and ROI.',
//     },
//   ];

//   return (
//     <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
//       <section className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl sm:text-4xl font-bold relative inline-block after:block after:w-24 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
//             Why Choose Binarylogix?
//           </h3>
//         </div>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((item, i) => (
//             <div
//               key={i}
//               className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white text-center sm:text-left"
//             >
//               <div className="flex justify-center sm:justify-start">
//                 {item.icon}
//               </div>
//               <h4 className="text-xl sm:text-2xl font-semibold text-[#016386] mt-4 mb-2">
//                 {item.title}
//               </h4>
//               <p className="text-gray-700 text-base sm:text-lg">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WhyChooseUs;


// import React from "react";
// import { FaLightbulb, FaCogs, FaChartLine } from "react-icons/fa";

// const WhyChooseUs = () => {
//   const features = [
//     {
//       icon: <FaLightbulb className="text-3xl text-white" />,
//       title: "Tailored Strategies",
//       desc: "Digital marketing aligned with your goals and customer behavior for maximum impact.",
//     },
//     {
//       icon: <FaCogs className="text-3xl text-white" />,
//       title: "Cutting-Edge Technology",
//       desc: "We leverage the latest tools to keep your brand competitive and adaptive.",
//     },
//     {
//       icon: <FaChartLine className="text-3xl text-white" />,
//       title: "Results-Driven Approach",
//       desc: "Using data-driven insights, we deliver performance that translates into growth and ROI.",
//     },
//   ];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-16 px-4 sm:px-6 lg:px-8">
//       {/* Decorative blobs */}
//       <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
//       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="text-center mb-14">
//           <h3 className="text-4xl sm:text-5xl font-extrabold inline-block bg-gradient-to-r from-[#016386] to-[#014f59] bg-clip-text text-transparent">
//             Why Choose Binarylogix?
//           </h3>
//           <div className="w-24 h-1 bg-gradient-to-r from-[#016386] to-[#014f59] mx-auto mt-3 rounded-full"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
//             Partner with us for innovative solutions, cutting-edge technology, and a results-driven mindset that fuels your success.
//           </p>
//         </div>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border border-white/50 text-center"
//             >
//               <div className="flex justify-center mb-6">
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#016386] to-[#014f59] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
//                   {item.icon}
//                 </div>
//               </div>
//               <h4 className="text-2xl font-semibold text-[#016386] mb-3">
//                 {item.title}
//               </h4>
//               <p className="text-gray-600 text-base leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;


import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaCogs, FaChartLine } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaLightbulb className="text-3xl text-white" />,
      title: "Tailored Strategies",
      desc: "Digital marketing aligned with your goals and customer behavior for maximum impact.",
    },
    {
      icon: <FaCogs className="text-3xl text-white" />,
      title: "Cutting-Edge Technology",
      desc: "We leverage the latest tools to keep your brand competitive and adaptive.",
    },
    {
      icon: <FaChartLine className="text-3xl text-white" />,
      title: "Results-Driven Approach",
      desc: "Using data-driven insights, we deliver performance that translates into growth and ROI.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden  py-0 lg:py-1">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
         
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Why Choose Binarylogix?
          </h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Partner with us for innovative solutions, cutting-edge technology, and a results‑driven mindset that fuels your success.
          </p>
        </motion.div>

        {/* Features grid with staggered animation */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-3xl -z-10" />

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {item.desc}
              </p>

              {/* Expanding bottom line */}
              <div className="mt-6 h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-300 rounded-full mx-auto" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;