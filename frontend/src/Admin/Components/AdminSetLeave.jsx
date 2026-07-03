
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FileText,
//   Calendar,
//   Send,
//   Loader2,
//   Users,
//   AlertTriangle,
//   Clock,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   Briefcase,
//   UserCheck,
//   CalendarDays,
// } from "lucide-react";

// const AdminSetLeave = () => {
//   const [form, setForm] = useState({
//     leaveType: "",
//     fromDate: "",
//     toDate: "",
//     reason: "",
//     status: "Approved",
//     adminRemark: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(true);
//   const [totalDays, setTotalDays] = useState(0);

//   const [stats, setStats] = useState({
//     totalLeaveEvents: 0,
//     totalEmployeesAffected: 0,
//     approvedCount: 0,
//   });

//   const [showForm, setShowForm] = useState(true); // toggle for form section

//   const adminToken = sessionStorage.getItem("adminToken");

//   // Delete handler (only for non‑past leaves)
//   const handleDeleteLeave = async (historyId, toDate) => {
//     if (new Date(toDate) < new Date()) {
//       Swal.fire(
//         "Cannot cancel",
//         "This leave has already passed and cannot be cancelled.",
//         "info"
//       );
//       return;
//     }

//     const confirm = await Swal.fire({
//       title: "Cancel this leave?",
//       text: "This will remove this leave from all employees.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, cancel it",
//       confirmButtonColor: "#dc2626",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await axios.delete(`/api/admin/set-leave/${historyId}`, {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });

//       Swal.fire("Cancelled", "Leave cancelled successfully", "success");
//       fetchHistory();
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to cancel leave",
//         "error"
//       );
//     }
//   };

//   // Compute total days
//   useEffect(() => {
//     if (form.fromDate && form.toDate) {
//       const from = new Date(form.fromDate);
//       const to = new Date(form.toDate);
//       if (from && to && !isNaN(from) && !isNaN(to) && to >= from) {
//         const diffTime = Math.abs(to - from);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//         setTotalDays(diffDays);
//       } else {
//         setTotalDays(0);
//       }
//     } else {
//       setTotalDays(0);
//     }
//   }, [form.fromDate, form.toDate]);

//   const computeStats = (data) => {
//     const totalLeaveEvents = data.length;
//     const totalEmployeesAffected = data.reduce(
//       (sum, item) => sum + (item.totalEmployees || 0),
//       0
//     );
//     const approvedCount = data.filter(
//       (item) => item.status === "Approved"
//     ).length;
//     return { totalLeaveEvents, totalEmployeesAffected, approvedCount };
//   };

//   const fetchHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await axios.get("/api/admin/set-leave/stats", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });

//       const responseData = res.data.data || res.data;
//       const historyData = responseData.history || responseData || [];
//       setHistory(historyData);

//       if (responseData.stats) {
//         setStats(responseData.stats);
//       } else {
//         setStats(computeStats(historyData));
//       }
//     } catch (error) {
//       console.error("History fetch error:", error);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const confirm = await Swal.fire({
//       title: "Assign leave to all employees?",
//       text: "This leave will be added for all active employees.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, assign to all",
//       confirmButtonColor: "#2563eb",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       setLoading(true);

//       const res = await axios.post("/api/admin/set-leave", form, {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });

//       Swal.fire(
//         "Success",
//         res.data.message || "Leave assigned successfully",
//         "success"
//       );

//       setForm({
//         leaveType: "",
//         fromDate: "",
//         toDate: "",
//         reason: "",
//         status: "Approved",
//         adminRemark: "",
//       });

//       fetchHistory();
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to assign leave",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-IN");
//   };

//   const getStatusBadge = (status, isPast) => {
//     if (isPast) {
//       return (
//         <span className="px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 bg-gray-100 text-gray-600 border-gray-300">
//           <Clock size={14} />
//           Expired
//         </span>
//       );
//     }

//     const styles = {
//       Approved: "bg-green-100 text-green-700 border-green-200",
//       Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
//       Rejected: "bg-red-100 text-red-700 border-red-200",
//     };
//     const Icon = {
//       Approved: <CheckCircle size={14} />,
//       Pending: <Clock size={14} />,
//       Rejected: <XCircle size={14} />,
//     };
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${
//           styles[status] || styles.Pending
//         }`}
//       >
//         {Icon[status]}
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative overflow-hidden bg-white rounded-2xl p-7 mb-8 shadow-sm border border-gray-100/80"
//         >
//           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
//           <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   All Leave Assignment
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Assign leave to all active employees at once.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 text-sm">
//               <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full">
//                 <Briefcase size={14} />
//                 {stats.totalLeaveEvents} Total
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Warning Alert */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.05 }}
//           className="bg-amber-50 border border-amber-200/70 rounded-2xl p-5 mb-6 flex gap-3 items-start"
//         >
//           <AlertTriangle className="text-amber-600 w-6 h-6 shrink-0 mt-0.5" />
//           <div>
//             <h3 className="font-bold text-amber-800">Important</h3>
//             <p className="text-sm text-amber-700">
//               This action will create leave records for every active employee.
//               Please check the dates carefully before submitting.
//             </p>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
//         >
//           <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Leave Events</p>
//                 <h2 className="text-3xl font-bold text-blue-600 mt-1">
//                   {stats.totalLeaveEvents}
//                 </h2>
//               </div>
//               <div className="bg-blue-50 p-3 rounded-xl">
//                 <CalendarDays className="text-blue-500" size={22} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Employees Affected</p>
//                 <h2 className="text-3xl font-bold text-green-600 mt-1">
//                   {stats.totalEmployeesAffected}
//                 </h2>
//               </div>
//               <div className="bg-green-50 p-3 rounded-xl">
//                 <UserCheck className="text-green-500" size={22} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Approved Events</p>
//                 <h2 className="text-3xl font-bold text-amber-600 mt-1">
//                   {stats.approvedCount}
//                 </h2>
//               </div>
//               <div className="bg-amber-50 p-3 rounded-xl">
//                 <CheckCircle className="text-amber-500" size={22} />
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Form Card – Collapsible */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden mb-8"
//         >
//           {/* Clickable Heading */}
//           <div
//             className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition"
//             onClick={() => setShowForm(!showForm)}
//           >
//             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//               <FileText className="text-blue-500" />
//               Assign Leave Details
//             </h2>
//             <button className="text-gray-400 hover:text-gray-600 transition">
//               {showForm ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
//             </button>
//           </div>

//           <AnimatePresence>
//             {showForm && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="overflow-hidden"
//               >
//                 <div className="p-6 pt-0 border-t border-gray-100">
//                   <form onSubmit={handleSubmit} className="space-y-5">
//                    {/* Right‑aligned form fields */}
// <div className="flex justify-start">
//   <div className="w-full md:w-1/2 lg:w-1/3">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="text-sm font-semibold text-gray-600">
//           Leave Type
//         </label>
//         <select
//           name="leaveType"
//           value={form.leaveType}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
//         >
          
//           <option value="">Select Leave Type</option>
//           <option value="Work from Home">Work from Home</option>
//           <option value="Casual Leave">Casual Leave</option>
//           <option value="Sick Leave">Sick Leave</option>
//           <option value="Emergency Leave">Emergency Leave</option>
//           <option value="Paid Leave">Paid Leave</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       <div>
//         <label className="text-sm font-semibold text-gray-600">
//           From Date
//         </label>
//         <input
//           type="date"
//           name="fromDate"
//           value={form.fromDate}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
//         />
//       </div>

//       <div className="md:col-span-2">
//         <label className="text-sm font-semibold text-gray-600">
//           To Date
//         </label>
//         <input
//           type="date"
//           name="toDate"
//           value={form.toDate}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
//         />
//       </div>
//     </div>
//   </div>
// </div>

//                     {/* Total Days */}
//                     <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-50/70 border border-blue-200 rounded-xl px-4 py-2.5 w-fit">
//                       <Calendar className="w-4 h-4 text-blue-500" />
//                       <span>
//                         Total Days:{" "}
//                         <span className="font-bold text-blue-700">
//                           {totalDays > 0 ? totalDays : "—"}
//                         </span>
//                       </span>
//                     </div>

//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">
//                         Reason
//                       </label>
//                       <textarea
//                         name="reason"
//                         value={form.reason}
//                         onChange={handleChange}
//                         required
//                         rows="4"
//                         placeholder="Example: Company holiday / Office closed / Festival leave"
//                         className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 resize-none text-gray-700 bg-white shadow-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">
//                         Admin Remark
//                       </label>
//                       <textarea
//                         name="adminRemark"
//                         value={form.adminRemark}
//                         onChange={handleChange}
//                         rows="3"
//                         placeholder="Optional remark shown to employees"
//                         className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 resize-none text-gray-700 bg-white shadow-sm"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           Assigning...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-5 h-5" />
//                           Assign Leave to All
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* History Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden"
//         >
//           <div className="p-6 border-b border-gray-100 flex items-center gap-2">
//             <Clock className="w-5 h-5 text-blue-500" />
//             <h2 className="text-xl font-bold text-gray-800">
//               Assigned Leave History
//             </h2>
//           </div>

