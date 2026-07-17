


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
  ExternalLink,
  Loader2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from '../assets/logo.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />

      <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24">
        {/* Animated background blobs */}
        <motion.div
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-5 blur-3xl"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center lg:mb-18"
          >
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
              Get in Touch
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Contact <span className="text-[#378af9]">Us</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Have a project in mind? We'd love to hear from you. Reach out and
              let's make something amazing together.
            </p>

            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#378af9]" />
          </motion.div>

          {/* Two-column layout */}
          <motion.div
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Left Column – Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Address */}
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-[#378af9]">
                  <MapPin className="h-5 w-5 text-[#378af9] transition-colors group-hover:text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Address
                  </h3>

                  <p className="text-base text-gray-800">
                     <br />
                    Bhopal M.P
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-[#378af9]">
                  <Phone className="h-5 w-5 text-[#378af9] transition-colors group-hover:text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </h3>

                  <a
                    href="#"
                    className="text-base text-gray-800 transition-colors hover:text-[#378af9]"
                  >
                    +91 830572XXXX
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-[#378af9]">
                  <Mail className="h-5 w-5 text-[#378af9] transition-colors group-hover:text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </h3>

                  <a
                    href="mailt@gmail.com"
                    className="text-base text-gray-800 transition-colors hover:text-[#378af9]"
                  >
                    demo@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-[#378af9]">
                  <Clock className="h-5 w-5 text-[#378af9] transition-colors group-hover:text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Working Hours
                  </h3>

                  <p className="text-base text-gray-800">
                    Mon - Sat: 10:30 AM – 6:30 PM
                  </p>
                </div>
              </div>

              {/* Brand */}
<div className="border-t border-gray-200 pt-4">
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
      <img
        src={logo}
        alt="demo logo"
        className="h-12 w-12 object-contain"
      />
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-800">
        © Demotech Technology LLP
      </p>

      <p className="text-xs text-gray-500">
        Empowering your business with tailored, innovative solutions.
      </p>
    </div>
  </div>
</div>

              {/* Social Icons */}
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#378af9] hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#378af9] hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                </a>

                <a
href="#"                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#378af9] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

               
              </div>
            </motion.div>

            {/* Right Column – Contact Form + Map */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Number */}
                  <div>
                    <label
                      htmlFor="number"
                      className="mb-1 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                      placeholder="98582565"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                      placeholder="Website Development"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {submitted && (
                    <p className="text-center text-sm text-green-600">
                      Thank you! We'll get back to you soon.
                    </p>
                  )}
                </form>
              </div>

              {/* Map */}
             
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;


