// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const HomeProjectSlider = () => {
//   const navigate = useNavigate();
//   const [cardsData, setCardData] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axios.get("/api/projects/getAllProjects");
//         setCardData(res?.data);
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   return (
//     <div className="w-full bg-white py-5" id="project">
//       <div className="text-center mb-10">
//         <h2 className="text-xl sm:text-5xl font-bold text-blue-900">
//           Our Project
//         </h2>
//       </div>

//       <Swiper
//         modules={[Autoplay, Pagination]}
//         slidesPerView={1}
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         loop={true}
//         pagination={{ clickable: true }}
//         className="w-full px-4 md:px-10"
//       >
//         {cardsData?.map((card) => (
//           <SwiperSlide key={card._id || card.id}>
//             <div className="flex w-[90%] mx-auto flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl bg-white rounded-xl">
//               <div className="md:w-1/2 w-full h-50 md:h-54">
//                 <img
//                   src={`/uploads/projects/${card.image}`}
//                   alt={card.title}
//                   className="w-full h-full object-contain rounded-t-xl md:rounded-l-xl"
//                 />
//               </div>

//               <div className="md:w-1/2 w-full p-6 md:p-10 space-y-4 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-2xl md:text-3xl font-bold mb-2 text-blue-500">
//                     {card.title}
//                   </h3>
//                   <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
//                     {card?.features?.map((feature, idx) => (
//                       <li key={idx}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 {card.link && (
//                   <div>
//                     <a
//                       href={card.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-black transition"
//                     >
//                       Visit Website
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ✅ View More Button (outside swiper) */}
//       <div className="flex justify-center mt-6">
//         <button
//           onClick={() => navigate("/projects")}
//           className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-black transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           View More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomeProjectSlider;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

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

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-16" id="project">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
          <div className="mt-3 h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="flex justify-center">
          <div className="w-80 h-96 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!cardsData.length) {
    return (
      <div className="w-full py-20 text-center text-gray-400">
        No projects found.
      </div>
    );
  }

  return (
    <section className="relative w-full bg-white py-20 lg:py-24" id="project">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-18">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Crafting digital experiences that drive results. Take a look at some
            of our recent success stories.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-600",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {cardsData.map((card) => (
            <SwiperSlide key={card._id || card.id}>
              <div className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                {/* Image Container – 16:9 aspect ratio, rounded top corners */}
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden rounded-t-2xl">
                  <img
                    src={`/uploads/projects/${card.image}`}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge (optional – remove if not in data) */}
                  {card.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {card.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>

                  <ul className="flex-1 space-y-2 mb-4">
                    {card?.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0"
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
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-auto self-start"
                    >
                      View Project
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            View All Projects
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeProjectSlider;