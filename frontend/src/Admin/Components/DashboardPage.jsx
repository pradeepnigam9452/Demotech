
// import React, { useEffect, useState } from "react";
// import { FolderKanban, Users, FileText, BarChart3, UserRound } from "lucide-react";
// import Enquiries from "./Enquries/Enquire";

// function DashboardPage({ setActiveView }) {
  
//   const [stats, setStats] = useState({
//     projects: 0,
//     clients: 0,
//     quotations: 0,
//     reports: 0,
//     staff: 0, // added staff count
//   });
  
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/dashboard/stats");
//         const data = await response.json();
//         setStats({
//           projects: data.totalProjects || 0,
//           clients: data.totalClients || 0,
//           quotations: data.totalQuotations || 0,
//           reports: data.totalReports || 0,
//           staff: data.totalStaff || 0, // assuming API returns this
//         });
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const statCards = [
//     {
//       title: "Total Projects",
//       count: stats.projects,
//       icon: FolderKanban,
//       iconBg: "bg-blue-100",
//       textColor: "text-blue-600",
//       borderColor: "bg-blue-600",
//       onClick: () => setActiveView("Projects"),
//     },
//     {
//       title: "Active Clients",
//       count: stats.clients,
//       icon: Users,
//       iconBg: "bg-indigo-100",
//       textColor: "text-indigo-600",
//       borderColor: "bg-indigo-600",
//       onClick: () => setActiveView("Clients"),
//     },
//     {
//       title: "Quotations",
//       count: stats.quotations,
//       icon: FileText,
//       iconBg: "bg-amber-100",
//       textColor: "text-amber-600",
//       borderColor: "bg-amber-600",
//       onClick: () => setActiveView("Quotation"),
//     },
//     {
//       title: "Reports",
//       count: stats.reports,
//       icon: BarChart3,
//       iconBg: "bg-emerald-100",
//       textColor: "text-emerald-600",
//       borderColor: "bg-emerald-600",
//       onClick: () => setActiveView("Reports"),
//     },
//     {
//       title: "Staff",
//       count: stats.staff,
//       icon: UserRound,
//       iconBg: "bg-purple-100",
//       textColor: "text-purple-600",
//       borderColor: "bg-purple-600",
//       onClick: () => setActiveView("Staff"),
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
//           <p className="mt-4 text-gray-500 font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       {/* Stats Cards Grid – fully responsive */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6">
//         {statCards.map((card, index) => (
//           <div
//             key={index}
//             onClick={card.onClick}
//             className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
//           >
//             <div className="p-5 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className={`${card.iconBg} rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300`}>
//                   <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.textColor}`} />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-xs sm:text-sm mb-1">{card.title}</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-gray-800">{card.count}</p>
//               </div>
//             </div>
//             <div className={`h-1 w-full ${card.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
//           </div>
//         ))}
//       </div>

//       {/* Enquiries Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <Enquiries />
//       </div>
//     </div>
//   );
// }

// export default DashboardPage; 



import React, { useEffect, useState } from "react";
import { FolderKanban, Users, FileText, BarChart3, UserRound } from "lucide-react";
import Enquiries from "./Enquries/Enquire";

function DashboardPage({ setActiveView }) {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    quotations: 0,
    reports: 0,
    staff: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        setStats({
          projects: data.totalProjects || 0,
          clients: data.totalClients || 0,
          quotations: data.totalQuotations || 0,
          reports: data.totalReports || 0,
          staff: data.totalStaff || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      icon: FolderKanban,
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "bg-blue-600",
      onClick: () => setActiveView("Projects"),
    },
    {
      title: "Active Clients",
      icon: Users,
      iconBg: "bg-indigo-100",
      textColor: "text-indigo-600",
      borderColor: "bg-indigo-600",
      onClick: () => setActiveView("Clients"),
    },
    {
      title: "Quotations",
      icon: FileText,
      iconBg: "bg-amber-100",
      textColor: "text-amber-600",
      borderColor: "bg-amber-600",
      onClick: () => setActiveView("Quotation"),
    },
    // {
    //   title: "Reports",
    //   icon: BarChart3,
    //   iconBg: "bg-emerald-100",
    //   textColor: "text-emerald-600",
    //   borderColor: "bg-emerald-600",
    //   onClick: () => setActiveView("Reports"),
    // },
    
    {
      title: "Staff",
      icon: UserRound,
      iconBg: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "bg-purple-600",
      onClick: () => setActiveView("Staff"),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Cards Grid – fully responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-0">
                <div className={`${card.iconBg} rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.textColor}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-500 text-xs sm:text-sm">{card.title}</p>
                {/* Count removed as requested */}
              </div>
            </div>
            <div className={`h-1 w-full ${card.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>

      {/* Enquiries Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Enquiries />
      </div>
    </div>
  );
}

export default DashboardPage;