//           {historyLoading ? (
//             <div className="p-12 flex justify-center">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
//             </div>
//           ) : history.length === 0 ? (
//             <div className="p-16 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-300 mb-4">
//                 <FileText size={28} />
//               </div>
//               <p className="text-gray-500 font-medium">No bulk leave assignments found.</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-100">
//               {history.map((item) => {
//                 const isPast = new Date(item.toDate) < new Date();
//                 return (
//                   <div key={item._id} className="p-5 hover:bg-blue-50/30 transition">
//                     <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                             <Users className="w-5 h-5 text-blue-600" />
//                           </div>
//                           <div>
//                             <h3 className="font-bold text-gray-800">
//                               {item.leaveType}
//                             </h3>
//                             <p className="text-sm text-gray-500 flex items-center gap-1">
//                               <Calendar size={14} />
//                               {formatDate(item.fromDate)} — {formatDate(item.toDate)}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mt-3 grid sm:grid-cols-2 gap-3">
//                           <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
//                             <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
//                               Reason
//                             </p>
//                             <p className="text-sm font-medium text-gray-700 mt-0.5">
//                               {item.reason}
//                             </p>
//                           </div>
//                           <div className="bg-gradient-to-br from-amber-50 to-yellow-50/80 border border-amber-200/70 rounded-xl p-3 shadow-sm transition-all hover:shadow-md">
//                             <div className="flex items-start space-x-2">
//                               <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
//                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                                 </svg>
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Admin Remark</p>
//                                 <p className="mt-0.5 text-sm font-medium text-gray-800 break-words leading-relaxed">
//                                   {item.adminRemark || <span className="text-gray-400 font-normal italic">No remarks</span>}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-2">
//                         {getStatusBadge(item.status, isPast)}
//                         <span className="text-xs text-gray-400">
//                           Created: {formatDate(item.createdAt)}
//                         </span>
//                       </div>

//                       {isPast ? (
//                         <span className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 text-xs font-semibold inline-block">
//                           Past
//                         </span>
//                       ) : (
//                         <button
//                           onClick={() => handleDeleteLeave(item._id, item.toDate)}
//                           className="px-4 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 transition"
//                         >
//                           Cancel Leave
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AdminSetLeave;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calendar,
  Send,
  Loader2,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Briefcase,
  UserCheck,
  CalendarDays,
} from "lucide-react";

