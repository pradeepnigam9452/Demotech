// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FileText,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Calendar,
//   User,
// } from "lucide-react";
// import Swal from "sweetalert2";

// const AdminLeaveRequests = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("All");

//   const adminToken = localStorage.getItem("adminToken");

//   const fetchLeaves = async () => {
//     try {
//       const res = await axios.get("/api/admin/leaves", {
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
//       });

//       setLeaves(res.data.data || []);
//     } catch (error) {
//       console.log("Leave request fetch error:", error);
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to fetch leave requests",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateLeaveStatus = async (leaveId, status) => {
//     const { value: adminRemark } = await Swal.fire({
//       title: `${status} leave request?`,
//       input: "textarea",
//       inputLabel: "Admin Remark",
//       inputPlaceholder: "Write remark optional...",
//       showCancelButton: true,
//       confirmButtonText: status,
//       confirmButtonColor: status === "Approved" ? "#16a34a" : "#dc2626",
//     });

//     if (adminRemark === undefined) return;

//     try {
//       await axios.put(
//         `/api/admin/leaves/${leaveId}/status`,
//         {
//           status,
//           adminRemark,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );

//       Swal.fire("Updated!", `Leave ${status.toLowerCase()} successfully.`, "success");
//       fetchLeaves();
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to update leave status",
//         "error"
//       );
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-IN");
//   };

//   const getStatusStyle = (status) => {
//     if (status === "Approved") return "bg-green-100 text-green-700";
//     if (status === "Rejected") return "bg-red-100 text-red-700";
//     return "bg-yellow-100 text-yellow-700";
//   };

//   const getStatusIcon = (status) => {
//     if (status === "Approved") return <CheckCircle size={16} />;
//     if (status === "Rejected") return <XCircle size={16} />;
//     return <Clock size={16} />;
//   };

//   const filteredLeaves =
//     filterStatus === "All"
//       ? leaves
//       : leaves.filter((leave) => leave.status === filterStatus);

//   const total = leaves.length;
//   const approved = leaves.filter((leave) => leave.status === "Approved").length;
//   const pending = leaves.filter((leave) => leave.status === "Pending").length;
//   const rejected = leaves.filter((leave) => leave.status === "Rejected").length;

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <Loader2 className="w-9 h-9 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-lg">
//           <h1 className="text-3xl font-bold flex items-center gap-3">
//             <FileText />
//             Leave Requests
//           </h1>
//           <p className="text-blue-100 mt-2">
//             View, approve, reject, and filter employee leave requests.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-4 gap-5 mb-8">
//           <div className="bg-white rounded-2xl p-5 shadow">
//             <p className="text-slate-500 text-sm">Total Requests</p>
//             <h2 className="text-3xl font-bold text-slate-800">{total}</h2>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
//             <p className="text-yellow-600 text-sm">Pending</p>
//             <h2 className="text-3xl font-bold text-yellow-700">{pending}</h2>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
//             <p className="text-green-600 text-sm">Approved</p>
//             <h2 className="text-3xl font-bold text-green-700">{approved}</h2>
//           </div>

//           <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
//             <p className="text-red-600 text-sm">Rejected</p>
//             <h2 className="text-3xl font-bold text-red-700">{rejected}</h2>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl shadow overflow-hidden">
//           <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <h2 className="text-xl font-bold text-slate-800">
//               All Leave Requests
//             </h2>

//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Requests</option>
//               <option value="Pending">Pending Requests</option>
//               <option value="Approved">Approved Requests</option>
//               <option value="Rejected">Rejected Requests</option>
//             </select>
//           </div>

