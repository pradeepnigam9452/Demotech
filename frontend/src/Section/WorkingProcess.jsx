import React from 'react';

const WorkingProcess = () => {
    return (
        <>
              <div className="max-w-full mx-20 px-4 sm:px-6 lg:px-8">

            <section className="max-w-full mx-auto py-10 px-4 text-center">
                <h3 className="text-4xl font-bold  mb-10 relative inline-block after:block after:w-30 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
                    Our Standard Process
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    {[
                        {
                            step: 'Define Requirements',
                            desc: 'We gather insights and define clear objectives to deliver solutions aligned with your business goals.',
                            icon: '📝',
                        },
                        {
                            step: 'Design & Prototype',
                            desc: 'Creating intuitive designs and functional prototypes that reflect your vision and ensure usability.',
                            icon: '🎨',
                        },
                        {
                            step: 'Final Solution',
                            desc: 'We implement polished, efficient solutions with full support and deployment strategy.',
                            icon: '🚀',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="h-60 relative flex-1 flex flex-col items-center text-center p-5 rounded-xl shadow-2xl hover:shadow-xl transition bg-white"
                        >
                            <div className="text-5xl mb-3">{item.icon}</div>
                            <div className="text-md font-semibold text-[#016386] mb-1">Step {i + 1}</div>
                            <h4 className="text-2xl font-bold mb-2">{item.step}</h4>
                            <p className="text-gray-600 text-base">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            </div>
        </>


    );
};

export default WorkingProcess;