const AdminSetLeave = () => {
  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Approved",
    adminRemark: "",
  });

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [totalDays, setTotalDays] = useState(0);

  const [stats, setStats] = useState({
    totalLeaveEvents: 0,
    totalEmployeesAffected: 0,
    approvedCount: 0,
  });

  const [showForm, setShowForm] = useState(true);

  const adminToken = sessionStorage.getItem("adminToken");

  const handleDeleteLeave = async (historyId, toDate) => {
    if (new Date(toDate) < new Date()) {
      Swal.fire(
        "Cannot cancel",
        "This leave has already passed and cannot be cancelled.",
        "info"
      );
      return;
    }

    const confirm = await Swal.fire({
      title: "Cancel this leave?",
      text: "This will remove this leave from all employees.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/api/admin/set-leave/${historyId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      Swal.fire("Cancelled", "Leave cancelled successfully", "success");
      fetchHistory();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to cancel leave",
        "error"
      );
    }
  };

  useEffect(() => {
    if (form.fromDate && form.toDate) {
      const from = new Date(form.fromDate);
      const to = new Date(form.toDate);
      if (from && to && !isNaN(from) && !isNaN(to) && to >= from) {
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(diffDays);
      } else {
        setTotalDays(0);
      }
    } else {
      setTotalDays(0);
    }
  }, [form.fromDate, form.toDate]);

  const computeStats = (data) => {
    const totalLeaveEvents = data.length;
    const totalEmployeesAffected = data.reduce(
      (sum, item) => sum + (item.totalEmployees || 0),
      0
    );
    const approvedCount = data.filter(
      (item) => item.status === "Approved"
    ).length;
    return { totalLeaveEvents, totalEmployeesAffected, approvedCount };
  };

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await axios.get("/api/admin/set-leave/stats", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const responseData = res.data.data || res.data;
      const historyData = responseData.history || responseData || [];
      setHistory(historyData);

      if (responseData.stats) {
        setStats(responseData.stats);
      } else {
        setStats(computeStats(historyData));
      }
    } catch (error) {
      console.error("History fetch error:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Assign leave to all employees?",
      text: "This leave will be added for all active employees.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, assign to all",
      confirmButtonColor: "#2563eb",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/admin/set-leave", form, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      Swal.fire(
        "Success",
        res.data.message || "Leave assigned successfully",
        "success"
      );

      setForm({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
        status: "Approved",
        adminRemark: "",
      });

      fetchHistory();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to assign leave",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getStatusBadge = (status, isPast) => {
    if (isPast) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 bg-gray-100 text-gray-600 border-gray-300">
          <Clock size={14} />
          Expired
        </span>
      );
    }

    const styles = {
      Approved: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Rejected: "bg-red-100 text-red-700 border-red-200",
    };
    const Icon = {
      Approved: <CheckCircle size={14} />,
      Pending: <Clock size={14} />,
      Rejected: <XCircle size={14} />,
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${
          styles[status] || styles.Pending
        }`}
      >
        {Icon[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white rounded-2xl p-7 mb-8 shadow-sm border border-gray-100/80"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  All Leave Assignment
                </h1>
                <p className="text-gray-500 text-sm">
                  Assign leave to all active employees at once.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full">
                <Briefcase size={14} />
                {stats.totalLeaveEvents} Total
              </span>
            </div>
          </div>
        </motion.div>

        {/* Warning Alert */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-amber-50 border border-amber-200/70 rounded-2xl p-5 mb-6 flex gap-3 items-start"
        >
          <AlertTriangle className="text-amber-600 w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-800">Important</h3>
            <p className="text-sm text-amber-700">
              This action will create leave records for every active employee.
              Please check the dates carefully before submitting.
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Leave Events</p>
                <h2 className="text-3xl font-bold text-blue-600 mt-1">
                  {stats.totalLeaveEvents}
                </h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <CalendarDays className="text-blue-500" size={22} />
              </div>
            </div>
          </div>

          

          <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved Events</p>
                <h2 className="text-3xl font-bold text-amber-600 mt-1">
                  {stats.approvedCount}
                </h2>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl">
                <CheckCircle className="text-amber-500" size={22} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Card – Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden mb-8"
        >
          <div
            className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition"
            onClick={() => setShowForm(!showForm)}
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-blue-500" />
              Assign Leave Details
            </h2>
            <button className="text-gray-400 hover:text-gray-600 transition">
              {showForm ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Left‑aligned compact form fields */}
                    <div className="flex justify-start">
                      <div className="w-full md:w-1/2 lg:w-1/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-gray-600">
                              Leave Type
                            </label>
                            <select
                              name="leaveType"
                              value={form.leaveType}
                              onChange={handleChange}
                              required
                              className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
                            >
                              <option value="">Select Leave Type</option>
                              <option value="Work from Home">Work from Home</option>
                              <option value="Casual Leave">Casual Leave</option>
                              <option value="Sick Leave">Sick Leave</option>
                              <option value="Emergency Leave">Emergency Leave</option>
                              <option value="Paid Leave">Paid Leave</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-gray-600">
                              From Date
                            </label>
                            <input
                              type="date"
                              name="fromDate"
                              value={form.fromDate}
                              onChange={handleChange}
                              required
                              className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-600">
                              To Date
                            </label>
                            <input
                              type="date"
                              name="toDate"
                              value={form.toDate}
                              onChange={handleChange}
                              required
                              className="w-full mt-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Days */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-50/70 border border-blue-200 rounded-xl px-4 py-2.5 w-fit">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>
                        Total Days:{" "}
                        <span className="font-bold text-blue-700">
                          {totalDays > 0 ? totalDays : "—"}
                        </span>
                      </span>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Reason
                      </label>
                      <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Example: Company holiday / Office closed / Festival leave"
                        className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 resize-none text-gray-700 bg-white shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Admin Remark
                      </label>
                      <textarea
                        name="adminRemark"
                        value={form.adminRemark}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Optional remark shown to employees"
                        className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 resize-none text-gray-700 bg-white shadow-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Assigning...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Assign Leave to All
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">
              Assigned Leave History
            </h2>
          </div>

          {historyLoading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : history.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-300 mb-4">
                <FileText size={28} />
              </div>
              <p className="text-gray-500 font-medium">No bulk leave assignments found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((item) => {
                const isPast = new Date(item.toDate) < new Date();
                return (
                  <div key={item._id} className="p-5 hover:bg-blue-50/30 transition">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {item.leaveType}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(item.fromDate)} — {formatDate(item.toDate)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid sm:grid-cols-2 gap-3">
                          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                              Reason
                            </p>
                            <p className="text-sm font-medium text-gray-700 mt-0.5">
                              {item.reason}
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-yellow-50/80 border border-amber-200/70 rounded-xl p-3 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-start space-x-2">
                              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Admin Remark</p>
                                <p className="mt-0.5 text-sm font-medium text-gray-800 break-words leading-relaxed">
                                  {item.adminRemark || <span className="text-gray-400 font-normal italic">No remarks</span>}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2">
                        {getStatusBadge(item.status, isPast)}
                        <span className="text-xs text-gray-400">
                          Created: {formatDate(item.createdAt)}
                        </span>
                      </div>

                      {isPast ? (
                        <span className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 text-xs font-semibold inline-block">
                          Past
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDeleteLeave(item._id, item.toDate)}
                          className="px-4 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 transition"
                        >
                          Cancel Leave
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSetLeave;