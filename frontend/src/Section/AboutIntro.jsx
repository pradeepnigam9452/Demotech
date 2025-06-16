import React from 'react';

const AboutIntro = () => {
    return (
        <div className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8 ">
            <section className="max-w-[88%] mx-auto px-2 sm:px-5 py-10 grid grid-cols-1 md:grid-cols-2  items-center">
                {/* Text Content */}
                <div className="md:pr-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 relative inline-block">
                        About Binarylogix
                    </h2>
                    <p className="text-gray-700 mb-4 text-base sm:text-lg md:text-xl text-justify leading-relaxed">
                        With over 5 years of experience, Binarylogix provides innovative software development
                        and digital marketing solutions tailored to your business needs. We empower businesses
                        with technology that drives growth, streamlines operations, and elevates digital presence.
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                        Our expert team is committed to delivering customized strategies and powerful results—ensuring
                        your vision turns into scalable success.
                    </p>
                </div>

                {/* Image */}
                <div>
                    <img
                        src="/about.png"
                        alt="About Us"
                        className="rounded-xl w-full h-auto max-h-[400px] object-cover"
                    />
                </div>
            </section>
        </div>
    );
};

export default AboutIntro;
