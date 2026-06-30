// import React from "react";
// import {FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp} from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Logo & Working Hours */}
//           <div>
//             <a href="https://binarylogix.in" className="inline-block mb-4">
//               <img
//                 src="logo.png"
//                 alt="Binarylogix Logo"
//                 className="h-14 sm:h-16 rounded-2xl"
//               />
//             </a>
//             <p className="mb-4 text-sm sm:text-base">
//               Empowering your business with tailored, innovative solutions.
//             </p>
//             <div>
//               <h6 className="text-lg font-semibold mb-2">Working Hours:</h6>
//               <ul className="text-sm space-y-1">
//                 <li>Mon - Sat: 10:00 AM - 5:00 PM</li>
//                 <li>Sunday: Closed</li>
//               </ul>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm sm:text-base">
//               <li>
//                 <a
//                   href="https://binarylogix.in/about-us/"
//                   target="_blank"
//                   className="hover:underline"
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://binarylogix.in/team/"
//                   target="_blank"
//                   className="hover:underline"
//                 >
//                   Our Team
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://binarylogix.in/services-grid/"
//                   target="_blank"
//                   className="hover:underline"
//                 >
//                   Our Services
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://binarylogix.in/contact-us/"
//                   target="_blank"
//                   className="hover:underline"
//                 >
//                   Contact Us
//                 </a>
//               </li>
//               <li>
//                 <Link to="/AdminLogin" className="hover:text-[#F9F3EF] transition-colors">
//                   Admin
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Our Services */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4">Our Services</h4>
//             <ul className="space-y-2 text-sm sm:text-base">
//               <li>Web/App Development</li>
//               <li>Digital Marketing</li>
//               <li>Meta & Google Ads</li>
//               <li>UI/UX Design</li>
//             </ul>
//           </div>

//           {/* Gallery */}
//           <div className="">
//             <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
//             <div className="space-y-2 text-sm ">
//               <p><strong>Address:</strong> 110 d sagar high street Ayodhya bypass, Bhopal</p>
//               <p><strong>Phone:</strong> <a href="tel:+919926417905" className=" hover:underline">+91 96171 89757</a></p>
//               <p><strong>Email:</strong> <a href="mailto:info@binarylogix.in" className="hover:underline">binarylogixofficial@gmail.com</a></p>
//             </div>


//             <div className="mt-4 flex gap-4">
//               <a
//                 href="https://facebook.com/binarylogix"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className=" hover:text-blue-600 text-xl"
//               >
//                 <FaFacebookF />
//               </a>
//               <a
//                 href="https://instagram.com/binarylogix"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className=" hover:text-pink-500 text-xl"
//               >
//                 <FaInstagram />
//               </a>
//               <a
//                 href="https://linkedin.com/company/binarylogix"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className=" hover:text-blue-800 text-xl"
//               >
//                 <FaLinkedinIn />
//               </a>
//               <a
//                 href="https://wa.me/919926417905"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className=" hover:text-green-600 text-xl"
//               >
//                 <FaWhatsapp />
//               </a>
//             </div>

//           </div>

//         </div>

//         {/* Bottom Footer */}
//         <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
//           <div>© 2024 Binarylogix. All Rights Reserved.</div>

//           <div className="flex space-x-4 text-xl">
//             <a href="http://facebook.com" className="hover:text-blue-500" aria-label="Facebook">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="http://twitter.com" className="hover:text-sky-400" aria-label="Twitter">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="http://linkedin.com" className="hover:text-blue-600" aria-label="LinkedIn">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//             <a href="http://instagram.com" className="hover:text-pink-500" aria-label="Instagram">
//               <i className="fab fa-youtube"></i>
//             </a>
//           </div>

//           <div className="flex flex-wrap items-center space-x-4">
//             <a href="#" target="_blank" className="hover:underline">
//               Terms &amp; Conditions
//             </a>
//             <a href="#" target="_blank" className="hover:underline">
//               Privacy Policy
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



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
            <a href="https://binarylogix.in" className="inline-block mb-4">
              <img
                src="logo.png"
                alt="Binarylogix Logo"
                className="h-14 sm:h-16 rounded-2xl bg-white p-1 shadow-md"
              />
            </a>
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
                { label: "About Us", href: "https://binarylogix.in/about-us/" },
                { label: "Our Team", href: "https://binarylogix.in/team/" },
                { label: "Our Services", href: "https://binarylogix.in/services-grid/" },
                { label: "Contact Us", href: "https://binarylogix.in/contact-us/" },
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
                <span>110 D, Sagar High Street, Ayodhya Bypass, Bhopal M.P</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📞</span>
                <a
                  href="tel:+919617189757"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 96171 89757
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✉️</span>
                <a
                  href="mailto:binarylogixofficial@gmail.com"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  binarylogixofficial@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "https://facebook.com/binarylogix", color: "hover:text-blue-500" },
                { icon: <FaInstagram />, href: "https://instagram.com/binarylogix", color: "hover:text-pink-500" },
                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/binarylogix-technologies-llp/", color: "hover:text-blue-400" },
                { icon: <FaWhatsapp />, href: "https://wa.me/919617189757", color: "hover:text-green-500" },
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
          <p>© {currentYear} Binarylogix Technologies LLP. All rights reserved.</p>

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