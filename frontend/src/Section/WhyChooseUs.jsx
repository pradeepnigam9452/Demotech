import React from 'react';
import { FaLightbulb, FaCogs, FaChartLine } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaLightbulb className="text-4xl text-[#016386] mb-4" />,
      title: 'Tailored Strategies',
      desc: 'Digital marketing aligned with your goals and customer behavior for maximum impact.',
    },
    {
      icon: <FaCogs className="text-4xl text-[#016386] mb-4" />,
      title: 'Cutting-Edge Technology',
      desc: 'We leverage the latest tools to keep your brand competitive and adaptive.',
    },
    {
      icon: <FaChartLine className="text-4xl text-[#016386] mb-4" />,
      title: 'Results-Driven Approach',
      desc: 'Using data-driven insights, we deliver performance that translates into growth and ROI.',
    },
  ];

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto lg:w-full w-120">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold relative inline-block after:block after:w-24 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
            Why Choose Binarylogix?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white "
            >
              <span>
                {item.icon}
                </span>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#016386] mb-2">
                {item.title}
              </h4>
              <p className="text-gray-700 text-base sm:text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
