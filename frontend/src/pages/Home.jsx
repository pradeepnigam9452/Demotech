import Background from "../components/Background"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AboutIntro from "../Section/AboutIntro"
import Features from "../Section/Features"
import HomeProjectSlider from "../Section/HomeProjectSlider"
import Service from "../Section/Service"
import WhyChooseUs from "../Section/WhyChooseUs"
import WorkingProcess from "../Section/WorkingProcess"

function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <Banner />
      <HomeProjectSlider/>
      <AboutIntro />
      <Service limit={3} Button={true} />
      <Features />
      <WhyChooseUs />
      <Footer />
    </>
  )
}

export default Home
