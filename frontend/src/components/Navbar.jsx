
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
    {name : 'Contact', to: '/contact'},
    {name : 'Careers', to: '/careers'},
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
           <NavLink to="https://demotech.in/" className="flex-shrink-0">
            <img
              className="w-32 md:w-40 h-auto rounded-xl"
              src={logo}
              alt="demotech Logo"
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