
  
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import StaffHome from "../components/StaffHome";
import StaffProfile from "../components/StaffProfile";
import Attendance from "../components/Attendance";
import AssignedProjects from "../components/AssignedProjects";
import LeaveApplication from "../components/LeaveApplication";
import StaffTasks from "../components/StaffTasks"

import { LogOut } from "lucide-react";

const StaffDashboard = () => {
  const [activeView, setActiveView] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staff");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffId");
    localStorage.removeItem("staffRole");
    navigate("/binarylogix/staff/login");
  };

  const renderView = () => {
    switch (activeView) {
      case "Dashboard":
        return <StaffHome setActiveView={setActiveView} />;
      case "Profile":
        return <StaffProfile />;
      case "Attendance":
        return <Attendance />;
      case "Projects":
        return <AssignedProjects />;
      case "Leave":
        return <LeaveApplication />;
       case "StaffTasks":
        return <StaffTasks />;
      default:
        return <StaffHome setActiveView={setActiveView} />;   
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-1 ml-64">
        {/* Top Header with Logout */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              {activeView}
            </h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;