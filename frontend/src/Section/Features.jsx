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
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center lg:w-full w-120">
          <h3 className="text-3xl sm:text-4xl font-bold mb-10 relative inline-block after:block after:w-20 after:h-1 after:bg-blue-900 after:mt-2 after:mx-auto">
            What We Offer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 text-left justify-items-center ">
            {featureList.map((item, index) => (
              <div key={index} className="p-5 rounded-xl shadow-lg hover:shadow-xl transition bg-white text-center sm:text-left">
                <div className="flex justify-center sm:justify-start">
                  {item.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-[#016386] mb-2 mt-2">
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
