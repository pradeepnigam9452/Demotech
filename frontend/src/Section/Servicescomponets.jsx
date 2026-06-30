import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Megaphone,
  Search,
  Share2,
  Palette,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const Servicescomponets = () => {
  const services = [
    {
      title: "Web/App Development",
      desc: "We build responsive websites and scalable web applications that help your business grow online.",
      icon: Code2,
      points: ["Responsive UI", "Fast Performance", "Modern Tech Stack"],
    },
    {
      title: "Mobile App Development",
      desc: "We create smooth, user-friendly mobile applications for Android and iOS platforms.",
      icon: Smartphone,
      points: ["Clean UI/UX", "Cross Platform", "Scalable Apps"],
    },
    {
      title: "Digital Marketing",
      desc: "We help brands reach the right audience through smart and result-focused digital strategies.",
      icon: Megaphone,
      points: ["Brand Awareness", "Lead Generation", "Growth Strategy"],
    },
    {
      title: "Search Engine Optimization",
      desc: "We optimize your website to improve visibility, ranking, and organic traffic from search engines.",
      icon: Search,
      points: ["Keyword Research", "On-page SEO", "Traffic Growth"],
    },
    {
      title: "Social Media Optimization",
      desc: "We improve your social media presence with creative content and audience-focused strategies.",
      icon: Share2,
      points: ["Profile Growth", "Content Planning", "Audience Reach"],
    },
    {
      title: "Graphic Designing & Video Editing",
      desc: "We design attractive visuals and engaging videos that make your brand look professional.",
      icon: Palette,
      points: ["Creative Designs", "Brand Identity", "Video Editing"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      {/* Background Glow */}
      <motion.div
        className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-blue-200/40 blur-3xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      {/* Floating Dots */}
      <motion.div
        className="absolute left-[8%] top-[25%] h-4 w-4 rounded-full bg-blue-400/40"
        animate={{ y: [0, -22, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[12%] top-[30%] h-5 w-5 rounded-full bg-indigo-400/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#378af9] ring-1 ring-blue-100">
            <Sparkles className="h-4 w-4" />
            Our Services
          </span>

          <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Services We Provide for{" "}
            <span className="text-[#378af9]">Business Growth</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Binarylogix Technologies LLP provides smart digital solutions to
            help businesses build strong online presence, attract customers, and
            grow faster.
          </p>

          <motion.div
            className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-[#378af9]"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Services Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full overflow-hidden rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/70"
              >
                {/* Number */}
                <div className="absolute right-5 top-4 text-6xl font-black leading-none text-blue-50 transition-all duration-300 group-hover:text-blue-100">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#378af9] ring-8 ring-blue-50/60 transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#378af9] group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-3 text-xl font-black text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mb-5 text-sm leading-7 text-slate-600">
                    {service.desc}
                  </p>

                  <div className="space-y-3">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#378af9]" />
                        {point}
                      </div>
                    ))}
                  </div>

                  <a
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2.5 text-sm font-bold text-[#378af9] transition-all duration-300 group-hover:bg-[#378af9] group-hover:text-white"
                  >
                    Get Service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Hover Glow */}
                <div className="absolute -bottom-16 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-blue-200/50 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[30px] border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-center shadow-sm md:p-8"
        >
          <h3 className="text-2xl font-black text-slate-950">
            Want to build something amazing?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Let’s discuss your idea and create a powerful digital solution for
            your business.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#378af9] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Servicescomponets;