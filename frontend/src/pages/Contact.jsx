import React, { useState } from "react";
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
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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

      <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-10"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 lg:mb-18"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Contact <span className="text-[#378af9]">Us</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Have a project in mind? We'd love to hear from you. Reach out and
              let's make something amazing together.
            </p>
            <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
          </motion.div>

          {/* Two-column layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Left Column – Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#378af9] transition-colors">
                  <MapPin className="w-5 h-5 text-[#378af9] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Address
                  </h3>
                  <p className="text-gray-800 text-base">
                    110 D, Sagar High Street, <br />
                    Ayodhya Bypass, Bhopal M.P
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#378af9] transition-colors">
                  <Phone className="w-5 h-5 text-[#378af9] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+919617189757"
                    className="text-gray-800 text-base hover:text-[#378af9] transition-colors"
                  >
                    +91 96171 89757
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#378af9] transition-colors">
                  <Mail className="w-5 h-5 text-[#378af9] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:binarylogixofficial@gmail.com"
                    className="text-gray-800 text-base hover:text-[#378af9] transition-colors"
                  >
                    binarylogixofficial@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#378af9] transition-colors">
                  <Clock className="w-5 h-5 text-[#378af9] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Working Hours
                  </h3>
                  <p className="text-gray-800 text-base">
                    Mon - Sat: 10:30 AM – 6:30 PM
                  </p>
                </div>
              </div>

              {/* Brand / Logo tagline */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#378af9] flex items-center justify-center text-white font-bold text-sm">
                    B
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      © Binarylogix
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
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#378af9] hover:text-white transition-colors text-gray-600"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#378af9] hover:text-white transition-colors text-gray-600"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#378af9] hover:text-white transition-colors text-gray-600"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#378af9] hover:text-white transition-colors text-gray-600"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Column – Contact Form + Map */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 outline-none transition-colors text-gray-800"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 outline-none transition-colors text-gray-800"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 outline-none transition-colors text-gray-800 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#378af9] text-white px-6 py-3 rounded-full font-semibold shadow-md shadow-blue-200/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2"
                  >
                    {submitted ? "Message Sent!" : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                  {submitted && (
                    <p className="text-sm text-green-600 text-center">
                      Thank you! We'll get back to you soon.
                    </p>
                  )}
                </form>
              </div>

              {/* ===== MAP with Hover Overlay ===== */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 relative group">
                <div className="aspect-[4/3] md:aspect-[16/10] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.9869529101243!2d77.45054617509996!3d23.27992377899418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c69ecaa2fdee7%3A0x2fdc0f4d86740b35!2s110%2C%20Sagar%20High%20St%2C%20K-Sector%2C%20Ayodhya%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462041!5e0!3m2!1sen!2sin!4v1782736472972!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Binarylogix Location"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay with "View on Google Maps" link – appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <a
                    href="https://www.google.com/maps/place/110,+Sagar+High+St,+K-Sector,+Ayodhya+Nagar,+Bhopal,+Madhya+Pradesh+462041/@23.2799238,77.4505462,17z/data=!3m1!4b1!4m6!3m5!1s0x397c69ecaa2fdee7:0x2fdc0f4d86740b35!8m2!3d23.2799238!4d77.4531211!16s%2Fg%2F11f09j4bff?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-[#378af9] hover:text-white transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;