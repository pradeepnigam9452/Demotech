import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";


const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

const cardLoadVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};



const contentHoverVariant = {
    hover: {
        boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const Card = ({ title, description, laptopImg, mobileImg, features, link }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const imgList = [
        { src: laptopImg, label: "Laptop View" },
        { src: mobileImg, label: "Mobile View" },
    ];

    const paginate = (dir) => {
        setDirection(dir);
        setIndex((prev) => (prev + dir + imgList.length) % imgList.length);
    };

    // Auto slider logic: change slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1); // move forward automatically
        }, 4000);

        return () => clearInterval(interval); // cleanup on unmount
    }, []); // empty deps to run once

    return (
        <motion.div
            className="w-full mx-auto p-6"
            variants={cardLoadVariant}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
                style={{ fontFamily: "Jost" }}
            >
                {/* Right Slider Section */}
                <motion.div
                    className="w-full md:w-1/2 relative bg-gray-50 p-4"
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                >
                    <div className="relative h-130 flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img
                                key={index}
                                src={imgList[index].src}
                                alt={imgList[index].label}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                                className="absolute  rounded-xl max-h-full  w-130 "
                                whileHover="hover"
                            />
                        </AnimatePresence>
                    </div>

                </motion.div>

                {/* Left Content Section */}
                <motion.div
                    className="w-full md:w-1/2 p-8 bg-white-50 relative z-10 rounded-r-2xl"
                    whileHover="hover"
                    variants={contentHoverVariant}
                >
                    <h2 className="lg:text-3xl text-2xl bg-sky-800  w-fit p-3 rounded-2xl text-white "
                        style={{ fontFamily: "Merriweather, cursive" }}
                    >
                        {title}
                    </h2>
                    <p className="text-slate-500 text-justify mt-4 text-lg"><span className="font-bold text-black">Description :</span> {description}</p>
                    <div className="mt-7 px-10">
                        <p className="text-black font-bold mt-4 text-lg">Features</p>
                        {features.map((feature, idx) => (
                            <ul className="list-disc ml-5 space-y-1">
                                <li key={idx}>{feature}</li>

                            </ul>
                        ))}

                        <a
                            href={link}
                            target="_blank"
                        >
                            <button className="inline-flex justify-center items-center gap-1.5 bg-blue-800 hover:bg-blue-600 text-white font-bold p-2 rounded-lg absolute bottom-10">
                                Visit Website <ExternalLink size={14} />
                            </button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Card;
