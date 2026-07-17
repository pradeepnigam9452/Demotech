
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500" />

      {/* Background texture / blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo, About, Working Hours */}
          <div>
            
            <p className="mb-6 text-sm text-gray-400 leading-relaxed">
              Empowering your business with tailored, innovative solutions.
            </p>
            <div>
              <h6 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Working Hours
              </h6>
              <ul className="text-sm space-y-1.5 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                  Mon - Sat: 10:30 AM - 6:30 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
                  Sunday: Closed
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", href: "#" },
                { label: "Our Team", href: "#" },
                { label: "Our Services", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                      ›
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
              
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                "Web/App Development",
                "Digital Marketing",
                "Meta & Google Ads",
                "UI/UX Design",
                "SEO & SMO",
                ,
              ].map((service) => (
                <li
                  key={service}
                  className="hover:text-blue-400 transition-colors cursor-default"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">📍</span>
                <span> Bhopal M.P</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📞</span>
                <a
                  href="tel:+919617189757"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 96171 xxxx
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✉️</span>
                <a
                  href="mailto:demoteck@gmail.com"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  demoteck@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#", color: "hover:text-blue-500" },
                { icon: <FaInstagram />, href: "#", color: "hover:text-pink-500" },
                { icon: <FaLinkedinIn />, href: "#", color: "hover:text-blue-400" },
                { icon: <FaWhatsapp />, href: "#", color: "hover:text-green-500" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700 hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {currentYear} Demoteck Technologies . All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;