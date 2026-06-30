import Background from "../components/Background"
import Banner from "../components/Banner"
import ClientsSlider from "../components/ClientsSlider"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AboutIntro from "../Section/AboutIntro"
import Features from "../Section/Features"
import HomeProjectSlider from "../Section/HomeProjectSlider"
import Service from "../Section/Service"
import WhyChooseUs from "../Section/WhyChooseUs"
import WorkingProcess from "../Section/WorkingProcess"
import HomeContact from '../components/HomeContact'
function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <ClientsSlider/>
      <AboutIntro />
      
      <Service limit={3} Button={true} />
      <WhyChooseUs />
      <HomeContact />
      <Footer />
    </>
  )
}

export default Home
