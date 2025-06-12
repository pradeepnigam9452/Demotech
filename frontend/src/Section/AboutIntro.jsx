import React from 'react';

const AboutIntro = () => {

    return (
        <>
            <div className="max-w-full bg-white py-10 px-4 sm:px-6 lg:px-8">

                <section className="max-w-full mx-20 py-10 px-5 grid md:grid-cols-2 gap-5 items-center">
                    <div className='pr-10'>
                        <h2 className="text-5xl font-extrabold mb-5 relative inline-block ">
                            About Binarylogix
                        </h2>
                        <p className="text-gray-700 mb-4 text-xl text-justify leading-relaxed">
                            With over 5 years of experience, Binarylogix provides innovative software development
                            and digital marketing solutions tailored to your business needs. We empower businesses
                            with technology that drives growth, streamlines operations, and elevates digital presence.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Our expert team is committed to delivering customized strategies and powerful results—ensuring
                            your vision turns into scalable success.
                        </p>
                    </div>
                    <img
                        src="/about.png"
                        alt="About Us"
                        className="rounded-xl w-full max-h-[400px] object-cover"
                    />
                </section>
            </div>
        </>
    );
};

export default AboutIntro;