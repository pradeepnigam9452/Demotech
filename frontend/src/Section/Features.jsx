// import React from 'react';
// import { FaPuzzlePiece, FaBullseye, FaRocket } from 'react-icons/fa';

// const Features = () => {
//   const featureList = [
//     {
//       icon: <FaPuzzlePiece className="text-4xl text-[#016386] mb-4" />,
//       title: 'Customized Solutions',
//       desc: 'We design tailored solutions for your unique business to ensure enhanced efficiency and long-term success.',
//     },
//     {
//       icon: <FaBullseye className="text-4xl text-[#016386] mb-4" />,
//       title: 'Strategic Planning',
//       desc: 'From roadmap creation to execution, our strategies are built to deliver growth, optimization, and measurable results.',
//     },
//     {
//       icon: <FaRocket className="text-4xl text-[#016386] mb-4" />,
//       title: 'Innovation & Technology',
//       desc: 'We leverage cutting-edge technologies to drive innovation, streamline operations, and keep your business ahead of the curve.',
//     },
//   ];

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto text-center">
//           <h3 className="text-3xl sm:text-4xl font-bold mb-12 relative inline-block after:block after:w-20 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
//             What We Offer
//           </h3>
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {featureList.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white  p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center sm:text-left"
//               >
//                 <div className="flex justify-center sm:justify-start">
//                   {item.icon}
//                 </div>
//                 <h4 className="text-xl sm:text-2xl font-semibold text-[#016386] mt-4 mb-2">
//                   {item.title}
//                 </h4>
//                 <p className="text-gray-600 text-base sm:text-lg">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Features;


import React from "react";
import { FaPuzzlePiece, FaBullseye, FaRocket } from "react-icons/fa";

const Features = () => {
  const featureList = [
    {
      icon: <FaPuzzlePiece className="text-3xl text-white" />,
      title: "Customized Solutions",
      desc: "We design tailored solutions for your unique business to ensure enhanced efficiency and long-term success.",
    },
    {
      icon: <FaBullseye className="text-3xl text-white" />,
      title: "Strategic Planning",
      desc: "From roadmap creation to execution, our strategies are built to deliver growth, optimization, and measurable results.",
    },
    {
      icon: <FaRocket className="text-3xl text-white" />,
      title: "Innovation & Technology",
      desc: "We leverage cutting-edge technologies to drive innovation, streamline operations, and keep your business ahead of the curve.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h3 className="text-4xl sm:text-5xl font-extrabold inline-block bg-gradient-to-r from-[#016386] to-[#014f59] bg-clip-text text-transparent">
            What We Offer
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-[#016386] to-[#014f59] mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Discover how our expertise can drive your business forward with tailored strategies and innovative technology.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map((item, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border border-white/50 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#016386] to-[#014f59] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {item.icon}
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-[#016386] mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;