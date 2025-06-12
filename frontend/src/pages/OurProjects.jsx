import React from 'react';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Projects from '../Section/Projects';
import Footer from '../components/Footer';

const OurProjects = () => {
  return (
    <>
    {/* <Background/> */}
    <Navbar/>
    <Banner OnProjectSection={true}/>
    <Projects/>
    <Footer/> 
    </>
  );
};

export default OurProjects;