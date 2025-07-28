import { useState } from "react";
import { NavLink } from "react-router-dom";
import EnquiryModal from "./EnquiryModal";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const navLinkStyle =
    "relative  hover:text-blue-500 transition duration-300 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-full before:scale-x-0  before:bg-blue-500 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100";

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50" style={{ fontFamily: "Roboto" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 px-2 bg-white rounded-xl py-1">
              <NavLink to="https://binarylogix.in">
                <img className="w-32 md:w-40" src={logo} alt="Binarylogix Logo" />
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/aboutUs" className={navLinkStyle}>About Us</NavLink>
              <NavLink to="/services" className={navLinkStyle}>Services</NavLink>
              <NavLink to="/gallery" className={navLinkStyle}>Gallery</NavLink>
              <NavLink to="/projects" className={navLinkStyle}>Projects</NavLink>
              <button
                onClick={toggleModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition duration-300"
              >
                Enquiry
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6 text-[#5a9efa]" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-[#5a9efa]" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div
          className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-md text-[#016386] transition-transform duration-600 ease-in-out z-40 ${mobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible"
            }`}
        >
          <div className="flex flex-col px-4 pt-2 pb-4">
            <NavLink to="/" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
              Home
            </NavLink>
            <NavLink to="/aboutUs" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
              About Us
            </NavLink>
            <NavLink to="/services" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
              Services
            </NavLink>
            <NavLink to="/projects" className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100 rounded">
              Projects
            </NavLink>
            <button
              onClick={toggleModal}
              className="w-full text-left px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-black transition"
            >
              Enquiry
            </button>
          </div>
        </div>

      </nav>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navbar;
