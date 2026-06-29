

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ClientsSlider = () => {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/client-projects/getAllClientProjects")
//       .then((res) => setClients(res.data || []))
//       .catch((err) => console.error(err));
//   }, []);

//   const duplicatedClients = [...clients, ...clients];

//   if (!clients.length) {
//     return null;
//   }

//   return (
//     <section className="relative w-full py-12 md:py-16 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
//             Trusted by
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
//             Our Clients
//           </h2>
//           <p className="mt-4 max-w-xl mx-auto text-lg text-gray-500">
//             We're proud to have worked with some amazing brands and startups.
//           </p>
//           <div className="mt-6 mx-auto w-20 h-1 bg-blue-600 rounded-full" />
//         </div>
//       </div>

//       {/* Gradient fade edges – now match a white background */}
//       <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
//       <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

//       {/* Slider wrapper */}
//       <div className="slider-wrapper relative overflow-hidden mx-4 md:mx-10">
//         <div className="slider-track flex gap-12 md:gap-16 w-max animate-scroll hover:[animation-play-state:paused]">
//           {duplicatedClients.map((client, idx) => (
//             <div
//               key={idx}
//               className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] group text-center"
//             >
//               <a
//                 href={client.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:scale-105 transition-all duration-300">
//                   <img
//                     src={`/uploads/projects/${client.logo}`}
//                     alt={client.clientName}
//                     className="w-full h-20 sm:h-24 object-contain mx-auto"
//                   />
//                 </div>
//               </a>
//               <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-blue-600 transition-colors">
//                 {client.projectName}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-scroll {
//           animation: scroll 25s linear infinite;
//         }

//         .slider-track:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ClientsSlider;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ClientsSlider = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/client-projects/getAllClientProjects")
      .then((res) => setClients(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  if (!clients.length) {
    return null;
  }

  // Duplicate for seamless scrolling
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative w-full bg-white py-8 md:py-10 lg:py-14 overflow-hidden">
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
        {/* Header – identical to HeroSection and ProjectSlider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
            Trusted by
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Our Clients
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-500">
            We're proud to have worked with some amazing brands and startups.
          </p>
          <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
        </motion.div>

        {/* Marquee wrapper with gradient edge fades */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex gap-10 md:gap-14 w-max animate-scroll hover:[animation-play-state:paused]">
              {duplicatedClients.map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % clients.length) * 0.05 }}
                  className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] group text-center"
                >
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-[#378af9]/30">
                      <img
                        src={`/uploads/projects/${client.logo}`}
                        alt={client.clientName}
                        className="w-full h-20 sm:h-24 object-contain mx-auto"
                      />
                    </div>
                  </a>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-[#378af9] transition-colors">
                    {client.projectName}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom scroll animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsSlider;