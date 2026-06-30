import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Loader2,
  Sparkles,
} from "lucide-react";

const HomeContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      title: "Address",
      value: "110 D, Sagar High Street, Ayodhya Bypass, Bhopal M.P",
      icon: MapPin,
    },
    {
      title: "Phone",
      value: "+91 96171 89757",
      icon: Phone,
      link: "tel:+919617189757",
    },
    {
      title: "Email",
      value: "binarylogixofficial@gmail.com",
      icon: Mail,
      link: "mailto:binarylogixofficial@gmail.com",
    },
    {
      title: "Working Hours",
      value: "Mon - Sat: 10:30 AM – 6:30 PM",
      icon: Clock,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      link: "https://www.linkedin.com/company/binarylogix-technologies-llp/",
    },
    {
      icon: Twitter,
      label: "Twitter",
      link: "https://www.linkedin.com/company/binarylogix-technologies-llp/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/company/binarylogix-technologies-llp/",
    },
    {
      icon: Instagram,
      label: "Instagram",
      link: "https://www.linkedin.com/company/binarylogix-technologies-llp/",
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const { name, number, subject, message } = formData;

    if (!name || !number || !subject || !message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/addEnquiry", {
        name,
        number,
        subject,
        message,
      });

      setSubmitted(true);

      setFormData({
        name: "",
        number: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error sending enquiry:", err);
      alert("Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      {/* Background Glow */}
      <motion.div
        className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-blue-200/35 blur-3xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-indigo-200/25 blur-3xl"
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#378af9] ring-1 ring-blue-100">
            <Sparkles className="h-4 w-4" />
            Get in Touch
          </span>

          <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Let’s Build Something{" "}
            <span className="text-[#378af9]">Amazing Together</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Have a project in mind? Share your idea with us and our team will
            help you turn it into a smart digital solution.
          </p>

          <motion.div
            className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-[#378af9]"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Main Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
        >
          {/* Left Contact Info */}
          <motion.div
            variants={itemVariants}
            className="rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-950">
                Contact Information
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Reach out to Binarylogix Technologies LLP for websites, apps,
                SEO, marketing, branding, and custom digital solutions.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 6 }}
                    className="group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#378af9] transition-all duration-300 group-hover:bg-[#378af9] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        {item.title}
                      </h4>

                      {item.link ? (
                        <a
                          href={item.link}
                          className="mt-1 block text-sm font-semibold leading-6 text-slate-800 transition-colors hover:text-[#378af9]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Icons */}
            <div className="mt-8 border-t border-blue-100 pt-6">
              <p className="mb-4 text-sm font-bold text-slate-700">
                Follow us on
              </p>

              <div className="flex gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.link}
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#378af9] hover:text-white hover:shadow-lg"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden rounded-[30px] border border-slate-100 bg-white p-6 shadow-2xl shadow-blue-100/50 md:p-8">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />

              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-black text-slate-950">
                  Send a Message
                </h3>

                <p className="mb-6 text-sm leading-7 text-slate-600">
                  Fill out the form and we will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-bold text-slate-700"
                      >
                        Your Name
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-[#378af9] focus:ring-4 focus:ring-[#378af9]/10"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="number"
                        className="mb-1.5 block text-sm font-bold text-slate-700"
                      >
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                        maxLength="10"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-[#378af9] focus:ring-4 focus:ring-[#378af9]/10"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-bold text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-[#378af9] focus:ring-4 focus:ring-[#378af9]/10"
                      placeholder="Website Development"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-bold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-[#378af9] focus:ring-4 focus:ring-[#378af9]/10"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        Message Sent!
                        <Send className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {submitted && (
                    <p className="text-center text-sm font-semibold text-green-600">
                      Thank you! We'll get back to you soon.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeContact;