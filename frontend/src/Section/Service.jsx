

// import React from "react";
// import { motion } from "framer-motion";

// const processSteps = [
//   {
//     id: "01",
//     title: "Requirement Analysis",
//     description:
//       "We gather deep analytical insights about your business goals, target audience, and feature checklists.",
//   },
//   {
//     id: "02",
//     title: "Planning & Architecture",
//     description:
//       "Drafting structured sitemaps, system user flows, database schemas, and selecting the optimal technology stack.",
//   },
//   {
//     id: "03",
//     title: "UI/UX Design",
//     description:
//       "Crafting responsive wireframes and custom UI mockups inspired by minimalist, modern aesthetic languages.",
//   },
//   {
//     id: "04",
//     title: "Development Phase",
//     description:
//       "Our engineers write clean, document-commented, modular components utilizing Git version control.",
//   },
//   {
//     id: "05",
//     title: "Rigorous Testing",
//     description:
//       "Running quality assurance checks, integration tests, responsiveness reviews, and console audit cleanups.",
//   },
//   {
//     id: "06",
//     title: "Production Deployment",
//     description:
//       "Launching on high-speed CDN servers, configuring DNS settings, SSL layers, and caching structures.",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// export default function ProcessSection() {
//   return (
//     <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
//       {/* Animated background blobs – matching hero */}
//       <motion.div
//         className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-10"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
//         {/* Header – consistent with theme */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-14 lg:mb-18"
//         >
//           <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
//             Our Process
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
//             How We Work
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
//             A structured, transparent workflow that ensures every project is
//             delivered with precision and excellence.
//           </p>
//           <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
//         </motion.div>

//         {/* Process Steps Grid */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {processSteps.map((step) => (
//             <motion.div
//               key={step.id}
//               variants={itemVariants}
//               className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
//             >
//               {/* Step number – large, bold, with gradient text */}
//               <div className="mb-4 text-5xl font-extrabold bg-gradient-to-br from-[#378af9] to-blue-400 bg-clip-text text-transparent">
//                 {step.id}
//               </div>

//               <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#378af9] transition-colors">
//                 {step.title}
//               </h3>

//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {step.description}
//               </p>

//               {/* Subtle decorative line on hover */}
//               <div className="mt-4 h-0.5 w-8 bg-[#378af9] rounded-full group-hover:w-full transition-all duration-300" />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Optional bottom CTA – you can add a "View All" or "Contact" button here if needed */}
//       </div>
//     </section>
//   );
// }



// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Lightbulb,
//   Layers,
//   PenTool,
//   Code,
//   CheckCircle,
//   Rocket,
// } from "lucide-react";

// const processSteps = [
//   {
//     id: "01",
//     title: "Requirement Analysis",
//     description:
//       "We gather deep analytical insights about your business goals, target audience, and feature checklists.",
//     icon: Lightbulb,
//   },
//   {
//     id: "02",
//     title: "Planning & Architecture",
//     description:
//       "Drafting structured sitemaps, system user flows, database schemas, and selecting the optimal technology stack.",
//     icon: Layers,
//   },
//   {
//     id: "03",
//     title: "UI/UX Design",
//     description:
//       "Crafting responsive wireframes and custom UI mockups inspired by minimalist, modern aesthetic languages.",
//     icon: PenTool,
//   },
//   {
//     id: "04",
//     title: "Development Phase",
//     description:
//       "Our engineers write clean, document-commented, modular components utilizing Git version control.",
//     icon: Code,
//   },
//   {
//     id: "05",
//     title: "Rigorous Testing",
//     description:
//       "Running quality assurance checks, integration tests, responsiveness reviews, and console audit cleanups.",
//     icon: CheckCircle,
//   },
//   {
//     id: "06",
//     title: "Production Deployment",
//     description:
//       "Launching on high-speed CDN servers, configuring DNS settings, SSL layers, and caching structures.",
//     icon: Rocket,
//   },
// ];

