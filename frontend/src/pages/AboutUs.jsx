import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import AboutIntro from '../Section/AboutIntro';
import Features from '../Section/Features';
import WorkingProcess from '../Section/WorkingProcess';
import WhyChooseUs from '../Section/WhyChooseUs';

const AboutUs = () => {

  return (
    <>
      <Background />
      <Navbar />
        <AboutIntro />
        <Features />
        <WorkingProcess />
        <WhyChooseUs />
      <Footer />
    </>
  );
};

export default AboutUs;
