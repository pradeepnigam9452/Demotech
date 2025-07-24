import React from "react";
import ServiceCard from "../components/ServiceCard";
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
import { motion } from 'framer-motion';

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

export default function Service({ limit ,Button}) {
  const displayedServices = limit ? services.slice(0, limit) : services;
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
    <section
      aria-label="Our Services"
      className="relative overflow-hidden"
    >

                   {/* ✅ Small Animated Banner */}
      <section className="relative py-16 sm:py-20 md:py-20 bg-gradient-to-br from-gray-700 to-gray-900 text-white overflow-hidden">
        {/* Blurred background blobs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#378bf977] rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 text-center px-4 sm:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Our <span className="text-[#5a9efa]">Services</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
          >
            Explore our comprehensive range of services designed to elevate your business and enhance your digital presence.
          </motion.p>
        </motion.div>
      </section>
      <div className="max-w-full  lg:mx-20 px-10 py-10 relative z-10  ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3 text-black">
            What Do We Offer You?
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {displayedServices.map((service) => (
            <div key={service.id} className="w-full sm:w-[48%] lg:w-[31%]">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
        {Button?
        <div className="flex justify-center">

        <button 
          className="bg-[#016386] mt-5 inline-flex gap-2 text-white px-4 py-2 rounded-lg text-lg hover:bg-[#014f59] transition"
          onClick={()=>{window.location.href="/services"}}
          >
          Show More <ArrowRightToLineIcon/>
        </button>
          </div>
        :
        <></>
        }
      </div>
    </section>
  );
}
