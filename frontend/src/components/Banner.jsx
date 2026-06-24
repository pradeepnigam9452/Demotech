  // "use client" // This component uses client-side hooks for animations

  import { motion } from "framer-motion" // Import motion for animations

  export default function HeroSection() {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2, // Delay between child animations
        },
      },
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }

    return (
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        {/* Animated background blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#378bf988] rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 0.95, 1],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto w-full relative z-10 px-4 md:px-6">
          <motion.div
            className="flex flex-col justify-center items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col justify-center space-y-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl leading-tight">
                  Innovate. Create. Elevate.
                  <br />
                  Your Vision, Our Expertise.
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl text-gray-300 mx-auto">
                  We are a leading digital agency specializing in crafting bespoke web solutions, stunning designs, and
                  powerful digital strategies that drive growth and engagement.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 min-[400px]:flex-row justify-center"
              >
                <a href="/services" >
                  <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#378af9] px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#378af9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
                    Our Services
                  </button>
                </a>
                <a href="#contact" passHref>
                  <button
                    variant="outline"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-500 bg-transparent px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-700 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  >
                    Get a Quote
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>

        </div>

      </section>
    )
  }


// import { motion } from "framer-motion";

// export default function HeroSection() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.18 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 18 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <section
//       aria-labelledby="hero-heading"
//       className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-16 text-white md:py-24 lg:py-42"
//     >
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_25%)]" />
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

//         <motion.div
//           aria-hidden="true"
//           className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-3xl opacity-40"
//           animate={{ scale: [1, 1.08, 1], rotate: [0, 10, 0] }}
//           transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           aria-hidden="true"
//           className="absolute right-[8%] top-[14%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl opacity-30"
//           animate={{ scale: [1, 0.96, 1], rotate: [0, -12, 0] }}
//           transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       <div className="container mx-auto relative z-10 px-4 md:px-6">
//         <motion.div
//           className="mx-auto flex max-w-5xl flex-col items-center text-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div variants={itemVariants} className="space-y-4">
//             <h1
//               id="hero-heading"
//               className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
//             >
//               Innovate. Create. Elevate.
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//                 Your Vision, Our Expertise.
//               </span>
//             </h1>

//             <p className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
//               We design and build modern websites, premium UI experiences, and
//               high-converting digital solutions that help brands grow faster.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="mt-10 flex flex-col gap-4 sm:flex-row"
//           >
//             <a
//               href="/services"
//               className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
//             >
//               Our Services
//             </a>

//             <a
//               href="#contact"
//               className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
//             >
//               Get a Quote
//             </a>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }