import React from 'react';
import { motion } from 'framer-motion';
import defaultImg from '../assets/logo.png';

const PageBanner = ({ title, subtitle, backgroundImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full h-64 md:h-80 bg-cover bg-center   bg-[#378bf988]  flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage || defaultImg})`,
      }}
    >
      <div className="absolute inset-0  bg-blue-500/20 bg-opacity-50"></div>

      <div className="relative text-center text-black    px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg md:text-xl mt-2 text-black"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default PageBanner;
