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


import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EnquiryModal from "./EnquiryModal";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for shadow/background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Base link style with underline animation and active state
  const navLinkStyle = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    } before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-full before:scale-x-0 before:bg-blue-600 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
      isActive ? "before:scale-x-100" : ""
    }`;

  // Mobile link class
  const mobileLinkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm shadow-sm"
        }`}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="https://binarylogix.in" className="flex-shrink-0">
              <img
                className="w-32 md:w-40 h-auto rounded-xl"
                src={logo}
                alt="Binarylogix Logo"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              <NavLink to="/" className={navLinkStyle} end>
                Home
              </NavLink>
              <NavLink to="/aboutUs" className={navLinkStyle}>
                About Us
              </NavLink>
              <NavLink to="/services" className={navLinkStyle}>
                Services
              </NavLink>
              <NavLink to="/gallery" className={navLinkStyle}>
                Design
              </NavLink>
              <NavLink to="/projects" className={navLinkStyle}>
                Projects
              </NavLink>
              <button
                onClick={toggleModal}
                className="ml-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enquiry
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with backdrop */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu panel */}
          <div
            className={`absolute top-20 left-0 right-0 bg-white shadow-2xl rounded-b-2xl transition-transform duration-300 ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-8"
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <NavLink to="/" onClick={closeMobileMenu} className={mobileLinkStyle} end>
                Home
              </NavLink>
              <NavLink to="/aboutUs" onClick={closeMobileMenu} className={mobileLinkStyle}>
                About Us
              </NavLink>
              <NavLink to="/services" onClick={closeMobileMenu} className={mobileLinkStyle}>
                Services
              </NavLink>
              <NavLink to="/gallery" onClick={closeMobileMenu} className={mobileLinkStyle}>
                Design
              </NavLink>
              <NavLink to="/projects" onClick={closeMobileMenu} className={mobileLinkStyle}>
                Projects
              </NavLink>
              <button
                onClick={() => {
                  closeMobileMenu();
                  toggleModal();
                }}
                className="w-full text-left mt-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navbar;