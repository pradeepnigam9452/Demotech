import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const cardLoadVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const contentHoverVariant = {
  hover: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Card = ({ title, description, laptopImg, mobileImg, features, link }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const imgList = [
    { src: laptopImg, label: "Laptop View" },
    { src: mobileImg, label: "Mobile View" },
  ];

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + imgList.length) % imgList.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full px-2 sm:px- lg:px-6 py-6"
      variants={cardLoadVariant}
      initial="hidden"
      animate="visible"
    >
      <div
        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col lg:flex-row overflow-hidden"
        style={{ fontFamily: "Jost" }}
      >
        {/* Image Section */}
        <motion.div className="w-full lg:w-1/2 bg-gray-50 p-4 relative">
          <div className="relative w-full h-72 sm:h-80 md:h-96 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={imgList[index].src}
                alt={imgList[index].label}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute rounded-xl max-h-full max-w-full object-contain"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="w-full lg:w-1/2 p-6 sm:p-8 relative flex flex-col justify-between"
          variants={contentHoverVariant}
          whileHover="hover"
        >
          <div>
            <h2
              className="text-2xl font-bold sm:text-3xl bg-sky-800 w-fit px-4 py-2 rounded-2xl text-white"
              style={{ fontFamily: "Merriweather, cursive" }}
            >
              {title}
            </h2>
            <p className="text-slate-600 text-justify mt-4 text-base sm:text-lg">
              <span className="font-bold text-black">Description:</span> {description}
            </p>

            {features && (
              <div className="mt-6">
                <p className="text-black font-bold mb-2">Features</p>
                <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
                  {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex justify-center items-center gap-1.5 bg-blue-800 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg w-fit"
            >
              Visit Website <ExternalLink size={14} />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
