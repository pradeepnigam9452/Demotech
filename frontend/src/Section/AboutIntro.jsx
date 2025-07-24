import React from 'react';

const AboutIntro = () => {
    return (
        <div className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8 ">
            <section className="max-w-[88%] mx-auto px-2 sm:px-5 py-10 grid grid-cols-1 md:grid-cols-2  items-center">
                {/* Text Content */}
                <div className="md:pr-10">
                    <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold mb-5 relative inline-block">
                        About Binarylogix
                    </h2>
                    <p>
                        With over a year of industry experience, <strong>Binarylogix Technologies LLP</strong> specializes in delivering innovative and results-driven solutions in <strong>website development, mobile application development, software development,</strong> and <strong>digital marketing.</strong>
                    </p>
                    <p>
                         We are dedicated to helping businesses grow by leveraging technology that enhances digital presence, streamlines processes, and drives real impact. Whether you need a responsive website, a custom mobile app, or a complete digital marketing strategy — we tailor every solution to your specific business goals.
                    </p>
                    <p>
                        Our team of experts focuses on quality, creativity, and performance to transform your ideas into scalable, user-friendly digital products that stand out in today’s competitive market.

                        Let Binarylogix be your trusted partner in digital transformation.
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
