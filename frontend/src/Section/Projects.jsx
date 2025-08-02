import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects/getAllProjects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentCards = Array.isArray(projects)
  ? projects.slice(indexOfFirstCard, indexOfLastCard)
  : [];

  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(current => current - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(current => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      {/* [Your Banner code remains same] */}
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
            <Card key={card._id} {...card} />
          ))}
        </div>
      </section>
      <div className="flex justify-center items-center space-x-4 mb-10">
        <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">Previous</button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </>
  );
};

export default Projects;
