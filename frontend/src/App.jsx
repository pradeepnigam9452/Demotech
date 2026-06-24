
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OurServices from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import OurProjects from "./pages/OurProjects";
import Gallery from "./pages/Gallery";
import AdminLogin from "./Admin/Components/AdminLogin";
import AdminDashboard from "./Admin/Components/AdminDashboard";
import AdminProjectManager from "./Admin/Components/AdminProjectManager";
import QuotationDetail from "./Admin/Components/QuotationAdmin/QuotationDetails";
import StaffLogin from './Staff/Pages/StaffLogin';
import StaffDashboard from './Staff/Pages/StaffDashboard'
import NotFound from "./pages/Notfound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/projects" element={<OurProjects/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/AdminProjectManager" element={<AdminProjectManager/>} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/quotation/:id" element={<QuotationDetail />} />

        <Route path="/binarylogix/staff/login" element ={<StaffLogin />} />
        <Route path="/binarylogix/staffDashboard" element ={<StaffDashboard />} />


        <Route path="*" element = {<NotFound/>} />

      </Routes>
    </Router>
  );
}

export default App;
