// import React from 'react';

// const WorkingProcess = () => {
//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <section className="max-w-7xl mx-auto text-center">
//         <h3 className="text-3xl sm:text-4xl font-bold mb-10 relative inline-block after:block after:w-24 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
//           Our Standard Process
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               step: 'Define Requirements',
//               desc: 'We gather insights and define clear objectives to deliver solutions aligned with your business goals.',
//               icon: '📝',
//             },
//             {
//               step: 'Design & Prototype',
//               desc: 'Creating intuitive designs and functional prototypes that reflect your vision and ensure usability.',
//               icon: '🎨',
//             },
//             {
//               step: 'Final Solution',
//               desc: 'We implement polished, efficient solutions with full support and deployment strategy.',
//               icon: '🚀',
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white"
//             >
//               <div className="text-4xl sm:text-5xl mb-3">{item.icon}</div>
//               <div className="text-sm sm:text-md font-semibold text-[#016386] mb-1">
//                 Step {i + 1}
//               </div>
//               <h4 className="text-lg sm:text-xl font-bold mb-2">{item.step}</h4>
//               <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WorkingProcess;



// import React from "react";

// const WorkingProcess = () => {
//   const steps = [
//     {
//       step: "Define Requirements",
//       desc: "We gather insights and define clear objectives to deliver solutions aligned with your business goals.",
//       icon: "📝",
//     },
//     {
//       step: "Design & Prototype",
//       desc: "Creating intuitive designs and functional prototypes that reflect your vision and ensure usability.",
//       icon: "🎨",
//     },
//     {
//       step: "Final Solution",
//       desc: "We implement polished, efficient solutions with full support and deployment strategy.",
//       icon: "🚀",
//     },
//   ];

//   return (
//     <section className="py-16 md:py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
//             Our Process
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//             How We Work
//           </h2>
//           <div className="mt-5 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
//         </div>

//         {/* Steps grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {steps.map((item, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center text-center bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               <div className="text-4xl mb-5">{item.icon}</div>
//               <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
//                 Step {i + 1}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 {item.step}
//               </h3>
//               <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkingProcess;




import React from "react";

const WorkingProcess = () => {
  const steps = [
    {
      step: "Define Requirements",
      desc: "We gather insights and define clear objectives to deliver solutions aligned with your business goals.",
      icon: "📝",
    },
    {
      step: "Design & Prototype",
      desc: "Creating intuitive designs and functional prototypes that reflect your vision and ensure usability.",
      icon: "🎨",
    },
    {
      step: "Final Solution",
      desc: "We implement polished, efficient solutions with full support and deployment strategy.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            How We Work
          </h2>
          <div className="mt-5 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Three‑column grid with connecting line */}
        <div className="relative">
          {/* Connecting line + arrows (visible on md+ screens) */}
          <div className="hidden md:block absolute left-0 right-0 top-14 z-0">
            <div className="relative h-0.5 bg-blue-200 mx-16">
              {/* Left arrow */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-3 h-3 border-t-2 border-r-2 border-blue-300 rotate-45" />
              {/* Right arrow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-3 h-3 border-t-2 border-r-2 border-blue-300 rotate-45" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {steps.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Large step number */}
                <div className="text-5xl font-extrabold text-blue-100 mb-4">
                  0{i + 1}
                </div>

                {/* Icon circle */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl shadow-md mb-5">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.step}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;