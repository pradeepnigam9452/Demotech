import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Working Hours */}
          <div>
            <a href="https://binarylogix.in" className="inline-block mb-4">
              <img
                src="logo.png"
                alt="Binarylogix Logo"
                className="h-14 sm:h-16"
              />
            </a>
            <p className="mb-4 text-sm sm:text-base">
              Empowering your business with tailored, innovative solutions.
            </p>
            <div>
              <h6 className="text-lg font-semibold mb-2">Working Hours:</h6>
              <ul className="text-sm space-y-1">
                <li>Mon - Sat: 10:00 AM - 5:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a
                  href="https://binarylogix.in/about-us/"
                  target="_blank"
                  className="hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://binarylogix.in/team/"
                  target="_blank"
                  className="hover:underline"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="https://binarylogix.in/services-grid/"
                  target="_blank"
                  className="hover:underline"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="https://binarylogix.in/contact-us/"
                  target="_blank"
                  className="hover:underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Web/App Development</li>
              <li>Digital Marketing</li>
              <li>Meta & Google Ads</li>
              <li>UI/UX Design</li>
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Our Gallery</h4>
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
                <a key={idx} href={href} className="block col-span-1">
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-auto rounded-sm object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div>© 2024 Binarylogix. All Rights Reserved.</div>

          <div className="flex space-x-4 text-xl">
            <a href="http://facebook.com" className="hover:text-blue-500" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="http://twitter.com" className="hover:text-sky-400" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="http://linkedin.com" className="hover:text-blue-600" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="http://instagram.com" className="hover:text-pink-500" aria-label="Instagram">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          <div className="flex flex-wrap items-center space-x-4">
            <a href="#" target="_blank" className="hover:underline">
              Terms &amp; Conditions
            </a>
            <a href="#" target="_blank" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
