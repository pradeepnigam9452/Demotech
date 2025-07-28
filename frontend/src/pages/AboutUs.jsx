import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import AboutIntro from '../Section/AboutIntro';
import Features from '../Section/Features';
import WorkingProcess from '../Section/WorkingProcess';
import WhyChooseUs from '../Section/WhyChooseUs';
import PageBanner from '../components/PageBanner';
import { motion } from 'framer-motion';

const AboutUs = () => {
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
      <Background />
      <Navbar />
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
            About <span className="text-[#5a9efa]">Us</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
          >
            Discover our journey, mission, and the values that drive us to deliver exceptional digital solutions.
          </motion.p>
        </motion.div>
      </section>
        <AboutIntro />
        <Features />
        <WorkingProcess />
        <WhyChooseUs />
      <Footer />
    </>
  );
};

export default AboutUs;
