import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminProjectManager from "./AdminProjectManager";
import ClientProjectManager from "../../Clients/ClientProjectManager";
import QuotationList from "./QuotationAdmin/QuotationList";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("Dashboard");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) navigate("/AdminLogin");
  }, [navigate]);

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen lg:ml-64 transition-all duration-300">
        <main className="p-4 pt-20 lg:pt-6">
          {activeView === "Dashboard" && (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-6">
                Welcome Admin
              </h1>
              <div className="bg-white rounded-xl shadow p-4 md:p-6">
                <p>This is the admin dashboard overview.</p>
              </div>
            </>
          )}

          {activeView === "Projects" && <AdminProjectManager />}
          {activeView === "Clients" && <ClientProjectManager />}
          {activeView === "Quotation" && <QuotationList />}

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
