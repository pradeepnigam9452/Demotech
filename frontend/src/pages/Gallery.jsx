// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";

// export default function Gallery() {
//   const galleryImages = [
//     // Logo images
//     {
//       id: 1,
//       src: "/gallery/ashish kumar white.png",
//       alt: "Ashish Kumar White Logo",
//       category: "Logo",
//     },
//     {
//       id: 2,
//       src: "/gallery/l.png",
//       alt: "L Logo",
//       category: "Logo",
//     },
//     {
//       id: 3,
//       src: "/gallery/logo final.png",
//       alt: "Final Logo",
//       category: "Logo",
//     },
//     {
//       id: 4,
//       src: "/gallery/logo-main.png",
//       alt: "Main Logo",
//       category: "Logo",
//     },
//     {
//       id: 5,
//       src: "/gallery/main logo.png",
//       alt: "Main Logo Alt",
//       category: "Logo",
//     },
//     {
//       id: 6,
//       src: "/gallery/roundedLogo.png",
//       alt: "Rounded Logo",
//       category: "Logo",
//     },
//     // Project Preview Images
//     {
//       id: 7,
//       src: "/makeahabit.png",
//       alt: "Make A Habit App",
//       category: "Project Preview",
//     },
//     {
//       id: 8,
//       src: "/proj5.png",
//       alt: "Pachmarhi Ayurveda Site",
//       category: "Project Preview",
//     },
//     {
//       id: 9,
//       src: "/proj2.png",
//       alt: "How To Clean Website",
//       category: "Project Preview",
//     },
//     {
//       id: 10,
//       src: "/jobportal.png",
//       alt: "EduNaukri Job Portal",
//       category: "Project Preview",
//     },
//     {
//       id: 11,
//       src: "/chemistry.jpg",
//       alt: "Chemistry Classes Site",
//       category: "Project Preview",
//     },
//     {
//       id: 12,
//       src: "/proj4.png",
//       alt: "Sakshi Hospital Website",
//       category: "Project Preview",
//     },
//     {
//       id: 13,
//       src: "/proj1.png",
//       alt: "Sarasvati Vidya Mandir School",
//       category: "Project Preview",
//     },
//     {
//       id: 14,
//       src: "/proj3.png",
//       alt: "Robo Fintech Pvt Ltd",
//       category: "Project Preview",
//     },
//     // Digital Marketing Images
//     {
//       id: 15,
//       src: "/gallery/digital/+91 961 7189 757_20250722_171001_0000.png",
//       alt: "WhatsApp Campaign Poster",
//       category: "Digital Marketing",
//     },
//     {
//       id: 16,
//       src: "/gallery/digital/4_20250708_172703_0000.png",
//       alt: "Promotional Design",
//       category: "Digital Marketing",
//     },
//     {
//       id: 17,
//       src: "/gallery/digital/chris.png",
//       alt: "Chris Poster",
//       category: "Digital Marketing",
//     },
//     {
//       id: 18,
//       src: "/gallery/digital/DIGITAL.png",
//       alt: "Digital Banner",
//       category: "Digital Marketing",
//     },
//     {
//       id: 19,
//       src: "/gallery/digital/fitness gym 2.png",
//       alt: "Fitness Gym Banner 2",
//       category: "Digital Marketing",
//     },
//     {
//       id: 20,
//       src: "/gallery/digital/fitnessgym.png",
//       alt: "Fitness Gym Poster",
//       category: "Digital Marketing",
//     },
//     {
//       id: 21,
//       src: "/gallery/digital/leads.png",
//       alt: "Leads Campaign",
//       category: "Digital Marketing",
//     },
//     {
//       id: 22,
//       src: "/gallery/digital/mid1.png",
//       alt: "Mid Campaign 1",
//       category: "Digital Marketing",
//     },
//     {
//       id: 23,
//       src: "/gallery/digital/mid5.png",
//       alt: "Mid Campaign 5",
//       category: "Digital Marketing",
//     },
//     {
//       id: 24,
//       src: "/gallery/digital/mmid 3.png",
//       alt: "Mid Campaign 3",
//       category: "Digital Marketing",
//     },
//     {
//       id: 25,
//       src: "/gallery/digital/Screenshot 2025-04-19 at 1.40.38 PM.png",
//       alt: "Screenshot Campaign",
//       category: "Logo",
//     },
//     {
//       id: 26,
//       src: "/gallery/digital/The MidNight Fuddle.png",
//       alt: "The Midnight Fuddle",
//       category: "Digital Marketing",
//     },
//   ];

