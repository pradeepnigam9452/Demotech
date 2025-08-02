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
    title: "Make A Habit",
    description: "It's an app for connecting customers with local service providers...",
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
    description: "Pachmarhi Ayurveda is a wellness and e-commerce website...",
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
    description: "How To Clean is a professional cleaning service website...",
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
    description: "EduNaukri is a comprehensive job portal website...",
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
    description: "Chemistry Classes is an educational website designed...",
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
    description: "Sakshi Hospital’s website is designed to provide...",
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
    description: "Saravati Shishu Vidya Mandir Sironj is an educational institution website...",
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
    description: "Robo Fintech Pvt Ltd is a financial technology website...",
    image: "proj3.png",
    link: "https://robo.binarylogix.in/",
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
