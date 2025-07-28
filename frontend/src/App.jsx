
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OurServices from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import OurProjects from "./pages/OurProjects";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/projects" element={<OurProjects/>} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
