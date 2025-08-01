import React, { useState, useEffect } from "react";
import {
  Home,
  GalleryVertical,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
  GraduationCap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({ Projects: false });

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) navigate("/AdminLogin");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/AdminLogin");
  };

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 shadow-lg transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        h-screen overflow-y-auto lg:static`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Link to="/">
              <img src="GraduationCap"  className="h-5 w-5" />
              
              </Link>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">PortFolio Admin</span>
                <span className="text-xs text-gray-500">Dashboard</span>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-2 px-3">
          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveView("Dashboard");
                closeMobileMenu();
              }}
              className={`flex items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeView === "Dashboard"
                  ? "bg-gray-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
              {!collapsed && <span>Dashboard</span>}
            </button>

            <div>
              <button
                onClick={() => toggleMenu("Projects")}
                className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 text-gray-700"
              >
                <GalleryVertical className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">Projects</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openMenus["Projects"] ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </button>
              {!collapsed && openMenus["Projects"] && (
                <div className="mt-1 space-y-1 pl-10">
                  <button
                    onClick={() => {
                      setActiveView("Projects");
                      closeMobileMenu();
                    }}
                    className={`block w-full rounded-md py-2 text-left text-sm transition-colors ${
                      activeView === "Projects"
                        ? "text-blue-600 bg-gray-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    Projects
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </button>

        {/* Logout Button */}
        <div className="mt-auto border-t border-gray-200 px-4 py-3">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
