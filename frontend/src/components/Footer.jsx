import React from "react";

const Footer = () => {
    return (
        <footer className="footer-main bg-gray-900 text-white relative py-10">

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Working Hours */}
                    <div>
                        <a href="https://binarylogix.in" className="inline-block mb-6">
                            <img
                                src="logo.png"
                                alt="Footer Logo"
                                className="h-16"
                            />
                        </a>
                        <p className="mb-6">
                            Empowering your Business with tailored, innovative Solutions
                        </p>
                        <div>
                            <h6 className="text-lg font-semibold mb-2">Working Hours:</h6>
                            <ul className="text-sm space-y-1">
                                <li>Mon - Sat: 10.00AM - 5.00PM</li>
                                <li>Sunday: Close</li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-xl font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://binarylogix.in/about-us/"
                                    className="hover:underline"
                                    target="_blank"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://binarylogix.in/team/"
                                    className="hover:underline"
                                    target="_blank"
                                >
                                    Our Team
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://binarylogix.in/services-grid/"
                                    className="hover:underline"
                                    target="_blank"
                                >
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://binarylogix.in/contact-us/"
                                    className="hover:underline"
                                    target="_blank"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="mb-6 text-xl font-semibold">Our Services</h4>
                        <ul className="space-y-2">
                            <li>Web/App Development</li>
                            <li>Digital Marketing</li>
                            <li>Meta & Google Ads</li>
                            <li>UI/UX Design</li>
                        </ul>
                    </div>

                    {/* Gallery */}
                    <div>
                        <h4 className="mb-6 text-xl font-semibold">Our Gallery</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                {
                                    href: "https://binarylogix.in/footer-1/",
                                    src: "https://binarylogix.in/wp-content/uploads/2024/02/footer-1.jpg",
                                },
                                {
                                    href: "https://binarylogix.in/footer-1-2/",
                                    src: "https://binarylogix.in/wp-content/uploads/2024/02/footer-1-1.jpg",
                                },
                                {
                                    href: "https://binarylogix.in/footer-2-2/",
                                    src: "https://binarylogix.in/wp-content/uploads/2024/02/footer-2-1.jpg",
                                },
                                {
                                    href: "https://binarylogix.in/footer-4/",
                                    src: "https://binarylogix.in/wp-content/uploads/2024/02/footer-4.jpg",
                                },
                            ].map(({ href, src }, idx) => (
                                <a key={idx} href={href} className="block">
                                    <img
                                        src={src}
                                        alt={`Gallery ${idx + 1}`}
                                        className="w-full h-auto rounded-sm"
                                        loading="lazy"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="footer-bottom flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-10 pt-6 text-sm">
                    <div>© 2024 Binarylogix. All Rights Reserved.</div>

                    <div className="footer-socials space-x-6 my-4 md:my-0 text-xl">
                        <a href="http://facebook.com" aria-label="Facebook" className="hover:text-blue-600">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="http://twitter.com" aria-label="Twitter" className="hover:text-sky-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="http://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-700">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="http://instagram.com" aria-label="Instagram" className="hover:text-pink-600">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>

                    <div className="space-x-4">
                        <a href="#" className="hover:underline"
                            target="_blank">
                            Terms &amp; Conditions
                        </a>
                        <a href="#" className="hover:underline"
                            target="_blank">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
