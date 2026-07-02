import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminProjectManager from "./AdminProjectManager";
import ClientProjectManager from "../../Clients/ClientProjectManager";
import QuotationList from "./QuotationAdmin/QuotationList";
import AdminNavbar from "./AdminNavbar";
import DashboardPage from "./DashboardPage";
import AdminStaff from "./AdminStaff";
import Reports from "./Reports";
import AdminLeaveRequests from "./AdminLeaveRequests";
import AdminSetLeave from './AdminSetLeave'
import AdminCareerPage from './AdminCareerPage';
import AdminTaskManager from "./AdminTaskManager";
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("Dashboard");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) navigate("/AdminLogin");
  }, [navigate]);


// ✅ Reload ke baad last active tab restore karna
useEffect(() => {
  const savedView = sessionStorage.getItem("activeView");
  if (savedView) {
    setActiveView(savedView);   // agar kuch save hai to wahi open hoga
  } else {
    setActiveView("Dashboard"); // first time ya sessionStorage empty ho
  }
}, []);

  // ✅ Jab bhi activeView change ho, usko sessionStorage me save karna
useEffect(() => {
  const timer = setTimeout(() => {
    sessionStorage.setItem("activeView", activeView);
  }, 500); // 500ms delay

  return () => clearTimeout(timer); // cleanup on unmount or state change
}, [activeView]);


  return (
    <div className="flex bg-gray-100">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 min-h-screen lg:ml-64 transition-all duration-300">
        <AdminNavbar />
        <main className="p-4 pt-20 lg:pt-6">
          {activeView === "Dashboard" && <DashboardPage setActiveView={setActiveView} />}
          {activeView === "Projects" && <AdminProjectManager />}
          {activeView === "Staff" && <AdminStaff />}
          {activeView === "Clients" && <ClientProjectManager />}
          {activeView === "Quotation" && <QuotationList />}
          {activeView === "Reports" && <Reports />}
          {activeView=== "AdminLeaveRequests" && <AdminLeaveRequests />}
          {activeView=== "AdminSetLeave" && <AdminSetLeave />}
          {activeView=== "Careers" && <AdminCareerPage />}
          {activeView=== "AdminTaskManager" && <AdminTaskManager />}
           
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
