import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientsSlider = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/client-projects/getAllClientProjects")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const duplicatedClients = [...clients, ...clients]; // for seamless scroll

  return (
    <div className="relative w-full overflow-hidden py-10 px-4 max-w-9xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#1B3C53] inline-block relative after:content-[''] after:block after:w-20 after:h-1 after:bg-blue-900 after:mx-auto after:mt-2">
          Our Clients
        </h3>
      </div>

      {/* Gradient edges */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      {/* Slider wrapper */}
      <div className="slider-wrapper overflow-hidden relative">
        <div className="slider-track flex gap-19 items-center w-max animate-scroll group-hover:paused">
          {duplicatedClients?.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px] text-center"
            >
              <a
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`/uploads/projects/${client.logo}`}
                  alt={client.clientName}
                  className="w-full h-20 sm:h-24 object-contain bg-white  rounded-2xl shadow-md p-2"
                />
              </a>
              <p className="text-xs sm:text-sm mt-2 text-gray-700 font-medium truncate">
                {client.projectName}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modern animation with transform */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(1.2%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .group-hover\\:paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientsSlider;
