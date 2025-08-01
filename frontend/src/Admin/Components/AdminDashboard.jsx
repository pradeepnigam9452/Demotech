import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminProjectManager from "./AdminProjectManager";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("Dashboard");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) navigate("/AdminLogin");
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {activeView === "Dashboard" && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-6">
              Welcome Admin
            </h1>
            <div className="bg-white rounded shadow p-4 md:p-6">
              <p>This is the admin dashboard overview.</p>
            </div>
          </>
        )}
        {activeView === "Projects" && <AdminProjectManager />}
      </div>
    </div>
  );
}

export default AdminDashboard;
