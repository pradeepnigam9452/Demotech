import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeProjectSlider = () => {
  const navigate = useNavigate();
  const [cardsData, setCardData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects/getAllProjects");
        setCardData(res?.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full bg-white py-5" id="project">
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-5xl font-bold text-blue-900">
          Our Project
        </h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full px-4 md:px-10"
      >
        {cardsData?.map((card) => (
          <SwiperSlide key={card._id || card.id}>
            <div className="flex w-[90%] mx-auto flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl bg-white rounded-xl">
              <div className="md:w-1/2 w-full h-50 md:h-54">
                <img
                  src={`/uploads/projects/${card.image}`}
                  alt={card.title}
                  className="w-full h-full object-contain rounded-t-xl md:rounded-l-xl"
                />
              </div>

              <div className="md:w-1/2 w-full p-6 md:p-10 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-blue-500">
                    {card.title}
                  </h3>
                  <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
                    {card?.features?.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {card.link && (
                  <div>
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-black transition"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ View More Button (outside swiper) */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-black transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default HomeProjectSlider;
