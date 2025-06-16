import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const cardsData = [
    {
        id: 1,
        title: "Saravati Shishu Vidya Mandir Sironj",
        description:
            "Saravati Shishu Vidya Mandir Sironj is an educational institution website built to provide an engaging and informative digital presence for students, parents, and teachers. The site showcases the school's values, curriculum, and facilities while maintaining a simple and responsive layout to ensure accessibility across devices and platforms.",
        laptopImg: "proj1.png",
        link: "https://ssvmsironj.edu.in/",
        features: [
            "Fully Responsive Design",
            "Easy Navigation for Users",
            "Cross-browser Compatibility",
            "Showcase for Academic & Cultural Activities",
            "Fast Load Time & Optimized Media",
        ],
    },
    {
        id: 2,
        title: "How To Clean",
        description:
            "How To Clean is a professional cleaning service website that focuses on offering tips, solutions, and booking options for residential and commercial cleaning. Designed with a clean, modern layout, the website makes it easy for users to navigate services, read blogs, and contact experts for their cleaning needs.",
        laptopImg: "proj2.png",
        link: "https://howtoclean.co.in/",
        features: [
            "Service Listing with Details",
            "Blog Section for Cleaning Tips",
            "Contact Form with Email Integration",
            "Mobile-first Responsive Layout",
            "SEO and Speed Optimization",
        ],
    },
    {
        id: 3,
        title: "Robo Fintech Pvt Ltd",
        description:
            "Robo Fintech Pvt Ltd is a financial technology website built to represent modern fintech services, investment tools, and consultancy features. It includes a user-centric design with call-to-actions, interactive components, and secure data management practices. The site is built with scalability and speed in mind for better user experience.",
        laptopImg: "proj3.png",
        link: "https://robo.binarylogix.in/",
        features: [
            "Interactive Dashboard UI",
            "Secure Login and Client Portal",
            "Service Highlights with CTA Buttons",
            "Performance-Driven Design",
            "Business-Oriented Aesthetic",
        ],
    },
    {
        id: 4,
        title: "Sakshi Hospital",
        description:
            "Sakshi Hospital’s website is designed to provide patients with easy access to healthcare information, doctor profiles, appointment booking, and facility details. It reflects trust and professionalism while focusing on usability for all age groups. The responsive design ensures smooth access on smartphones, tablets, and desktops.",
        laptopImg: "proj4.png",
        link: "https://sakshihospital.in/",
        features: [
            "Doctor Profiles with Qualifications",
            "Online Appointment System",
            "Service Pages with Detailed Info",
            "Accessible UI for All Ages",
            "Google Map Integration",
        ],
    },
    {
        id: 5,
        title: "Pachmarhi Ayurveda",
        description:
            "Pachmarhi Ayurveda is a wellness and e-commerce website offering a catalog of Ayurvedic products, wellness therapies, and natural remedies. The platform highlights the benefits of Ayurveda with a serene design that appeals to health-conscious users. It supports informative content and secure browsing for online users.",
        laptopImg: "proj5.png",
        link: "https://pachmarhiayurveda.com/",
        features: [
            "Ayurvedic Product Catalog",
            "Informative Content on Natural Remedies",
            "Clean UI with Herbal Theme",
            "Secure Browsing Experience",
            "Optimized for Performance and Mobile",
        ],
    },
];

const HomeProjectSlider = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full  bg-white py-5" id="project">
            <div className="text-center mb-2">
                <h2 className="text-4xl sm:text-5xl font-bold text-blue-900">
                    Our Projects
                </h2>
            </div>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                className="w-full px-4 md:px-10"
            >
                {cardsData.map((card) => (
                    <SwiperSlide key={card.id}>
                        <div className="flex w-[90%] mx-auto flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl">
                            <div className="md:w-1/2 w-full h-50 md:h-54">
                                <img
                                    src={card.laptopImg}
                                    alt={card.title}
                                    className="w-full h-full object-contain rounded-t-xl md:rounded-l-xl"
                                />
                            </div>

                            <div className="md:w-1/2 w-full p-6 md:p-10 space-y-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-blue-900">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-700 mt-2 text-sm md:text-base leading-relaxed">
                                        {card.description.split(" ").slice(0, 30).join(" ") + (card.description.split(" ").length > 30 ? "..." : "")}
                                    </p>

                                </div>


                                {card.link && (
                                    <div>
                                        <a
                                            href={card.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <button
                    onClick={() => navigate("/projects")}
                    className="mt-4 mx-auto flex px-6 py-2 text-white bg-blue-900 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    View More
                </button>
            </Swiper>

        </div>
    );
};

export default HomeProjectSlider;
