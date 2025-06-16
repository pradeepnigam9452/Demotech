import React from 'react';

const WorkingProcess = () => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-10 relative inline-block after:block after:w-24 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
          Our Standard Process
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white"
            >
              <div className="text-4xl sm:text-5xl mb-3">{item.icon}</div>
              <div className="text-sm sm:text-md font-semibold text-[#016386] mb-1">
                Step {i + 1}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2">{item.step}</h4>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkingProcess;
