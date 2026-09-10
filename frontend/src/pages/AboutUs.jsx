
import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientsSlider from "../components/ClientsSlider";
import WorkingProcess from "../Section/WorkingProcess";
import WhyChooseUs from "../Section/WhyChooseUs";
import aboutmain from '../assets/aboutmain.jpg'
import seo from '../assets/seo.png'
const services = [
  "Web/App Development",
  "Digital Marketing",
  "Social Media Optimization (SMO)",
  "Search Engine Optimization (SEO)",
  "Meta/Google Ads",
  "Graphic Designing & Video Editing",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <>
      <Navbar />
{/* Page Heading */}
<section className="relative overflow-hidden bg-white px-4 pt-1 pb-3 md:pt-20 md:pb-3 mt-1">
  {/* Background glow */}
  <motion.div
    className="absolute -top-32 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl"
    animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10 mx-auto max-w-4xl text-center"
  >
    <motion.span
      variants={itemVariants}
      className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#3C83F6] ring-1 ring-blue-100"
    >
      <Sparkles className="h-4 w-4" />
      About Us
    </motion.span>

    <motion.p
      variants={itemVariants}
      className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg"
    >
      We help startups and businesses grow with powerful websites, mobile apps,
      digital marketing, SEO, branding, and scalable software solutions.
    </motion.p>

    <motion.div
      variants={itemVariants}
      className="mx-auto mt-3 h-1.5 w-24 rounded-full bg-[#3C83F6]"
    />
  </motion.div>
</section>


      {/* About Main Section */}
      <section className="relative overflow-hidden bg-white px-1 py-16 md:px-5 lg:px-5 lg:py-24">
        {/* Background glow */}
        <div className="absolute -top-10 right-0 h-60 w-80 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-80 rounded-full bg-indigo-50 blur-3xl" />

<div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">          {/* Left Image Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-xl"
          >
          


<div className="relative overflow-hidden rounded-tl-[55px] rounded-br-[55px] shadow-2xl md:rounded-tl-[70px] md:rounded-br-[70px]">
  <img
    src={aboutmain}
    alt="demotech team meeting"
    className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[360px] md:h-[430px] lg:h-[480px]"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
</div>
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
              className="absolute -left-3 bottom-16 hidden overflow-hidden rounded-2xl bg-blue-600 shadow-2xl sm:block"
            >
              <div className="flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-xl bg-blue-600 p-2 text-center text-white shadow-md">
  <h3 className="text-[10px] font-bold leading-tight">
    5+ Years Experience
  </h3>

  <Award className="h-6 w-6 text-white" />
</div>

            </motion.div>

            {/* Small Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 right-0 hidden rounded-2xl border-[12px] border-white bg-white shadow-2xl md:block"
            >
              <img
              src={seo}
alt="demotech office work"
                className="h-60 w-80 rounded-xl object-cover"
              />
            </motion.div>
          </motion.div>
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.7, ease: "easeOut" }}
  viewport={{ once: true }}
  className="space-y-1"
>
  <div className="lg:pl-10 xl:pl-16">
    <h2 className="max-w-2xl text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px]">
      Demotech Technologies  —{" "}
      <span className="text-[#3C83F6]">
        Smart Solutions for a Smarter Business
      </span>
    </h2>

    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
      At demotech Technologies LLP, we specialize in delivering intelligent
      digital solutions that help businesses grow online, reach the right
      audience, and improve overall performance. Whether you're a startup or an
      established brand, our mission is to turn your ideas into scalable digital
      success.
    </p>
  </div>

  {/* Services */}
  <div className="grid gap-5 sm:grid-cols-2 lg:pl-10 xl:pl-16">
    {services.map((service, index) => (
      <motion.div
        key={service}
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        viewport={{ once: true }}
        className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
        <span>{service}</span>
      </motion.div>
    ))}
  </div>

  {/* CTA Buttons */}
  <div className="flex flex-wrap items-center gap-4 pt-4 lg:pl-10 xl:pl-16">
    <a
      href="/services"
      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
    >
      Explore Services
      <ArrowRight className="h-5 w-5" />
    </a>

    <a
      href="/contact"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-8 py-4 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600"
    >
      <Sparkles className="h-5 w-5" />
      Get Free Consultation
    </a>
  </div>
</motion.div>
        </div>
      </section>

      {/* Clients Slider */}
      <ClientsSlider />

      {/* Working Process */}
      <WorkingProcess />

      {/* Why Choose Us */}
      <WhyChooseUs />

     

      <Footer />
    </>
  );
};

export default AboutUs;

