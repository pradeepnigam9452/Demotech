// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ClientsSlider = () => {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/client-projects/getAllClientProjects")
//       .then((res) => setClients(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const duplicatedClients = [...clients, ...clients]; // for seamless scroll

//   return (
//     <div className="relative w-full overflow-hidden py-10 px-4 max-w-9xl mx-auto">
//       {/* Heading */}
//       <div className="text-center mb-10">
        
//       </div>

//       {/* Gradient edges */}
//       <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
//       <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

//       {/* Slider wrapper */}
//       <div className="slider-wrapper overflow-hidden relative">
//         <div className="slider-track flex gap-19 items-center w-max animate-scroll group-hover:paused">
//           {duplicatedClients?.map((client, idx) => (
//             <div
//               key={idx}
//               className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px] text-center"
//             >
//               <a
//                 href={client.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block hover:scale-105 transition-transform duration-300"
//               >
//                 <img
//                   src={`/uploads/projects/${client.logo}`}
//                   alt={client.clientName}
//                   className="w-full h-20 sm:h-24 object-contain bg-white  rounded-2xl shadow-md p-2"
//                 />
//               </a>
//               <p className="text-xs sm:text-sm mt-2 text-gray-700 font-medium truncate">
//                 {client.projectName}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modern animation with transform */}
//       <style jsx>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(1.2%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-scroll {
//           animation: scroll 20s linear infinite;
//         }

//         .group-hover\\:paused:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ClientsSlider;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientsSlider = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/client-projects/getAllClientProjects")
      .then((res) => setClients(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  const duplicatedClients = [...clients, ...clients];

  if (!clients.length) {
    return null;
  }

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Trusted by
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Our Clients
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-500">
            We're proud to have worked with some amazing brands and startups.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-blue-600 rounded-full" />
        </div>
      </div>

      {/* Gradient fade edges – now match a white background */}
      <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      {/* Slider wrapper */}
      <div className="slider-wrapper relative overflow-hidden mx-4 md:mx-10">
        <div className="slider-track flex gap-12 md:gap-16 w-max animate-scroll hover:[animation-play-state:paused]">
          {duplicatedClients.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] group text-center"
            >
              <a
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:scale-105 transition-all duration-300">
                  <img
                    src={`/uploads/projects/${client.logo}`}
                    alt={client.clientName}
                    className="w-full h-20 sm:h-24 object-contain mx-auto"
                  />
                </div>
              </a>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-blue-600 transition-colors">
                {client.projectName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientsSlider;