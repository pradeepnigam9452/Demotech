// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import EnquiryModal from "./EnquiryModal";
// import logo from "../assets/logo.png"

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const navLinkStyle =
//     "relative  hover:text-blue-500 transition duration-300 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-full before:scale-x-0  before:bg-blue-500 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100";

//   return (
//     <>
//       <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50" style={{ fontFamily: "Roboto" }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div className="flex-shrink-0 px-2 bg-white rounded-xl py-1">
//               <NavLink to="https://binarylogix.in">
//                 <img className="w-32 md:w-40" src={logo} alt="Binarylogix Logo" />
//               </NavLink>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-8 items-center">
//               <NavLink to="/" className={navLinkStyle}>Home</NavLink>
//               <NavLink to="/aboutUs" className={navLinkStyle}>About Us</NavLink>
//               <NavLink to="/services" className={navLinkStyle}>Services</NavLink>
//               <NavLink to="/gallery" className={navLinkStyle}>Design</NavLink>
//               <NavLink to="/projects" className={navLinkStyle}>Projects</NavLink>
//               <button
//                 onClick={toggleModal}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition duration-300"
//               >
//                 Enquiry
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button onClick={toggleMobileMenu} className="focus:outline-none">
//                 {mobileMenuOpen ? (
//                   <svg className="h-6 w-6 text-[#5a9efa]" xmlns="http://www.w3.org/2000/svg" fill="none"
//                     viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg className="h-6 w-6 text-[#5a9efa]" xmlns="http://www.w3.org/2000/svg" fill="none"
//                     viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu - Slide Down */}
//         <div
//           className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-md text-[#016386] transition-transform duration-600 ease-in-out z-40 ${mobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible"
//             }`}
//         >
//           <div className="flex flex-col px-4 pt-2 pb-4">
//             <NavLink to="/" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
//               Home
//             </NavLink>
//             <NavLink to="/aboutUs" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
//               About Us
//             </NavLink>
//             <NavLink to="/services" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
//               Services
//             </NavLink>
//              <NavLink to="/gallery" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
//               Design
//             </NavLink>
//             <NavLink to="/projects" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
//               Projects
//             </NavLink>
//             <button
//               onClick={toggleModal}
//               className="w-full text-left px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-black transition"
//             >
//               Enquiry
//             </button>
//           </div>
//         </div>

//       </nav>

//       {/* Enquiry Modal */}
//       <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />
//     </>
//   );
// };

// export default Navbar;


// // import { useState, useEffect } from "react";
// // import { NavLink } from "react-router-dom";
// // import EnquiryModal from "./EnquiryModal";
// // import logo from "../assets/logo.png";

// // const Navbar = () => {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   // Detect scroll for shadow/background change
// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
// //   const closeMobileMenu = () => setMobileMenuOpen(false);
// //   const toggleModal = () => setIsModalOpen(!isModalOpen);

// //   // Base link style with underline animation and active state
// //   const navLinkStyle = ({ isActive }) =>
// //     `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
// //       isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
// //     } before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-full before:scale-x-0 before:bg-blue-600 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
// //       isActive ? "before:scale-x-100" : ""
// //     }`;

// //   // Mobile link class
// //   const mobileLinkStyle = ({ isActive }) =>
// //     `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
// //       isActive
// //         ? "bg-blue-50 text-blue-600"
// //         : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
// //     }`;

// //   return (
// //     <>
// //       <nav
// //         className={`sticky top-0 z-50 transition-all duration-300 ${
// //           scrolled
// //             ? "bg-white/95 backdrop-blur-md shadow-lg"
// //             : "bg-white/80 backdrop-blur-sm shadow-sm"
// //         }`}
// //         style={{ fontFamily: "Roboto, sans-serif" }}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-20">
// //             {/* Logo */}
// //             <a href="https://binarylogix.in" className="flex-shrink-0">
// //               <img
// //                 className="w-32 md:w-40 h-auto rounded-xl"
// //                 src={logo}
// //                 alt="Binarylogix Logo"
// //               />
// //             </a>

// //             {/* Desktop Menu */}
// //             <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
// //               <NavLink to="/" className={navLinkStyle} end>
// //                 Home
// //               </NavLink>
// //               <NavLink to="/aboutUs" className={navLinkStyle}>
// //                 About Us
// //               </NavLink>
// //               <NavLink to="/services" className={navLinkStyle}>
// //                 Services
// //               </NavLink>
// //               <NavLink to="/gallery" className={navLinkStyle}>
// //                 Design
// //               </NavLink>
// //               <NavLink to="/projects" className={navLinkStyle}>
// //                 Projects
// //               </NavLink>
// //               <button
// //                 onClick={toggleModal}
// //                 className="ml-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //               >
// //                 Enquiry
// //               </button>
// //             </div>

