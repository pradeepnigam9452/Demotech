

// import React from "react";
// import ServiceCard from "../components/ServiceCard";
// import {
//   Globe,
//   TrendingUp,
//   Search,
//   Users,
//   Share2,
//   MonitorSmartphone,
//   Film,
//   LayoutDashboard,
//   FileText,
//   ArrowRightToLineIcon,
// } from "lucide-react";

// const services = [
//   {
//     id: 1,
//     title: "Web/App Development",
//     description:
//       "Transform your digital presence with Binarylogix’s sleek, innovative web and app solutions that captivate users and drive success.",
//     icon: <Globe size={40} />,
//   },
//   {
//     id: 2,
//     title: "Digital Marketing",
//     description:
//       "Boost your brand with Binarylogix’s strategic digital marketing services designed to connect, engage, and deliver measurable results.",
//     icon: <TrendingUp size={40} />,
//   },
//   {
//     id: 3,
//     title: "Search Engine Optimization",
//     description:
//       "Enhance visibility and rankings with Binarylogix’s expert SEO strategies, driving traffic and sustainable growth for your website.",
//     icon: <Search size={40} />,
//   },
//   {
//     id: 4,
//     title: "Social Media Optimization",
//     description:
//       "Maximize engagement with Binarylogix’s tailored SMO strategies, amplifying your brand’s visibility and fostering meaningful connections online.",
//     icon: <Users size={40} />,
//   },
//   {
//     id: 5,
//     title: "Social Media Marketing",
//     description:
//       "Reach your audience effectively with Binarylogix’s dynamic social media campaigns, driving growth and building lasting relationships.",
//     icon: <Share2 size={40} />,
//   },
//   {
//     id: 6,
//     title: "Google Ads",
//     description:
//       "Achieve higher ROI with Binarylogix’s expertly managed Google Ads, delivering targeted leads and cost-effective conversions.",
//     icon: <MonitorSmartphone size={40} />,
//   },
//   {
//     id: 7,
//     title: "Graphic Designing & Video Editing",
//     description:
//       "Stand out with Binarylogix’s stunning graphic designs and videos that captivate, communicate, and elevate your brand.",
//     icon: <Film size={40} />,
//   },
//   {
//     id: 8,
//     title: "UI/UX Designing",
//     description:
//       "Enhance user satisfaction with Binarylogix’s intuitive UI/UX designs, creating seamless, engaging digital experiences for your audience.",
//     icon: <LayoutDashboard size={40} />,
//   },
//   {
//     id: 9,
//     title: "WordPress Development",
//     description:
//       "Build robust, responsive, and tailored WordPress solutions with Binarylogix’s expert development services for optimal functionality and design.",
//     icon: <FileText size={40} />,
//   },
// ];

// export default function Service({ limit, Button }) {
//   const displayedServices = limit ? services.slice(0, limit) : services;

//   return (
//     <section
//       aria-label="Our Services"
//       className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-16"
//     >
//       {/* Decorative background blobs (optional) */}
//       <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
//       <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-14">
//           <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#016386] to-[#014f59] bg-clip-text text-transparent">
//             What Do We Offer You?
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Explore our comprehensive range of services crafted to elevate your brand and drive growth.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//           {displayedServices.map((service) => (
//             <div key={service.id} className="w-full max-w-sm transform transition duration-300 hover:-translate-y-1">
//               <ServiceCard {...service} />
//             </div>
//           ))}
//         </div>

//         {Button && (
//           <div className="flex justify-center mt-12">
//             <button
//               className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#016386] to-[#014f59] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#016386] focus:ring-offset-2"
//               onClick={() => (window.location.href = "/services")}
//             >
//               Show More
//               <ArrowRightToLineIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Search,
  Users,
  Share2,
  MonitorSmartphone,
  Film,
  LayoutDashboard,
  FileText,
  ArrowRightToLineIcon,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Web/App Development",
    description:
      "Transform your digital presence with Binarylogix’s sleek, innovative web and app solutions that captivate users and drive success.",
    icon: <Globe size={40} />,
  },
  {
    id: 2,
    title: "Digital Marketing",
    description:
      "Boost your brand with Binarylogix’s strategic digital marketing services designed to connect, engage, and deliver measurable results.",
    icon: <TrendingUp size={40} />,
  },
  {
    id: 3,
    title: "Search Engine Optimization",
    description:
      "Enhance visibility and rankings with Binarylogix’s expert SEO strategies, driving traffic and sustainable growth for your website.",
    icon: <Search size={40} />,
  },
  {
    id: 4,
    title: "Social Media Optimization",
    description:
      "Maximize engagement with Binarylogix’s tailored SMO strategies, amplifying your brand’s visibility and fostering meaningful connections online.",
    icon: <Users size={40} />,
  },
  {
    id: 5,
    title: "Social Media Marketing",
    description:
      "Reach your audience effectively with Binarylogix’s dynamic social media campaigns, driving growth and building lasting relationships.",
    icon: <Share2 size={40} />,
  },
  {
    id: 6,
    title: "Google Ads",
    description:
      "Achieve higher ROI with Binarylogix’s expertly managed Google Ads, delivering targeted leads and cost-effective conversions.",
    icon: <MonitorSmartphone size={40} />,
  },
  {
    id: 7,
    title: "Graphic Designing & Video Editing",
    description:
      "Stand out with Binarylogix’s stunning graphic designs and videos that captivate, communicate, and elevate your brand.",
    icon: <Film size={40} />,
  },
  {
    id: 8,
    title: "UI/UX Designing",
    description:
      "Enhance user satisfaction with Binarylogix’s intuitive UI/UX designs, creating seamless, engaging digital experiences for your audience.",
    icon: <LayoutDashboard size={40} />,
  },
  {
    id: 9,
    title: "WordPress Development",
    description:
      "Build robust, responsive, and tailored WordPress solutions with Binarylogix’s expert development services for optimal functionality and design.",
    icon: <FileText size={40} />,
  },
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

export default function Service({ limit, Button }) {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section
      aria-label="Our Services"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-2 lg:py-24"
    >
      {/* Subtle background blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-1 border border-blue-200">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3">
            What Do We Offer You?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our comprehensive range of services crafted to elevate your brand and drive growth.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-blue-600 rounded-full" />
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-3xl -z-10" />

              {/* Icon – solid blue background */}
              <div className="mb-5 w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Expanding bottom line */}
              <div className="mt-6 h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {Button && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* <button
              onClick={() => (window.location.href = "/services")}
              className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Show More
              <ArrowRightToLineIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button> */}
          </motion.div>
        )}
      </div>
    </section>
  );
}