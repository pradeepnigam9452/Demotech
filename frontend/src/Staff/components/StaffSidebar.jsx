// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";

// const StaffSidebar = ({ activeView, setActiveView }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: "Dashboard", label: "Dashboard" },
//     { id: "Profile", label: "Profile" },
//     { id: "Attendance", label: "Attendance" },
//     { id: "Projects", label: "My Projects" },
//     { id: "StaffTasks", label: "StaffTasks" },
//     { id: "Leave", label: "Leave Application" },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("staffToken");
//     localStorage.removeItem("staff");
//     localStorage.removeItem("staffName");
//     localStorage.removeItem("staffId");
//     localStorage.removeItem("staffRole");
//     navigate("/binarylogix/staff/login");
//   };

//   return (
//     <div className="w-64 min-h-screen h-full bg-white border-r border-gray-100 fixed left-0 top-0 overflow-y-auto shadow-sm z-40 flex flex-col">
//       {/* Logo Section */}
//       <div className="bg-white border-b border-gray-100 p-5 sticky top-0 z-8">
//         <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
//           <img src={logo} alt="Binarylogix" className="h-10 object-contain" />
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 p-4">
//         <div className="space-y-1">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveView(item.id)}
//               className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
//                 activeView === item.id
//                   ? "bg-blue-100 text-blue-700 border border-blue-200"
//                   : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <span>{item.label}</span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default StaffSidebar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  FolderOpen,
  ListTodo,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/logo.png";

const StaffSidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Profile", label: "Profile", icon: User },
    { id: "Attendance", label: "Attendance", icon: CalendarCheck },
    { id: "Projects", label: "My Projects", icon: FolderOpen },
    { id: "StaffTasks", label: "StaffTasks", icon: ListTodo },
    { id: "Leave", label: "Leave Application", icon: FileText },
  ];

  // const handleLogout = () => {
  //   localStorage.removeItem("staffToken");
  //   localStorage.removeItem("staff");
  //   localStorage.removeItem("staffName");
  //   localStorage.removeItem("staffId");
  //   localStorage.removeItem("staffRole");
  //   navigate("/binarylogix/staff/login");
  // };

  const handleItemClick = (id) => {
    setActiveView(id);
    setIsOpen(false); // close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          w-64 min-h-screen h-full bg-white border-r border-gray-100 fixed left-0 top-0 overflow-y-auto shadow-sm z-40 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="bg-white border-b border-gray-100 p-5 sticky top-0 z-8">
          <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Binarylogix" className="h-10 object-contain" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    activeView === item.id
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button – added for better UX */}
        {/* <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div> */}
      </div>

      {/* Overlay – closes sidebar when clicking outside on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default StaffSidebar;