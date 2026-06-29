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
        setProjects(res?.data);
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
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Animated background blobs */}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
              Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Our <span className="text-[#378af9]">Projects</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Explore our diverse portfolio of projects that showcase our expertise in delivering innovative and impactful solutions.
            </p>
            <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* <section className="px-2 md:px-6 py-12 flex justify-center">
        <div className="grid grid-cols-1 gap-8 md:w-4/5">
          {currentCards.map((card) => (
            <Card key={card._id} {...card} />
          ))}
        </div>
      </section>
        */}

<section className="w-full bg-white pb-16 md:pb-20 lg:pb-24">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentCards.map((card) => (
        <div
          key={card._id || card.id}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Image */}
          <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
            <img
              src={`/uploads/projects/${card.image}`}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => (e.target.src = '/placeholder.png')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#378af9] transition-colors line-clamp-2">
              {card.title}
            </h3>

            {/* Features (first 2) */}
            <ul className="flex-1 space-y-1.5 mb-3">
              {card?.features?.slice(0, 2).map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-[#378af9] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
              {card?.features?.length > 2 && (
                <li className="text-xs text-gray-400 ml-6">+{card.features.length - 2} more</li>
              )}
            </ul>

            {card.link && (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#378af9] hover:text-[#2a6fc7] transition-colors mt-auto"
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Pagination (if needed) — keep the same as before */}
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

