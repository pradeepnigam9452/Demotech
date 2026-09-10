// projectSeeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("../models/Project");

dotenv.config();

// MongoDB connection
mongoose.connect("mongodb+srv://sohanlalsp205:WR5koomUWutFinWh@cluster0.axskgd7.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ Connection error:", err));

// Seed Data (Compatible with your schema)
const cardsData = [
  {
    title: "Make Habit",
    description: "It's an app for connecting customers with local service providers. The application features a clean, modern design that allows users to easily search for and book services such as home cleaning, plumbing, and electrical work. It includes user reviews, service provider profiles, and a secure booking system to enhance user trust and convenience.",
    image: "makeahabit.png",
    link: "https://www.makeahabit.com/",
    features: [
      "User-friendly Interface",
      "Service Provider Profiles",
      "Secure Booking System",
      "User Reviews and Ratings",
      "Both Android and iOS App"
    ]
  },
  {
    title: "Pachmarhi Ayurveda",
    description: "Pachmarhi Ayurveda is a wellness and e-commerce website offering a catalog of Ayurvedic products, wellness therapies, and natural remedies. The platform highlights the benefits of Ayurveda with a serene design that appeals to health-conscious users. It supports informative content and secure browsing for online users.",
    image: "proj5.png",
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
    title: "How To Clean",
    description: "How To Clean is a professional cleaning service website that focuses on offering tips, solutions, and booking options for residential and commercial cleaning. Designed with a clean, modern layout, the website makes it easy for users to navigate services, read blogs, and contact experts for their cleaning needs.",
    image: "proj2.png",
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
    title: "EduNaukri Job-Portal",
    description: "EduNaukri is a comprehensive job portal website designed to connect job seekers with employers. It features a user-friendly interface, advanced search options, and secure login for both candidates and recruiters. The site supports job listings, applications, and profile management, ensuring a seamless experience for all users.",
    image: "jobportal.png",
    link: "https://www.edunaukri.com",
    features: [
      "User-friendly Job Search",
      "Advanced Filtering Options",
      "Secure User Profiles",
      "Employer Dashboard for Job Listings",
      "Real-time Notifications for Job Alerts"
    ]
  },
  {
    title: "Chemistry Classes",
    description: "Chemistry Classes is an educational website designed to provide students with resources, tutorials, and interactive learning experiences in chemistry. The site features a user-friendly interface with easy navigation, responsive design for all devices, and a focus on delivering quality educational content.",
    image: "chemistry.jpg",
    link: "https://www.ruchiupadhyay.com",
    features: [
      "Comprehensive Chemistry Resources",
      "Interactive Learning Modules",
      "Responsive Design for All Devices",
      "User-friendly Navigation"
    ]
  },
  {
    title: "Sakshi Hospital",
    description: "Sakshi Hospital’s website is designed to provide patients with easy access to healthcare information, doctor profiles, appointment booking, and facility details. It reflects trust and professionalism while focusing on usability for all age groups. The responsive design ensures smooth access on smartphones, tablets, and desktops.",
    image: "proj4.png",
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
    title: "Saravati Shishu Vidya Mandir Sironj",
    description: "Saravati Shishu Vidya Mandir Sironj is an educational institution website built to provide an engaging and informative digital presence for students, parents, and teachers. The site showcases the school's values, curriculum, and facilities while maintaining a simple and responsive layout to ensure accessibility across devices and platforms.",
    image: "proj1.png",
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
    title: "Robo Fintech Pvt Ltd",
    description: "Robo Fintech Pvt Ltd is a financial technology website built to represent modern fintech services, investment tools, and consultancy features. It includes a user-centric design with call-to-actions, interactive components, and secure data management practices. The site is built with scalability and speed in mind for better user experience.",
    image: "proj3.png",
    link: "https://robo.demotech.in/",
    features: [
      "Interactive Dashboard UI",
      "Secure Login and Client Portal",
      "Service Highlights with CTA Buttons",
      "Performance-Driven Design",
      "Business-Oriented Aesthetic"
    ]
  }
];

const seedProjects = async () => {
  try {
    await Project.deleteMany(); // Optional: clears old data
    const result = await Project.insertMany(cardsData);
    console.log(`✅ Seeded ${result.length} projects successfully.`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedProjects();