//   const categories = ["All", "Logo", "Project Preview", "Digital Marketing"];
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredImages =
//     selectedCategory === "All"
//       ? galleryImages
//       : galleryImages.filter((img) => img.category === selectedCategory);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       <Navbar />

//       {/* ===== Header – now matches theme ===== */}
//       <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
//         {/* Animated background blobs */}
//         <motion.div
//           className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-10"
//           style={{ background: "#378af9" }}
//           animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-5"
//           style={{ background: "#378af9" }}
//           animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         />

//         <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#378af9] text-xs font-semibold tracking-wider uppercase mb-4">
//               Our Work
//             </span>
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
//               Our <span className="text-[#378af9]">Designs</span>
//             </h1>
//             <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
//               Discover our curated collection of logos, projects, and creative digital work.
//             </p>
//             <div className="mt-6 mx-auto w-20 h-1 bg-[#378af9] rounded-full" />
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== Filter Bar ===== */}
//       <section className="w-full bg-white pb-2">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <motion.div
//             className="flex flex-wrap justify-center gap-3 mb-8"
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//           >
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
//                   selectedCategory === category
//                     ? "bg-[#378af9] text-white border-[#378af9] shadow-md shadow-blue-200/50"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== Gallery Grid ===== */}
//       <section className="w-full bg-white pb-16 md:pb-20 lg:pb-24">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//           >
//             {filteredImages.map((image) => (
//               <motion.div
//                 key={image.id}
//                 variants={itemVariants}
//                 className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
//               >
//                 <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
//                   <img
//                     src={image.src || "/placeholder.svg"}
//                     alt={image.alt}
//                     className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-2"
//                   />
//                   {/* Subtle overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   {/* Optional category tag inside image */}
//                   <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2.5 py-1 rounded-full border border-gray-200/50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     {image.category}
//                   </span>
//                 </div>
//                 <div className="p-4">
//                   <p className="text-sm text-gray-600 truncate group-hover:text-[#378af9] transition-colors">
//                     {image.alt}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Empty state */}
//           {filteredImages.length === 0 && (
//             <div className="text-center py-12 text-gray-400">
//               No images found in this category.
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }





import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, AlertCircle, Image as ImageIcon } from "lucide-react";

// Fallback SVG placeholder (base64) – always works
const PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f2f5"/><text x="200" y="150" font-family="sans-serif" font-size="20" fill="%23999" text-anchor="middle">No Image</text></svg>`;

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized image URL builder
  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath) return PLACEHOLDER_SVG;
    if (imagePath.startsWith("http")) return imagePath;
    // Remove leading slashes and backslashes, then prepend a single slash
    const clean = imagePath.replace(/^[\\/]+/, "");
    return `/${clean}`;
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/gallery");
      // Expecting { data: { data: [...] } } – adjust if your API differs
      const items = res.data?.data || [];
      setGalleryImages(items);
      if (items.length === 0) {
        setError("No gallery items found.");
      }
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError(err.response?.data?.message || "Failed to load gallery. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Dynamic categories from fetched data
  const categories = [
    "All",
    ...new Set(galleryImages.map((item) => item.category).filter(Boolean)),
  ];

  // Filter by category + search (title, description, category)
  const filteredImages = galleryImages.filter((img) => {
    const matchCategory = selectedCategory === "All" || img.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch =
      img.title?.toLowerCase().includes(searchLower) ||
      img.description?.toLowerCase().includes(searchLower) ||
      img.category?.toLowerCase().includes(searchLower);
    return matchCategory && matchSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.92,
      transition: { duration: 0.25 },
    },
  };

  // Loading skeleton
  const SkeletonCard = () => (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full rounded-t-2xl bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8"
        >
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            Our Work
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Design <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Explore our curated collection of logos, projects, and creative digital assets.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-blue-600" />
        </motion.div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-10 text-center"
            >
              <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
              <h3 className="text-lg font-semibold text-red-700">Oops! Something went wrong</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <button
                onClick={fetchGallery}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Retry
              </button>
            </motion.div>
          ) : filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center"
            >
              <ImageIcon className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-semibold text-gray-700">No matching images</h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filters."
                  : "No gallery items have been uploaded yet."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image._id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(image.image)}
                        alt={image.imageAlt || image.title || "Gallery"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_SVG;
                        }}
                      />
                      {/* Category badge on hover */}
                      {image.category && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-gray-700 shadow-sm backdrop-blur-sm"
                        >
                          {image.category}
                        </motion.span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="truncate text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {image.description}
                        </p>
                      )}
                      {image.projectLink && (
                        <a
                          href={image.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}