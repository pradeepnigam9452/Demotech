import React from 'react';

const WhyChooseUs = () => {
    return (
        <>
              <div className="max-w-full px-4 sm:px-6 lg:px-8 bg-white my-10">

            <section className="py-10 px-4 mx-20">
                <div className="max-w-full mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-10 relative inline-block after:block after:w-30 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
                        Why Choose Binarylogix?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {[
                            {
                                title: 'Tailored Strategies',
                                desc: 'Digital marketing aligned with your goals and customer behavior for maximum impact.',
                            },
                            {
                                title: 'Cutting-Edge Technology',
                                desc: 'We leverage the latest tools to keep your brand competitive and adaptive.',
                            },
                            {
                                title: 'Results-Driven Approach',
                                desc: 'Using data-driven insights, we deliver performance that translates into growth and ROI.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-7 rounded-xl shadow-xl hover:shadow-2xl transition ">
                                <h4 className="text-2xl font-semibold text-[#016386] mb-2">{item.title}</h4>
                                <p className="text-gray-700 text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </div>
        </>

    );
};

export default WhyChooseUs;