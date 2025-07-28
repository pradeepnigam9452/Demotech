// components/Projects.jsx
import React, { useState } from "react";
import Card from "../components/Card"; // Adjust path if needed
import { motion } from 'framer-motion';


const cardsData = [
  {
    id: 1,
    title: "Make A Habit",
    description: "It's an app for connecting customers with local service providers. The application features a clean, modern design that allows users to easily search for and book services such as home cleaning, plumbing, and electrical work. It includes user reviews, service provider profiles, and a secure booking system to enhance user trust and convenience.",
    laptopImg: "makeahabit.png",
    mobileImg: "makeahabit.png",
    link: "https://www.makeahabit.com/",
    features: [
      "User-friendly Interface",
      "Service Provider Profiles",
      "Secure Booking System",
      "User Reviews and Ratings",
      "Both Android and iOS App"
    ]
  },
  {
    id: 2,
    title: "Pachmarhi Ayurveda",
    description: "Pachmarhi Ayurveda is a wellness and e-commerce website offering a catalog of Ayurvedic products, wellness therapies, and natural remedies. The platform highlights the benefits of Ayurveda with a serene design that appeals to health-conscious users. It supports informative content and secure browsing for online users.",
    laptopImg: "proj5.png",
    mobileImg: "proj5.png",
    link: "https://pachmarhiayurveda.com/",
    features: [
      "Ayurvedic Product Catalog",
      "Informative Content on Natural Remedies",
      "Clean UI with Herbal Theme",
      "Secure Browsing Experience",
      "Optimized for Performance and Mobile"
    ]
  },
  {
    id: 3,
    title: "How To Clean",
    description: "How To Clean is a professional cleaning service website that focuses on offering tips, solutions, and booking options for residential and commercial cleaning. Designed with a clean, modern layout, the website makes it easy for users to navigate services, read blogs, and contact experts for their cleaning needs.",
    laptopImg: "proj2.png",
    mobileImg: "proj2.png",
    link: "https://howtoclean.co.in/",
    features: [
      "Service Listing with Details",
      "Blog Section for Cleaning Tips",
      "Contact Form with Email Integration",
      "Mobile-first Responsive Layout",
      "SEO and Speed Optimization"
    ]
  },
  {
    id: 4,
    title: "EduNaukri Job-Portal",
    description: "EduNaukri is a comprehensive job portal website designed to connect job seekers with employers. It features a user-friendly interface, advanced search options, and secure login for both candidates and recruiters. The site supports job listings, applications, and profile management, ensuring a seamless experience for all users.",
    laptopImg: "jobportal.png",
    mobileImg: "jobportal.png",
    link: "https://www.edunaukri.com",
    features: [
      "User-friendly Job Search",
      "Advanced Filtering Options",
      "Secure User Profiles",
      "Employer Dashboard for Job Listings",
      "Real-time Notifications for Job Alerts"
    ]
  },
  {
    id: 5,
    title: "Chemistry Classes",
    description: "Chemistry Classes is an educational website designed to provide students with resources, tutorials, and interactive learning experiences in chemistry. The site features a user-friendly interface with easy navigation, responsive design for all devices, and a focus on delivering quality educational content.",
    laptopImg: "chemistry.jpg",
    mobileImg: "chemistry.jpg",
    link: "https://www.ruchiupadhyay.com",
    features: [
      "Comprehensive Chemistry Resources",
      "Interactive Learning Modules",
      "Responsive Design for All Devices",
      "User-friendly Navigation"
    ]
  },
  {
    id: 6,
    title: "Sakshi Hospital",
    description: "Sakshi Hospital’s website is designed to provide patients with easy access to healthcare information, doctor profiles, appointment booking, and facility details. It reflects trust and professionalism while focusing on usability for all age groups. The responsive design ensures smooth access on smartphones, tablets, and desktops.",
    laptopImg: "proj4.png",
    mobileImg: "proj4.png",
    link: "https://sakshihospital.in/",
    features: [
      "Doctor Profiles with Qualifications",
      "Online Appointment System",
      "Service Pages with Detailed Info",
      "Accessible UI for All Ages",
      "Google Map Integration"
    ]
  },
  {
    id: 7,
    title: "Saravati Shishu Vidya Mandir Sironj",
    description: "Saravati Shishu Vidya Mandir Sironj is an educational institution website built to provide an engaging and informative digital presence for students, parents, and teachers. The site showcases the school's values, curriculum, and facilities while maintaining a simple and responsive layout to ensure accessibility across devices and platforms.",
    laptopImg: "proj1.png",
    mobileImg: "proj1.png",
    link: "https://ssvmsironj.edu.in/",
    features: [
      "Fully Responsive Design",
      "Easy Navigation for Users",
      "Cross-browser Compatibility",
      "Showcase for Academic & Cultural Activities",
      "Fast Load Time & Optimized Media"
    ]
  },
  {
    id: 8,
    title: "Robo Fintech Pvt Ltd",
    description: "Robo Fintech Pvt Ltd is a financial technology website built to represent modern fintech services, investment tools, and consultancy features. It includes a user-centric design with call-to-actions, interactive components, and secure data management practices. The site is built with scalability and speed in mind for better user experience.",
    laptopImg: "proj3.png",
    mobileImg: "proj3.png",
    link: "https://robo.binarylogix.in/",
    features: [
      "Interactive Dashboard UI",
      "Secure Login and Client Portal",
      "Service Highlights with CTA Buttons",
      "Performance-Driven Design",
      "Business-Oriented Aesthetic"
    ]
  }

];


const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Calculate indexes
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardsData.length / cardsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
            className="text-3xl sm:text-3xl md:text-5xl font-bold"
          >
            Our <span className="text-[#5a9efa]">Projects</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
          >
            Explore our diverse portfolio of projects that showcase our expertise in delivering innovative and impactful solutions.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-2 md:px-6 py-12 flex justify-center">
        <div className="grid grid-cols-1 gap-8 md:w-4/5">
          {currentCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              laptopImg={card.laptopImg}
              mobileImg={card.mobileImg}
              features={card.features}
              link={card.link}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center items-center space-x-4 mb-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Projects;