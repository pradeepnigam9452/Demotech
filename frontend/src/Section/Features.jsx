import React from 'react';
import { FaPuzzlePiece, FaBullseye, FaRocket } from 'react-icons/fa';

const Features = () => {
  const featureList = [
    {
      icon: <FaPuzzlePiece className="text-4xl text-[#016386] mb-4" />,
      title: 'Customized Solutions',
      desc: 'We design tailored solutions for your unique business to ensure enhanced efficiency and long-term success.',
    },
    {
      icon: <FaBullseye className="text-4xl text-[#016386] mb-4" />,
      title: 'Strategic Planning',
      desc: 'From roadmap creation to execution, our strategies are built to deliver growth, optimization, and measurable results.',
    },
    {
      icon: <FaRocket className="text-4xl text-[#016386] mb-4" />,
      title: 'Innovation & Technology',
      desc: 'We leverage cutting-edge technologies to drive innovation, streamline operations, and keep your business ahead of the curve.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 bg-gray-50">
      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-12 relative inline-block after:block after:w-20 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
            What We Offer
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureList.map((item, index) => (
              <div
                key={index}
                className="bg-white  p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center sm:text-left"
              >
                <div className="flex justify-center sm:justify-start">
                  {item.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-[#016386] mt-4 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
