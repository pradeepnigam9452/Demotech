import React, { useState, useEffect } from "react";
import {
  Home,
  GalleryVertical,
  Menu,
  X,
  LogOut,
  ProportionsIcon,
  Users,
  FileText,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  // 🔑 Sidebar Menu Items (add more here)
  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: Home },
    { id: "Projects", label: "Projects", icon: GalleryVertical },
    { id: "Clients", label: "Clients", icon: Users },
    { id: "Quotation", label: "Quotation", icon: Calendar },
    { id: "Reports", label: "Reports", icon: FileText },
  ];

  return (
    <>
      {/* Hamburger for Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
       <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md shadow-md text-gray-700  focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="hidden" />
          ) : (
            <Menu className="h-5 w-5 bg-white" />
          )}{" "}
        </button>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen
          bg-white border-r border-gray-200 shadow-lg
          flex flex-col transition-transform duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ProportionsIcon className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Admin Panel
                </span>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                closeMobileMenu();
              }}
              className={`flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeView === id
                  ? "bg-gray-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`}
          />
        </button>

        {/* Logout */}
        <div className="mt-auto border-t border-gray-200 px-4 py-3">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
          >
            <LogOut className="mr-2 h-5 w-5 text-red-500" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
