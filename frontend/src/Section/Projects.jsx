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
        const res = await axios.get("/api/projects");
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
