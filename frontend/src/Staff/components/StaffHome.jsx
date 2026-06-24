

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FolderOpen, TrendingUp, Calendar, Clock, ArrowRight } from 'lucide-react';

// const StaffHome = ({ setActiveView }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: '',
//     staffId: '',
//     role: '',
//     email: '',
//     designation: '',
//     department: '',
//   });

//   // Check authentication and load user data
//   useEffect(() => {
//     const token = localStorage.getItem('staffToken');
//     if (!token) {
//       navigate('/binarylogix/staff/login');
//       return;
//     }

//     const staffData = localStorage.getItem('staff');
//     if (staffData) {
//       try {
//         const parsed = JSON.parse(staffData);
//         setUser({
//           name: parsed.name || '',
//           staffId: parsed.staffId || '',
//           role: parsed.role || '',
//           email: parsed.email || '',
//           designation: parsed.designation || 'Staff',
//           department: parsed.department || 'Department',
         

//         });
//       } catch (e) {
//         console.error('Error parsing staff data', e);
//       }
//     } else {
//       const name = localStorage.getItem('staffName') || '';
//       const staffId = localStorage.getItem('staffId') || '';
//       const role = localStorage.getItem('staffRole') || '';
//       setUser(prev => ({ ...prev, name, staffId, role }));
//     }
//   }, [navigate]);

//   const stats = [
//     { 
//       label: "Active Projects", 
//       icon: FolderOpen, 
//       color: "bg-blue-100 text-blue-600",
//       view: "Projects",
//       description: "View all your active projects"
//     },
//     { 
//       label: "Total Tasks", 
//       icon: TrendingUp, 
//       color: "bg-purple-100 text-purple-600",
//       view: "StaffTasks",
//       description: "View all tasks"
//     }
//   ];

//   const quickActions = [
//     { 
//       name: "Mark Attendance", 
//       icon: Clock, 
//       color: "bg-blue-100 text-blue-600", 
//       view: "Attendance",
//       description: "Mark your daily attendance"
//     },
//     { 
//       name: "Apply Leave", 
//       icon: Calendar, 
//       color: "bg-purple-100 text-purple-600", 
//       view: "Leave",
//       description: "Request for leave"
//     },
//   ];

//   const handleNavigate = (view) => {
//     if (setActiveView) {
//       setActiveView(view);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
//         {/* Welcome Section */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             Welcome back, {user.name}
//           </h1>
//           <p className="text-gray-500 text-sm mt-1 flex flex-wrap items-center gap-1">
//             <span>Staff ID: {user.staffId}</span>
//             <span className="hidden xs:inline">•</span>
//             <span>Email: {user.email}</span>
             
//             {user.role && (
//               <span className="ml-2 inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-200">
//                 {user.role}
//               </span>
//             )}


//           </p>
//         </div>

//         {/* Stats Grid – no count, only icons + labels */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
//           {stats.map((stat, index) => (
//             <div 
//               key={index} 
//               onClick={() => handleNavigate(stat.view)}
//               className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-6 hover:shadow-md transition-all group cursor-pointer transform hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
//                   {/* Count removed */}
//                   <p className="text-xs text-gray-400 mt-2">
//                     {stat.description}
//                   </p>
//                 </div>
//                 <div className={`${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
//                   <stat.icon className="w-6 h-6" />
//                 </div>
//               </div>

//               <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
//                 <span className="text-xs text-blue-500 flex items-center gap-1">
//                   Click to view <ArrowRight className="w-3 h-3" />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-6 sm:mt-8 bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//             {quickActions.map((action, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleNavigate(action.view)}
//                 className="bg-white hover:shadow-sm text-gray-700 px-3 py-3 sm:px-4 sm:py-3 rounded-xl font-semibold transition-all group border border-gray-100"
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
//                     <action.icon className="w-5 h-5" />
//                   </div>
//                   <span className="text-sm">{action.name}</span>
//                   <span className="text-xs text-gray-400 text-center">
//                     {action.description}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );


  
// };

// export default StaffHome;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Briefcase,
  CheckCircle,
} from 'lucide-react';

const StaffHome = ({ setActiveView }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    staffId: '',
    role: '',
    email: '',
    designation: '',
    department: '',
  });

  // Check authentication and load user data (unchanged)
  useEffect(() => {
    const token = localStorage.getItem('staffToken');
    if (!token) {
      navigate('/binarylogix/staff/login');
      return;
    }

    const staffData = localStorage.getItem('staff');
    if (staffData) {
      try {
        const parsed = JSON.parse(staffData);
        setUser({
          name: parsed.name || '',
          staffId: parsed.staffId || '',
          role: parsed.role || '',
          email: parsed.email || '',
          designation: parsed.designation || 'Staff',
          department: parsed.department || 'Department',
        });
      } catch (e) {
        console.error('Error parsing staff data', e);
      }
    } else {
      const name = localStorage.getItem('staffName') || '';
      const staffId = localStorage.getItem('staffId') || '';
      const role = localStorage.getItem('staffRole') || '';
      setUser((prev) => ({ ...prev, name, staffId, role }));
    }
  }, [navigate]);

  // Placeholder counts – you can replace these with real data later
  const stats = [
    {
      label: 'Active Projects',
      icon: FolderOpen,
      color: 'bg-blue-100 text-blue-600',
      view: 'Projects',
      description: 'View all your active projects',
      count: 0, // Replace with actual count from API if needed
    },
    {
      label: 'Total Tasks',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      view: 'StaffTasks',
      description: 'View all tasks',
      count: 0,
    },
  ];

  const quickActions = [
    {
      name: 'Mark Attendance',
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
      view: 'Attendance',
      description: 'Mark your daily attendance',
    },
    {
      name: 'Apply Leave',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      view: 'Leave',
      description: 'Request for leave',
    },
  ];

  const handleNavigate = (view) => {
    if (setActiveView) {
      setActiveView(view);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ---- Welcome Section ---- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Welcome back, {user.name || 'Staff'}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-1">
                  <span>Staff ID: {user.staffId || 'N/A'}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Email: {user.email || 'N/A'}</span>
                  {user.role && (
                    <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200">
                      <CheckCircle className="w-3 h-3" />
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Optional: add a small status or date here */}
            <div className="text-sm text-slate-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>

        {/* ---- Stats Grid ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(stat.view)}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {stat.count}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">{stat.description}</p>
                </div>
                <div
                  className={`${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium flex items-center gap-1">
                  Click to view <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Quick Actions ---- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(action.view)}
                className="group bg-slate-50 hover:bg-white border border-slate-200/60 hover:border-indigo-300 rounded-xl p-5 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700 mt-3">
                  {action.name}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Optional footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} — Staff Dashboard
        </div>
      </div>
    </div>
  );
};

export default StaffHome;