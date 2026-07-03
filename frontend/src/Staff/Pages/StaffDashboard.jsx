import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StaffSidebar from "../components/StaffSidebar";
import StaffHome from "../components/StaffHome";
import StaffProfile from "../components/StaffProfile";
import Attendance from "../components/Attendance";
import AssignedProjects from "../components/AssignedProjects";
import LeaveApplication from "../components/LeaveApplication";
import StaffTasks from "../components/StaffTasks";

import { LogOut, LayoutDashboard } from "lucide-react";

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
    <div className="min-h-screen bg-white text-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <StaffSidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Right Content */}
        <div className="flex-1 ml-64 bg-white">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
              {/* Left Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <LayoutDashboard className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeView}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Welcome to your staff dashboard
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-1 bg-white">
            <div className="w-full rounded-2xl border border-gray-100 bg-white ">
              {renderView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;