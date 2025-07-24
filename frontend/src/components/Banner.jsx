"use client" // This component uses client-side hooks for animations

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
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800 text-white">
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
