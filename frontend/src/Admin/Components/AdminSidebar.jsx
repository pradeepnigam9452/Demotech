
import React, { useState, useEffect } from "react";
import {
  Home,
  FolderKanban,
  Menu,
  X,
  LogOut,
  Users,
  FileText,
  Calendar,
  ChevronRight,
  BarChart3,
  UserRound,
  ClipboardList 
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Logo from '../../../public/logo.png';

const AdminSidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) navigate("/AdminLogin");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/AdminLogin");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Updated menu items with better icons & colors
  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: Home, color: "text-blue-600" },
    { id: "Projects", label: "Projects", icon: FolderKanban, color: "text-blue-600" },
    { id: "Staff", label: "Staff", icon: UserRound , color: "text-blue-600" },
    { id: "Clients", label: "Clients", icon: Users, color: "text-blue-600" },
    { id: "Quotation", label: "Quotation", icon: FileText, color: "text-blue-600" },
     { id: "Careers", label: "Careers", icon: BarChart3, color: "text-blue-600" },
    { id: "AdminLeaveRequests", label: "LeaveRequests", icon: Calendar, color: "text-blue-600" },
    { id: "AdminSetLeave", label: "AdminSetLeave", icon: BarChart3, color: "text-blue-600" },
    { id: "AdminTaskManager", label: "Task Manager", icon: ClipboardList , color: "text-blue-600" },
    { id: "Gallery", label: "Gallery", icon: FolderKanban, color: "text-blue-600" }
    

  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - White background */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen
          bg-white
          border-r border-gray-100
          shadow-lg
          flex flex-col transition-all duration-300 ease-out
          ${collapsed ? "w-16" : "w-64"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Header with logo */}
        <div className="flex h-18 items-center justify-between px-4 border-b border-gray-100">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                closeMobileMenu();
              }}
              title={collapsed ? label : ""}
              className={`
                group relative flex items-center w-full rounded-lg px-3 py-4 text-sm font-medium
                transition-all duration-200
                ${
                  activeView === id
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {/* Active left indicator */}
              {activeView === id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-blue-600" />
              )}
              <Icon
                className={`h-5 w-5 transition-all ${
                  collapsed ? "mx-auto" : "mr-3"
                } ${activeView === id ? color : "text-gray-400 group-hover:text-gray-600"}`}
              />
              {!collapsed && (
                <span className={`${activeView === id ? "font-semibold" : ""}`}>
                  {label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse toggle button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-400 shadow-sm transition-all duration-200 hover:scale-105"
        >
          <ChevronRight
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* Logout button */}
        <div className="  mt-auto border-t border-gray-100 p-8">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-sm bg-gray-850 text-blue-700   hover:text-red-600 hover:bg-red-50 rounded-lg px-3 py-2.5 transition-all duration-200 group"
          >
            <LogOut className="mr-2 h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;