// //             {/* Mobile Menu Toggle */}
// //             <div className="md:hidden">
// //               <button
// //                 onClick={toggleMobileMenu}
// //                 className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 aria-label="Toggle menu"
// //               >
// //                 {mobileMenuOpen ? (
// //                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                   </svg>
// //                 ) : (
// //                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                   </svg>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mobile Menu with backdrop */}
// //         <div
// //           className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
// //             mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// //           }`}
// //         >
// //           {/* Backdrop */}
// //           <div
// //             className="absolute inset-0 bg-black/30 backdrop-blur-sm"
// //             onClick={closeMobileMenu}
// //           />
// //           {/* Menu panel */}
// //           <div
// //             className={`absolute top-20 left-0 right-0 bg-white shadow-2xl rounded-b-2xl transition-transform duration-300 ${
// //               mobileMenuOpen ? "translate-y-0" : "-translate-y-8"
// //             }`}
// //           >
// //             <div className="px-4 pt-2 pb-6 space-y-1">
// //               <NavLink to="/" onClick={closeMobileMenu} className={mobileLinkStyle} end>
// //                 Home
// //               </NavLink>
// //               <NavLink to="/aboutUs" onClick={closeMobileMenu} className={mobileLinkStyle}>
// //                 About Us
// //               </NavLink>
// //               <NavLink to="/services" onClick={closeMobileMenu} className={mobileLinkStyle}>
// //                 Services
// //               </NavLink>
// //               <NavLink to="/gallery" onClick={closeMobileMenu} className={mobileLinkStyle}>
// //                 Design
// //               </NavLink>
// //               <NavLink to="/projects" onClick={closeMobileMenu} className={mobileLinkStyle}>
// //                 Projects
// //               </NavLink>
// //               <button
// //                 onClick={() => {
// //                   closeMobileMenu();
// //                   toggleModal();
// //                 }}
// //                 className="w-full text-left mt-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
// //               >
// //                 Enquiry
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Enquiry Modal */}
// //       <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />
// //     </>
// //   );
// // };

// // export default Navbar;

// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import EnquiryModal from './EnquiryModal';
import logo from '../assets/logo.png';

const Navbar = () => {
  // --- Mobile menu & scroll state ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Enquiry Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  // --- Navigation links (your original routes) ---
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/aboutUs' },
    { name: 'Services', to: '/services' },
    { name: 'Design', to: '/gallery' },
    { name: 'Projects', to: '/projects' },
  ];

  // --- NavLink active styling with underline animation ---
  // const linkStyle = ({ isActive }) =>
  //   `relative text-sm font-semibold tracking-wide transition-colors duration-300 interactive-item ${
  //     isActive
  //       ? 'text-white-800'
  //       : 'text-slate-700 hover:text-blue-600'
  //   } before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:rounded-full before:bg-blue-600 before:transition-transform before:duration-300 hover:before:scale-x-100 ${
  //     isActive ? 'before:scale-x-100' : ''
  //   }`;

  const linkStyle = ({ isActive }) =>
  `relative text-sm font-semibold tracking-wide transition-colors duration-300 interactive-item ${
    isActive
      ? 'text-black-600'
      : 'text-slate-700 hover:text-purple-600'
  } before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:rounded-full before:bg-purple-600 before:transition-transform before:duration-300 hover:before:scale-x-100 ${
    isActive ? 'before:scale-x-100' : ''
  }`;

  // --- Mobile link style ---
  const mobileLinkStyle = ({ isActive }) =>
    `block text-lg font-bold py-2 pl-3 ${
      isActive
        ? 'text-blue-600 border-l-4 border-blue-600'
        : 'text-slate-700'
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-white/70 backdrop-blur-md shadow-glass-light border-b border-slate-200/20'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* --- Logo --- */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              className="w-32 md:w-40 h-auto rounded-xl"
              src={logo}
              alt="Binarylogix Logo"
            />
          </NavLink>

          {/* --- Desktop Navigation --- */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.to} className={linkStyle} end>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* --- Desktop Right Controls (Enquiry only) --- */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleModal}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-premium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 interactive-item"
            >
              Enquiry
            </button>
          </div>

          {/* --- Mobile Actions (Hamburger only) --- */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full border border-slate-200 bg-white/40 text-slate-700"
              aria-label="Open menu"
            >
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Drawer Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full z-50 bg-white shadow-2xl border-l border-slate-200/20 p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-black tracking-wider text-slate-900">
                    Binarylogix
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full border border-slate-200 text-slate-700"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLinkStyle}
                      end
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-slate-200/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleModal();
                  }}
                  className="w-full py-3 rounded-full border border-slate-200 text-center font-bold text-slate-700"
                >
                  Enquiry
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleModal();
                  }}
                  className="w-full py-3 rounded-full text-center font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Enquiry Modal --- */}
      <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navbar;