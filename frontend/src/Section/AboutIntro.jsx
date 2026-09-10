import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Code2,
  Smartphone,
  Megaphone,
  Target,
  UsersRound,
  BadgeCheck,
} from "lucide-react";

import EnquiryModal from "../components/EnquiryModal";
import aboutintro from '../assets/aboutintro.png'
const AboutIntro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "Website Development",
    "Mobile App Development",
    "Software Development",
    "Digital Marketing",
  ];

  const serviceCards = [
    {
      title: "Web Solutions",
      icon: Code2,
    },
    {
      title: "App Development",
      icon: Smartphone,
    },
    {
      title: "Digital Growth",
      icon: Megaphone,
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Projects",
      icon: Target,
    },
    {
      value: "50+",
      label: "Clients",
      icon: UsersRound,
    },
    {
      value: "5+",
      label: "Experience",
      icon: BadgeCheck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.85, ease: "easeOut" },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      {/* Background Glow */}
      <motion.div
        className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-blue-200/40 blur-3xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moving Small Dots */}
      <motion.div
        className="absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-blue-400/40"
        animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[22%] left-[45%] h-3 w-3 rounded-full bg-indigo-400/40"
        animate={{ y: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[10%] top-[25%] h-5 w-5 rounded-full bg-blue-300/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-7">
            <motion.div variants={itemVariants}>
              <motion.span
                whileHover={{ scale: 1.04 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#378af9] ring-1 ring-blue-100"
              >
                <Sparkles className="h-4 w-4" />
                About Company
              </motion.span>

              <h2 className="max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                About{" "}
                <span className="relative inline-block text-[#378af9]">
                  
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-[#378af9]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>

              <motion.div
                className="mt-6 h-1.5 w-20 rounded-full bg-[#378af9]"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base"
            >
              <p>
                With over a year of industry experience,{" "}
                <strong className="font-bold text-[#378af9]">
                  demotech Technologies LLP
                </strong>{" "}
                specializes in delivering innovative and result-driven solutions
                in website development, mobile application development, software
                development, and digital marketing.
              </p>

              <p>
                We help businesses grow by using technology that improves their
                digital presence, streamlines processes, and creates real
                business impact. 
              </p>

              <p>
                Our team focuses on quality, creativity, and performance to turn
                your ideas into scalable, user-friendly digital products that
                stand out in today’s competitive market.
              </p>
            </motion.div>

            {/* Features */}
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:shadow-xl"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-all duration-300 group-hover:bg-[#378af9]">
                    <CheckCircle2 className="h-5 w-5 text-[#378af9] transition-all duration-300 group-hover:text-white" />
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid gap-4 sm:grid-cols-3"
            >
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#378af9]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-950">
                      {item.value}
                    </h3>

                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="rounded-2xl border-l-4 border-[#378af9] bg-blue-50 px-5 py-4 text-sm font-semibold leading-7 text-slate-700"
            >
              Let demotech be your trusted partner in digital transformation.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#378af9] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-full max-w-md lg:max-w-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Floating Card Top */}
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={floatingAnimation}
                transition={{
                  opacity: { duration: 0.6, delay: 0.25 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                viewport={{ once: true }}
                className="absolute -left-3 -top-5 z-20 hidden rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-2xl sm:block"
              >
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Trusted Partner
                </p>

                <h3 className="mt-1 text-lg font-black text-slate-950">
                  Digital Solutions
                </h3>
              </motion.div>

              {/* Floating Side Card */}
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.45 },
                  x: { duration: 0.6, delay: 0.45 },
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                viewport={{ once: true }}
                className="absolute -right-4 top-24 z-20 hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-2xl lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#378af9]">
                    <Sparkles className="h-5 w-5" />
                  </div>

                 
                </div>
              </motion.div>

              {/* Image Glow */}
              <motion.div
                className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-100 to-indigo-100 blur-xl"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.03, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02, rotate: 0.4 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[32px] border border-white bg-white p-3 shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                  src={aboutintro}
alt="About demotech"
                    className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-110 sm:h-[440px] lg:h-[520px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                  {/* Bottom Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md"
                  >
                    <p className="text-sm font-semibold text-blue-100">
                      Smart ideas into scalable products
                    </p>

                    <h3 className="mt-2 text-xl font-black">
                      Build. Launch. Grow.
                    </h3>
                  </motion.div>
                </div>
              </motion.div>

              {/* Service Mini Cards */}
              {/* <div className="absolute -bottom-8 left-1/2 z-20 hidden w-[92%] -translate-x-1/2 grid-cols-3 gap-3 md:grid">
                {serviceCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.55 + index * 0.12,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.04 }}
                      className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-xl"
                    >
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#378af9]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <p className="text-xs font-black text-slate-800">
                        {item.title}
                      </p>
                    </motion.div>
                  );
                })}
              </div> */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AboutIntro;