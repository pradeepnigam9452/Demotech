import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaCogs, FaChartLine } from "react-icons/fa";

// Color palette for each feature
const iconColors = ["#FF6B6B", "#4ECDC4", "#45B7D1"];

const features = [
  {
    id: 1,
    icon: FaLightbulb,
    title: "Tailored Strategies",
    desc: "Digital marketing aligned with your goals and customer behavior for maximum impact.",
  },
  {
    id: 2,
    icon: FaCogs,
    title: "Cutting-Edge Technology",
    desc: "We leverage the latest tools to keep your brand competitive and adaptive.",
  },
  {
    id: 3,
    icon: FaChartLine,
    title: "Results-Driven Approach",
    desc: "Using data-driven insights, we deliver performance that translates into growth and ROI.",
  },
];

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

export default function WhyChooseUs() {
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
        {/* Header – identical to theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Partner with us for innovative solutions, cutting-edge technology, and a results‑driven mindset that fuels your success.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
        </motion.div>

        {/* Features grid – with colorful icons */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((item, index) => {
            const color = iconColors[index % iconColors.length];
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Colorful Icon Container (matching Services) */}
                <div
                  className="mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${color}20`, // 20% opacity of the color
                    color: color,
                  }}
                >
                  <IconComponent size={32} strokeWidth={1.5} color={color} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#378af9] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>

                {/* Expanding bottom line (accent) */}
                <div className="mt-6 h-1 w-0 group-hover:w-full bg-[#378af9] transition-all duration-300 rounded-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}