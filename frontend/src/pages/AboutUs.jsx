// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Background from '../components/Background';
// import AboutIntro from '../Section/AboutIntro';
// import Features from '../Section/Features';
// import WorkingProcess from '../Section/WorkingProcess';
// import WhyChooseUs from '../Section/WhyChooseUs';
// import PageBanner from '../components/PageBanner';
// import { motion } from 'framer-motion';
// import ClientsSlider from '../components/ClientsSlider';

// const AboutUs = () => {
//       const containerVariants = {
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
//       {/* <Background /> */}
//       <Navbar />
//       <section className="relative py-16 sm:py-20 md:py-20  text-white overflow-hidden">
//         {/* Blurred background blobs */}
//         <motion.div
//           className="absolute  rounded-full blur-3xl opacity-30"
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
//             About <span className="text-[#5a9efa]">Us</span>
//           </motion.h1>
//           <motion.p
//             variants={itemVariants}
//             className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
//           >
//             Discover our journey, mission, and the values that drive us to deliver exceptional digital solutions.
//           </motion.p>
//         </motion.div>
//       </section>
//         <AboutIntro />
//         <ClientsSlider/>
//         {/* <Features /> */}
//         <WorkingProcess />
//         <WhyChooseUs />
//       <Footer />
//     </>
//   );
// };

// export default AboutUs;



import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutIntro from '../Section/AboutIntro';
import WorkingProcess from '../Section/WorkingProcess';
import WhyChooseUs from '../Section/WhyChooseUs';
import ClientsSlider from '../components/ClientsSlider';
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
      <Navbar />

      {/* Page Banner – now matches the theme (white background, blue blobs, consistent header) */}


      {/* <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4"
            >
              About Us
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
            >
              About <span className="text-[#378af9]">Binarylogix</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl mx-auto text-lg text-gray-500"
            >
              Discover our journey, mission, and the values that drive us to deliver exceptional digital solutions.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full"
            />
          </motion.div>
        </div>
      </section> */}

      {/* About Intro Section */}
      <AboutIntro />

      {/* Clients Slider */}
      <ClientsSlider />

      {/* Working Process */}
      {/* <WorkingProcess /> */}

      {/* Why Choose Us */}
      <WhyChooseUs />

      <Footer />
    </>
  );
};

export default AboutUs;