// // Color palette – one per step (matches Services palette)
// const iconColors = [
//   "#FF6B6B", // red
//   "#4ECDC4", // teal
//   "#45B7D1", // blue
//   "#A29BFE", // lavender
//   "#FDCB6E", // gold
//   "#FF8A5C", // orange
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// export default function ProcessSection() {
//   return (
//     <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
//       {/* Animated background blobs */}
//       <motion.div
//         className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-10"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-14 lg:mb-18"
//         >
//           <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
//             Our Process
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
//             How We Work
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
//             A structured, transparent workflow that ensures every project is
//             delivered with precision and excellence.
//           </p>
//           <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
//         </motion.div>

//         {/* Process Steps Grid */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {processSteps.map((step, index) => {
//             const color = iconColors[index % iconColors.length];
//             const IconComponent = step.icon;

//             return (
//               <motion.div
//                 key={step.id}
//                 variants={itemVariants}
//                 className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
//               >
//                 {/* Colorful Icon Container (above the step number) */}
//                 <div
//                   className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
//                   style={{
//                     backgroundColor: `${color}20`, // 20% opacity tint
//                     color: color,
//                   }}
//                 >
//                   <IconComponent size={24} strokeWidth={1.5} color={color} />
//                 </div>

//                 {/* Step number – large, bold, with gradient text */}
//                 <div className="mb-2 text-5xl font-extrabold bg-gradient-to-br from-[#378af9] to-blue-400 bg-clip-text text-transparent">
//                   {step.id}
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#378af9] transition-colors">
//                   {step.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {step.description}
//                 </p>

//                 {/* Subtle decorative line on hover */}
//                 <div className="mt-4 h-0.5 w-8 bg-[#378af9] rounded-full group-hover:w-full transition-all duration-300" />
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }







import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Layers,
  PenTool,
  Code,
  CheckCircle,
  Rocket,
} from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "Requirement Analysis",
    description:
      "We gather deep analytical insights about your business goals, target audience, and feature checklists.",
    icon: Lightbulb,
  },
  {
    id: "02",
    title: "Planning & Architecture",
    description:
      "Drafting structured sitemaps, system user flows, database schemas, and selecting the optimal technology stack.",
    icon: Layers,
  },
  {
    id: "03",
    title: "UI/UX Design",
    description:
      "Crafting responsive wireframes and custom UI mockups inspired by minimalist, modern aesthetic languages.",
    icon: PenTool,
  },
  {
    id: "04",
    title: "Development Phase",
    description:
      "Our engineers write clean, document-commented, modular components utilizing Git version control.",
    icon: Code,
  },
  {
    id: "05",
    title: "Rigorous Testing",
    description:
      "Running quality assurance checks, integration tests, responsiveness reviews, and console audit cleanups.",
    icon: CheckCircle,
  },
  {
    id: "06",
    title: "Production Deployment",
    description:
      "Launching on high-speed CDN servers, configuring DNS settings, SSL layers, and caching structures.",
    icon: Rocket,
  },
];

// Color palette – one per step
const iconColors = [
  "#FF6B6B", // red
  "#4ECDC4", // teal
  "#45B7D1", // blue
  "#A29BFE", // lavender
  "#FDCB6E", // gold
  "#FF8A5C", // orange
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProcessSection() {
  return (
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated background blobs */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            A structured, transparent workflow that ensures every project is
            delivered with precision and excellence.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
        </motion.div>

        {/* Process Steps Grid – without numbers */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {processSteps.map((step, index) => {
            const color = iconColors[index % iconColors.length];
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                {/* Colorful Icon Container */}
                <div
                  className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color,
                  }}
                >
                  <IconComponent size={24} strokeWidth={1.5} color={color} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#378af9] transition-colors">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle decorative line on hover */}
                <div className="mt-4 h-0.5 w-8 bg-[#378af9] rounded-full group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}