import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Gallery() {
  const galleryImages = [
    // Logo images
    {
      id: 1,
      src: "/gallery/ashish kumar white.png",
      alt: "Ashish Kumar White Logo",
      category: "Logo",
    },
    {
      id: 2,
      src: "/gallery/l.png",
      alt: "L Logo",
      category: "Logo",
    },
    {
      id: 3,
      src: "/gallery/logo final.png",
      alt: "Final Logo",
      category: "Logo",
    },
    {
      id: 4,
      src: "/gallery/logo-main.png",
      alt: "Main Logo",
      category: "Logo",
    },
    {
      id: 5,
      src: "/gallery/main logo.png",
      alt: "Main Logo Alt",
      category: "Logo",
    },
    {
      id: 6,
      src: "/gallery/roundedLogo.png",
      alt: "Rounded Logo",
      category: "Logo",
    },

    // Project Preview Images
    {
      id: 7,
      src: "/makeahabit.png",
      alt: "Make A Habit App",
      category: "Project Preview",
    },
    {
      id: 8,
      src: "/proj5.png",
      alt: "Pachmarhi Ayurveda Site",
      category: "Project Preview",
    },
    {
      id: 9,
      src: "/proj2.png",
      alt: "How To Clean Website",
      category: "Project Preview",
    },
    {
      id: 10,
      src: "/jobportal.png",
      alt: "EduNaukri Job Portal",
      category: "Project Preview",
    },
    {
      id: 11,
      src: "/chemistry.jpg",
      alt: "Chemistry Classes Site",
      category: "Project Preview",
    },
    {
      id: 12,
      src: "/proj4.png",
      alt: "Sakshi Hospital Website",
      category: "Project Preview",
    },
    {
      id: 13,
      src: "/proj1.png",
      alt: "Sarasvati Vidya Mandir School",
      category: "Project Preview",
    },
    {
      id: 14,
      src: "/proj3.png",
      alt: "Robo Fintech Pvt Ltd",
      category: "Project Preview",
    },

    // Digital Marketing Images
    {
      id: 15,
      src: "/gallery/digital/+91 961 7189 757_20250722_171001_0000.png",
      alt: "WhatsApp Campaign Poster",
      category: "Digital Marketing",
    },
    {
      id: 16,
      src: "/gallery/digital/4_20250708_172703_0000.png",
      alt: "Promotional Design",
      category: "Digital Marketing",
    },
    {
      id: 17,
      src: "/gallery/digital/chris.png",
      alt: "Chris Poster",
      category: "Digital Marketing",
    },
    {
      id: 18,
      src: "/gallery/digital/DIGITAL.png",
      alt: "Digital Banner",
      category: "Digital Marketing",
    },
    {
      id: 19,
      src: "/gallery/digital/fitness gym 2.png",
      alt: "Fitness Gym Banner 2",
      category: "Digital Marketing",
    },
    {
      id: 20,
      src: "/gallery/digital/fitnessgym.png",
      alt: "Fitness Gym Poster",
      category: "Digital Marketing",
    },
    {
      id: 21,
      src: "/gallery/digital/leads.png",
      alt: "Leads Campaign",
      category: "Digital Marketing",
    },
    {
      id: 22,
      src: "/gallery/digital/mid1.png",
      alt: "Mid Campaign 1",
      category: "Digital Marketing",
    },
    {
      id: 23,
      src: "/gallery/digital/mid5.png",
      alt: "Mid Campaign 5",
      category: "Digital Marketing",
    },
    {
      id: 24,
      src: "/gallery/digital/mmid 3.png",
      alt: "Mid Campaign 3",
      category: "Digital Marketing",
    },
    {
      id: 25,
      src: "/gallery/digital/Screenshot 2025-04-19 at 1.40.38 PM.png",
      alt: "Screenshot Campaign",
      category: "Logo",
    },
    {
      id: 26,
      src: "/gallery/digital/The MidNight Fuddle.png",
      alt: "The Midnight Fuddle",
      category: "Digital Marketing",
    },
  ];

  const categories = ["All", "Logo", "Project Preview", "Digital Marketing"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background">
      {/* Header */}
     {/* ✅ Animated Gallery Header Section */}
<section className="relative py-16 sm:py-20 md:py-20 bg-gradient-to-br from-gray-700 to-gray-900 text-white overflow-hidden">
  {/* Blurred background blobs */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#378bf977] rounded-full blur-3xl opacity-30"
    animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-30"
    animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="relative z-10 text-center px-4 sm:px-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      Our <span className="text-[#5a9efa]">Gallery</span>
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg">
      Discover our curated collection of logos, projects, and creative digital work.
    </p>
  </motion.div>
</section>


      {/* Filter Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
        ${
          selectedCategory === category
            ? "bg-black text-white border-blue-600"
            : "text-gray-700 border-gray-300 hover:bg-blue-100"
        }`}
    >
      {category}
    </button>
  ))}
</div>


        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
