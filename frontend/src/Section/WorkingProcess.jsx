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
//     <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
//             Our Process
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
//             How We Work
//           </h2>
//           <div className="mt-5 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
//         </div>

//         {/* Three‑column grid with connecting line */}
//         <div className="relative">
//           {/* Connecting line + arrows (visible on md+ screens) */}
//           <div className="hidden md:block absolute left-0 right-0 top-14 z-0">
//             <div className="relative h-0.5 bg-blue-200 mx-16">
//               {/* Left arrow */}
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-3 h-3 border-t-2 border-r-2 border-blue-300 rotate-45" />
//               {/* Right arrow */}
//               <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-3 h-3 border-t-2 border-r-2 border-blue-300 rotate-45" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
//             {steps.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Large step number */}
//                 <div className="text-5xl font-extrabold text-blue-100 mb-4">
//                   0{i + 1}
//                 </div>

//                 {/* Icon circle */}
//                 <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl shadow-md mb-5">
//                   {item.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {item.step}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkingProcess;





import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Palette, Rocket, ArrowRight } from "lucide-react";

const WorkingProcess = () => {
  const steps = [
    {
      step: "Define Requirements",
      desc: "We understand your business needs, collect ideas, and create a clear roadmap for the best digital solution.",
      icon: ClipboardList,
    },
    {
      step: "Design & Prototype",
      desc: "We design clean, user-friendly interfaces and prepare prototypes that match your brand and business goals.",
      icon: Palette,
    },
    {
      step: "Final Solution",
      desc: "We develop, test, deploy, and deliver a complete solution with performance, quality, and support.",
      icon: Rocket,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex rounded-full bg-blue-50 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 ring-1 ring-blue-100">
            Our Process
          </span>

          <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            How We{" "}
            <span className="text-[#3C83F6]">
              Work
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From idea to launch, we follow a simple and effective process to
            build solutions that help your business grow.
          </p>

          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-[#3C83F6]" />
        </motion.div>

        {/* Process Cards */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="absolute left-0 right-0 top-[82px] hidden lg:block">
            <div className="mx-auto h-1 max-w-4xl rounded-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-[28px] border border-slate-100 bg-white p-7 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/70">
                    {/* Top Number */}
                    <div className="absolute right-5 top-4 text-6xl font-black leading-none text-blue-50 transition-all duration-300 group-hover:text-blue-100">
                      0{index + 1}
                    </div>

                    {/* Icon Circle */}
                    <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 ring-8 ring-blue-50/60 transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#3C83F6] group-hover:text-white">
                      <Icon className="h-9 w-9" />
                    </div>

                    {/* Step Badge */}
                    <div className="relative z-10 mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500">
                      Step {index + 1}
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 mb-4 text-xl font-black text-slate-950">
                      {item.step}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-sm leading-7 text-slate-600">
                      {item.desc}
                    </p>

                    {/* Bottom Arrow */}
                    <div className="relative z-10 mt-6 flex justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-[#3C83F6] group-hover:text-white">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;