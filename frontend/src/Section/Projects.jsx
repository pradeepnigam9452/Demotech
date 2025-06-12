// components/Projects.jsx
import React, { useState } from "react";
import Card from "../components/Card"; // Adjust path if needed

const cardsData = [
  {
    id: 1,
    title: "Saravati Shishu Vidya Mandir Sironj",
    description: "Saravati Shishu Vidya Mandir Sironj is an educational institution website built to provide an engaging and informative digital presence for students, parents, and teachers. The site showcases the school's values, curriculum, and facilities while maintaining a simple and responsive layout to ensure accessibility across devices and platforms.",
    laptopImg: "proj1.png",
    mobileImg: "proj1.png",
    link: "https://ssvmsironj.edu.in/",
    features: [
      "Fully Responsive Design",
      "Easy Navigation for Users",
      "Cross-browser Compatibility",
      "Showcase for Academic & Cultural Activities",
      "Fast Load Time & Optimized Media"
    ]
  },
  {
    id: 2,
    title: "How To Clean",
    description: "How To Clean is a professional cleaning service website that focuses on offering tips, solutions, and booking options for residential and commercial cleaning. Designed with a clean, modern layout, the website makes it easy for users to navigate services, read blogs, and contact experts for their cleaning needs.",
    laptopImg: "proj2.png",
    mobileImg: "proj2.png",
    link: "https://howtoclean.co.in/",
    features: [
      "Service Listing with Details",
      "Blog Section for Cleaning Tips",
      "Contact Form with Email Integration",
      "Mobile-first Responsive Layout",
      "SEO and Speed Optimization"
    ]
  },
  {
    id: 3,
    title: "Robo Fintech Pvt Ltd",
    description: "Robo Fintech Pvt Ltd is a financial technology website built to represent modern fintech services, investment tools, and consultancy features. It includes a user-centric design with call-to-actions, interactive components, and secure data management practices. The site is built with scalability and speed in mind for better user experience.",
    laptopImg: "proj3.png",
    mobileImg: "proj3.png",
    link: "https://robo.binarylogix.in/",
    features: [
      "Interactive Dashboard UI",
      "Secure Login and Client Portal",
      "Service Highlights with CTA Buttons",
      "Performance-Driven Design",
      "Business-Oriented Aesthetic"
    ]
  },
  {
    id: 4,
    title: "Sakshi Hospital",
    description: "Sakshi Hospital’s website is designed to provide patients with easy access to healthcare information, doctor profiles, appointment booking, and facility details. It reflects trust and professionalism while focusing on usability for all age groups. The responsive design ensures smooth access on smartphones, tablets, and desktops.",
    laptopImg: "proj4.png",
    mobileImg: "proj4.png",
    link: "https://sakshihospital.in/",
    features: [
      "Doctor Profiles with Qualifications",
      "Online Appointment System",
      "Service Pages with Detailed Info",
      "Accessible UI for All Ages",
      "Google Map Integration"
    ]
  },
  {
    id: 5,
    title: "Pachmarhi Ayurveda",
    description: "Pachmarhi Ayurveda is a wellness and e-commerce website offering a catalog of Ayurvedic products, wellness therapies, and natural remedies. The platform highlights the benefits of Ayurveda with a serene design that appeals to health-conscious users. It supports informative content and secure browsing for online users.",
    laptopImg: "proj5.png",
    mobileImg: "proj5.png",
    link: "https://pachmarhiayurveda.com/",
    features: [
      "Ayurvedic Product Catalog",
      "Informative Content on Natural Remedies",
      "Clean UI with Herbal Theme",
      "Secure Browsing Experience",
      "Optimized for Performance and Mobile"
    ]
  },
  {
    id: 6,
    title: "Travel Booking Platform",
    description: "Find the best deals and plan your perfect trip.",
    laptopImg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=612&auto=format&fit=crop&q=60",
    mobileImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60",
    features: ["Best Deals", "User Reviews"]
  },
  // {
  //   id: 7,
  //   title: "Online Learning Portal",
  //   description: "Access courses and tutorials across a variety of subjects.",
  //   laptopImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=612&auto=format&fit=crop&q=60",
  //   mobileImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
  //   features: ["Wide Course Selection", "Interactive Quizzes"]
  // },
  // {
  //   id: 8,
  //   title: "Finance Management App",
  //   description: "Manage your finances with budgeting and expense tracking.",
  //   laptopImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=612&auto=format&fit=crop&q=60",
  //   mobileImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
  //   features: ["Budget Planner", "Expense Tracker"]
  // },
  // {
  //   id: 9,
  //   title: "Restaurant Finder",
  //   description: "Discover restaurants near you with ratings and reviews.",
  //   laptopImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=612&auto=format&fit=crop&q=60",
  //   mobileImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
  //   features: ["Nearby Restaurants", "User Ratings"]
  // },
  // {
  //   id: 10,
  //   title: "Event Management System",
  //   description: "Organize events, send invites, and track attendance easily.",
  //   laptopImg: "/prj.png",
  //   mobileImg: "/prj.png",
  //   features: ["Invite Management", "Attendance Tracking"]
  // }
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Calculate indexes
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardsData.length / cardsPerPage);

const handlePrev = () => {
  if (currentPage > 1) {
    setCurrentPage(prev => prev - 1);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(prev => prev + 1);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  return (
    <>
      <div className=" bg-white text-center pb-5">
        <h2
          className="text-5xl font-bold text-center text-gray-800 mt-10 inline-block after:block after:w-40 after:h-1 after:bg-blue-900 after:mt-3 after:mx-auto"
          id="projects"
        >
          Our Projects
        </h2>
      </div>

      <section className="px-6 py-12 flex justify-center">
        <div className="grid grid-cols-1 gap-8 w-4/5">
          {currentCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              laptopImg={card.laptopImg}
              mobileImg={card.mobileImg}
              features={card.features}
              link={card.link}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center items-center space-x-4 mb-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Projects;