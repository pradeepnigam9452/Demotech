import { useState } from "react";
import { NavLink } from "react-router-dom";
import EnquiryModal from "./EnquiryModal";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <nav className="bg-[#f5f5f5ea] text-[#016386] shadow-md sticky top-0 z-50" style={{ fontFamily: "Roboto" }}>
                <div className="max-w-full mx-20 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0 rounded-xl">
                            <NavLink to="https://binarylogix.in">
                                <img className="w-50 rounded-xl" src="logo.png" alt="Binarylogix Logo" />
                            </NavLink>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <NavLink
                                to="/"
                                className="relative text-xl font-semibold text-[#016386] hover:text-gray-800
                                before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full
                                before:scale-x-0 before:bg-[#016386] before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/aboutUs"
                                className="relative text-xl font-semibold text-[#016386] hover:text-gray-800
                                before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full
                                before:scale-x-0 before:bg-[#016386] before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                to="/services"
                                className="relative text-xl font-semibold text-[#016386] hover:text-gray-800
                                before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full
                                before:scale-x-0 before:bg-[#016386] before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                            >
                                Services
                            </NavLink>
                            <NavLink
                                to="/projects"
                                className="relative text-xl font-semibold text-[#016386] hover:text-gray-800
                                before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full
                                before:scale-x-0 before:bg-[#016386] before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                            >
                                Projects
                            </NavLink>
                            <button
                                onClick={toggleModal}
                                className="bg-[#016386] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#014f59] transition"
                            >
                                Enquiry
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden ">
                            <button
                                onClick={toggleMobileMenu}
                                className="focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#016386] px-4 pb-4 text-white">
                        <NavLink to="/" className="block py-2 border-b border-gray-600 hover:bg-[#014f59]">Home</NavLink>
                        <NavLink to="/aboutUs" className="block py-2 border-b border-gray-600 hover:bg-[#014f59]">About Us</NavLink>
                        <NavLink to="/services" className="block py-2 border-b border-gray-600 hover:bg-[#014f59]">Our Services</NavLink>
                        <NavLink to="/projects" className="block py-2 border-b border-gray-600 hover:bg-[#014f59]">Our projects</NavLink>
                        <button
                            onClick={toggleModal}
                            className="w-full text-left py-2 mt-2 bg-[#016386] rounded hover:bg-gray-100"
                        >
                            Enquiry
                        </button>
                    </div>
                )}
            </nav>

            {/* Enquiry Modal */}
            <EnquiryModal isOpen={isModalOpen} onClose={toggleModal} />


        </>
    );
};

export default Navbar;