//           {filteredLeaves.length === 0 ? (
//             <div className="p-10 text-center text-slate-500">
//               No leave requests found.
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {filteredLeaves.map((leave) => (
//                 <div key={leave._id} className="p-5 hover:bg-slate-50">
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
//                     <div className="flex-1">
//                       <div className="flex items-start gap-3">
//                         <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center">
//                           <User className="text-blue-600" size={21} />
//                         </div>

//                         <div>
//                           <h3 className="font-bold text-slate-800">
//                             {leave.staff?.name || "Unknown Staff"}
//                           </h3>

//                           <p className="text-sm text-slate-500">
//                             {leave.staff?.staffId || "-"} •{" "}
//                             {leave.staff?.category || "-"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="mt-4 grid md:grid-cols-2 gap-4">
//                         <div className="bg-slate-50 rounded-2xl p-4">
//                           <p className="text-xs text-slate-500">Leave Type</p>
//                           <p className="font-bold text-slate-800">
//                             {leave.leaveType}
//                           </p>
//                         </div>

//                         <div className="bg-slate-50 rounded-2xl p-4">
//                           <p className="text-xs text-slate-500">Leave Date</p>
//                           <p className="font-bold text-slate-800 flex items-center gap-1">
//                             <Calendar size={15} />
//                             {formatDate(leave.fromDate)} -{" "}
//                             {formatDate(leave.toDate)}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <p className="text-sm text-slate-500">Reason</p>
//                         <p className="text-slate-700 mt-1">{leave.reason}</p>
//                       </div>

//                       {leave.adminRemark && (
//                         <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
//                           <p className="text-xs text-indigo-500">
//                             Admin Remark
//                           </p>
//                           <p className="text-sm font-medium text-indigo-700">
//                             {leave.adminRemark}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="w-full lg:w-60 flex flex-col gap-3">
//                       <span
//                         className={`px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 ${getStatusStyle(
//                           leave.status
//                         )}`}
//                       >
//                         {getStatusIcon(leave.status)}
//                         {leave.status}
//                       </span>

//                       <select
//                         value={leave.status}
//                         onChange={(e) =>
//                           updateLeaveStatus(leave._id, e.target.value)
//                         }
//                         className="border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="Pending" disabled>
//                           Pending
//                         </option>
//                         <option value="Approved">Approve</option>
//                         <option value="Rejected">Reject</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLeaveRequests;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
} from "lucide-react";
import Swal from "sweetalert2";

const AdminLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  // const adminToken = localStorage.getItem("adminToken");
  const adminToken =  sessionStorage.getItem("adminToken");
 
  


  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/api/admin/leaves", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setLeaves(res.data.data || []);
    } catch (error) {
      console.log("Leave request fetch error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch leave requests",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    const { value: adminRemark } = await Swal.fire({
      title: `${status} leave request?`,
      input: "textarea",
      inputLabel: "Admin Remark",
      inputPlaceholder: "Write remark optional...",
      showCancelButton: true,
      confirmButtonText: status,
      confirmButtonColor: status === "Approved" ? "#16a34a" : "#dc2626",
    });

    if (adminRemark === undefined) return;

    try {
      await axios.put(
        `/api/admin/leaves/${leaveId}/status`,
        {
          status,
          adminRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      Swal.fire("Updated!", `Leave ${status.toLowerCase()} successfully.`, "success");
      fetchLeaves();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update leave status",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700 border-green-200";
    if (status === "Rejected") return "bg-red-100 text-red-700 border-red-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getStatusIcon = (status) => {
    if (status === "Approved") return <CheckCircle size={16} />;
    if (status === "Rejected") return <XCircle size={16} />;
    return <Clock size={16} />;
  };

  const filteredLeaves =
    filterStatus === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filterStatus);

  const total = leaves.length;
  const approved = leaves.filter((leave) => leave.status === "Approved").length;
  const pending = leaves.filter((leave) => leave.status === "Pending").length;
  const rejected = leaves.filter((leave) => leave.status === "Rejected").length;

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-9 h-9 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header – light card, no gradient */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            Leave Requests
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View, approve, reject, and filter employee leave requests.
          </p>
        </div>

        {/* Stats Cards – pastel with borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Total Requests</p>
            <h2 className="text-3xl font-bold text-gray-800">{total}</h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <p className="text-yellow-600 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-700">{pending}</h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-green-600 text-sm">Approved</p>
            <h2 className="text-3xl font-bold text-green-700">{approved}</h2>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-600 text-sm">Rejected</p>
            <h2 className="text-3xl font-bold text-red-700">{rejected}</h2>
          </div>
        </div>

        {/* Main List Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              All Leave Requests
            </h2>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending Requests</option>
              <option value="Approved">Approved Requests</option>
              <option value="Rejected">Rejected Requests</option>
            </select>
          </div>

          {filteredLeaves.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No leave requests found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredLeaves.map((leave) => (
                <div key={leave._id} className="p-5 hover:bg-gray-50 transition">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="text-blue-600" size={21} />
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {leave.staff?.name || "Unknown Staff"}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {leave.staff?.staffId || "-"} •{" "}
                            {leave.staff?.category || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Leave Type</p>
                          <p className="font-bold text-gray-800">
                            {leave.leaveType}
                          </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Leave Date</p>
                          <p className="font-bold text-gray-800 flex items-center gap-1">
                            <Calendar size={15} />
                            {formatDate(leave.fromDate)} -{" "}
                            {formatDate(leave.toDate)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Reason</p>
                        <p className="text-gray-700 mt-1">{leave.reason}</p>
                      </div>

                      {leave.adminRemark && (
                        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                          <p className="text-xs text-indigo-500">
                            Admin Remark
                          </p>
                          <p className="text-sm font-medium text-indigo-700">
                            {leave.adminRemark}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-60 flex flex-col gap-3">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 border ${getStatusStyle(
                          leave.status
                        )}`}
                      >
                        {getStatusIcon(leave.status)}
                        {leave.status}
                      </span>

                      <select
                        value={leave.status}
                        onChange={(e) =>
                          updateLeaveStatus(leave._id, e.target.value)
                        }
                        className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                      >
                        <option value="Pending" disabled>
                          Pending
                        </option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveRequests;