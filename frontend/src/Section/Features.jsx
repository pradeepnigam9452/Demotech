import React from 'react';

const Features = () => {
    return (
        <>
              <div className="max-w-full mx-20 px-4 sm:px-6 lg:px-8">

            <section className="py-10 px-4">
                <div className="max-w-full mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-10 relative inline-block after:block after:w-30 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
                        What We Offer
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="p-5 rounded-xl shadow-lg hover:shadow-xl transition bg-white">
                            <h4 className="text-2xl font-semibold text-[#016386] mb-2">Customized Solutions</h4>
                            <p className="text-gray-600 text-lg">
                                We design tailored solutions for your unique business to ensure enhanced efficiency and long-term success.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl shadow-lg hover:shadow-xl transition bg-white">
                            <h4 className="text-2xl font-semibold text-[#016386] mb-2">Strategic Planning</h4>
                            <p className="text-gray-600 text-lg">
                                From roadmap creation to execution, our strategies are built to deliver growth, optimization, and measurable results.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl shadow-lg hover:shadow-xl transition bg-white">
                            <h4 className="text-2xl font-semibold text-[#016386] mb-2">Innovation & Technology</h4>
                            <p className="text-gray-600 text-lg">
                                We leverage cutting-edge technologies to drive innovation, streamline operations, and keep your business ahead of the curve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>
    );
};

export default Features;