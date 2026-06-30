import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeProjectSlider = () => {
  const navigate = useNavigate();
  const [cardsData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects/getAllProjects");
        setCardData(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Staggered animation for cards (matches HeroSection's itemVariants)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-16 md:py-20 lg:py-24" id="project">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <div className="h-6 w-24 bg-gray-200 rounded-full mx-auto animate-pulse" />
            <div className="mt-4 h-10 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="mt-3 h-5 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!cardsData.length) {
    return (
      <section className="w-full bg-white py-20 text-center text-gray-400" id="project">
        No projects found.
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden" id="project">
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
        {/* Header – identical to HeroSection's heading style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Crafting digital experiences that drive results. Take a look at some
            of our recent success stories.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
        </motion.div>

        {/* Swiper with motion-staggered slides */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-[#378af9]",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-14"
          >
            {cardsData.map((card, index) => (
              <SwiperSlide key={card._id || card.id}>
                <motion.div
                  variants={itemVariants}
                  className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden rounded-t-2xl">
                    <img
                      src={`/uploads/projects/${card.image}`}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#378af9] transition-colors">
                      {card.title}
                    </h3>

                    <ul className="flex-1 space-y-2 mb-4">
                      {card?.features?.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 mt-0.5 text-[#378af9] flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {card?.features?.length > 3 && (
                        <li className="text-xs text-gray-400 ml-6">
                          +{card.features.length - 3} more highlights
                        </li>
                      )}
                    </ul>

                    {card.link && (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#378af9] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#2a6fc7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2 mt-auto self-start shadow-md shadow-blue-200/50 hover:shadow-lg"
                      >
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All – matches HeroSection's secondary button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-1 px-5 py-1 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjectSlider; 