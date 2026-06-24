

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Swal from "sweetalert2";
// // // import {
// // //   FileText,
// // //   Calendar,
// // //   Send,
// // //   Loader2,
// // //   Users,
// // //   AlertTriangle,
// // //   Clock,
// // //   CheckCircle,
// // //   XCircle,
// // //   User,
// // // } from "lucide-react";

// // // const AdminSetLeave = () => {
// // //   const [form, setForm] = useState({
// // //     leaveType: "",
// // //     fromDate: "",
// // //     toDate: "",
// // //     reason: "",
// // //     status: "Approved",
// // //     adminRemark: "",
// // //   });

// // //   const [loading, setLoading] = useState(false);
// // //   const [history, setHistory] = useState([]);
// // //   const [historyLoading, setHistoryLoading] = useState(true);

// // //   const adminToken = localStorage.getItem("adminToken");

// // //   // Fetch bulk leave history
// // //   const fetchHistory = async () => {
// // //     try {
// // //       const res = await axios.get("/api/admin/set-leave/history", {
// // //         headers: {
// // //           Authorization: `Bearer ${adminToken}`,
// // //         },
// // //       });
// // //       setHistory(res.data.data || []);
// // //     } catch (error) {
// // //       console.log("History fetch error:", error);
// // //       // Optionally show error
// // //     } finally {
// // //       setHistoryLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchHistory();
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     const confirm = await Swal.fire({
// // //       title: "Assign leave to all employees?",
// // //       text: "This leave will be added for all active employees.",
// // //       icon: "warning",
// // //       showCancelButton: true,
// // //       confirmButtonText: "Yes, assign to all",
// // //       confirmButtonColor: "#2563eb",
// // //     });

// // //     if (!confirm.isConfirmed) return;

// // //     try {
// // //       setLoading(true);

// // //       const res = await axios.post("/api/admin/set-leave", form, {
// // //         headers: {
// // //           Authorization: `Bearer ${adminToken}`,
// // //         },
// // //       });

// // //       Swal.fire(
// // //         "Success",
// // //         res.data.message || "Leave assigned successfully",
// // //         "success"
// // //       );

// // //       setForm({
// // //         leaveType: "",
// // //         fromDate: "",
// // //         toDate: "",
// // //         reason: "",
// // //         status: "Approved",
// // //         adminRemark: "",
// // //       });

// // //       // Refresh history after assignment
// // //       fetchHistory();
// // //     } catch (error) {
// // //       Swal.fire(
// // //         "Error",
// // //         error.response?.data?.message || "Failed to assign leave",
// // //         "error"
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const formatDate = (date) => {
// // //     if (!date) return "-";
// // //     return new Date(date).toLocaleDateString("en-IN");
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const styles = {
// // //       Approved: "bg-green-100 text-green-700 border-green-200",
// // //       Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
// // //       Rejected: "bg-red-100 text-red-700 border-red-200",
// // //     };
// // //     const Icon = {
// // //       Approved: <CheckCircle size={14} />,
// // //       Pending: <Clock size={14} />,
// // //       Rejected: <XCircle size={14} />,
// // //     };
// // //     return (
// // //       <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${styles[status] || styles.Pending}`}>
// // //         {Icon[status]}
// // //         {status}
// // //       </span>
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Header – light card */}
// // //         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
// // //           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //             <Users className="w-6 h-6 text-blue-500" />
// // //             All Leave Assignment
// // //           </h1>
// // //           <p className="text-gray-500 text-sm mt-1">
// // //             Assign leave to all active employees at once.
// // //           </p>
// // //         </div>

// // //         {/* Warning Alert – pastel yellow */}
// // //         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
// // //           <AlertTriangle className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
// // //           <div>
// // //             <h3 className="font-bold text-yellow-800">Important</h3>
// // //             <p className="text-sm text-yellow-700">
// // //               This action will create leave records for every active employee.
// // //               Please check the dates carefully before submitting.
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Form Card */}
// // //         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
// // //           <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
// // //             <FileText className="text-blue-500" />
// // //             Leave Details
// // //           </h2>

// // //           <form onSubmit={handleSubmit} className="space-y-5">
// // //             <div className="grid md:grid-cols-2 gap-5">
// // //               <div>
// // //                 <label className="text-sm font-semibold text-gray-600">
// // //                   Leave Type
// // //                 </label>
// // //                 <select
// // //                   name="leaveType"
// // //                   value={form.leaveType}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// // //                 >
// // //                   <option value="">Select Leave Type</option>
// // //                   <option value="Casual Leave">Casual Leave</option>
// // //                   <option value="Sick Leave">Sick Leave</option>
// // //                   <option value="Emergency Leave">Emergency Leave</option>
// // //                   <option value="Paid Leave">Paid Leave</option>
// // //                   <option value="Other">Other</option>
// // //                 </select>
// // //               </div>

// // //               <div>
// // //                 <label className="text-sm font-semibold text-gray-600">
// // //                   Status
// // //                 </label>
// // //                 <select
// // //                   name="status"
// // //                   value={form.status}
// // //                   onChange={handleChange}
// // //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// // //                 >
// // //                   <option value="Approved">Approved</option>
// // //                   <option value="Pending">Pending</option>
// // //                   <option value="Rejected">Rejected</option>
// // //                 </select>
// // //               </div>

// // //               <div>
// // //                 <label className="text-sm font-semibold text-gray-600">
// // //                   From Date
// // //                 </label>
// // //                 <input
// // //                   type="date"
// // //                   name="fromDate"
// // //                   value={form.fromDate}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="text-sm font-semibold text-gray-600">
// // //                   To Date
// // //                 </label>
// // //                 <input
// // //                   type="date"
// // //                   name="toDate"
// // //                   value={form.toDate}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="text-sm font-semibold text-gray-600">
// // //                 Reason
// // //               </label>
// // //               <textarea
// // //                 name="reason"
// // //                 value={form.reason}
// // //                 onChange={handleChange}
// // //                 required
// // //                 rows="4"
// // //                 placeholder="Example: Company holiday / Office closed / Festival leave"
// // //                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="text-sm font-semibold text-gray-600">
// // //                 Admin Remark
// // //               </label>
// // //               <textarea
// // //                 name="adminRemark"
// // //                 value={form.adminRemark}
// // //                 onChange={handleChange}
// // //                 rows="3"
// // //                 placeholder="Optional remark shown to employees"
// // //                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
// // //               />
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full md:w-auto bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
// // //             >
// // //               {loading ? (
// // //                 <>
// // //                   <Loader2 className="w-5 h-5 animate-spin" />
// // //                   Assigning...
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <Send className="w-5 h-5" />
// // //                   Assign Leave to All
// // //                 </>
// // //               )}
// // //             </button>
// // //           </form>
// // //         </div>

// // //         {/* History Section */}
// // //         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
// // //           <div className="p-6 border-b border-gray-100">
// // //             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // //               <Clock className="w-5 h-5 text-blue-500" />
// // //               Assigned Leave History
// // //             </h2>
// // //           </div>

// // //           {historyLoading ? (
// // //             <div className="p-10 flex justify-center">
// // //               <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
// // //             </div>
// // //           ) : history.length === 0 ? (
// // //             <div className="p-10 text-center text-gray-500">
// // //               No bulk leave assignments found.
// // //             </div>
// // //           ) : (
// // //             <div className="divide-y divide-gray-100">
// // //               {history.map((item) => (
// // //                 <div key={item._id} className="p-5 hover:bg-gray-50 transition">
// // //                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
// // //                     <div className="flex-1">
// // //                       <div className="flex items-center gap-3">
// // //                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
// // //                           <Users className="w-5 h-5 text-blue-600" />
// // //                         </div>
// // //                         <div>
// // //                           <h3 className="font-bold text-gray-800">
// // //                             {item.leaveType}
// // //                           </h3>
// // //                           <p className="text-sm text-gray-500 flex items-center gap-1">
// // //                             <Calendar size={14} />
// // //                             {formatDate(item.fromDate)} - {formatDate(item.toDate)}
// // //                           </p>
// // //                         </div>
// // //                       </div>

// // //                       <div className="mt-3 grid sm:grid-cols-2 gap-3">
// // //                         <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
// // //                           <p className="text-xs text-gray-500">Reason</p>
// // //                           <p className="text-sm font-medium text-gray-700">
// // //                             {item.reason}
// // //                           </p>
// // //                         </div>
// // //                         <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
// // //                           <p className="text-xs text-gray-500">Admin Remark</p>
// // //                           <p className="text-sm font-medium text-gray-700">
// // //                             {item.adminRemark || "—"}
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex flex-col items-start gap-2">
// // //                       {getStatusBadge(item.status)}
// // //                       <span className="text-xs text-gray-400">
// // //                         Created: {formatDate(item.createdAt)}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminSetLeave;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import {
// //   FileText,
// //   Calendar,
// //   Send,
// //   Loader2,
// //   Users,
// //   AlertTriangle,
// //   Clock,
// //   CheckCircle,
// //   XCircle,
// // } from "lucide-react";

// // const AdminSetLeave = () => {
// //   const [form, setForm] = useState({
// //     leaveType: "",
// //     fromDate: "",
// //     toDate: "",
// //     reason: "",
// //     status: "Approved",
// //     adminRemark: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [history, setHistory] = useState([]);
// //   const [historyLoading, setHistoryLoading] = useState(true);

// //   // Stats from backend (if provided)
// //   const [stats, setStats] = useState({
// //     totalLeaveEvents: 0,
// //     totalEmployeesAffected: 0,
// //     approvedCount: 0,
// //   });

// //   const adminToken = localStorage.getItem("adminToken");

// //   // Compute fallback stats from history if backend doesn't send them
// //   const computeStats = (data) => {
// //     const totalLeaveEvents = data.length;
// //     const totalEmployeesAffected = data.reduce(
// //       (sum, item) => sum + (item.totalEmployees || 0),
// //       0
// //     );
// //     const approvedCount = data.filter(
// //       (item) => item.status === "Approved"
// //     ).length;
// //     return { totalLeaveEvents, totalEmployeesAffected, approvedCount };
// //   };

// //   // Fetch history (and stats) from the new endpoint
// //   const fetchHistory = async () => {
// //     try {
// //       setHistoryLoading(true);
// //       const res = await axios.get("/api/admin/set-leave/stats", {
// //         headers: {
// //           Authorization: `Bearer ${adminToken}`,
// //         },
// //       });

// //       // Adjust according to your actual response structure
// //       const responseData = res.data.data || res.data;
// //       const historyData = responseData.history || responseData || [];
// //       setHistory(historyData);

// //       // If backend provides stats, use them; otherwise compute from history
// //       if (responseData.stats) {
// //         setStats(responseData.stats);
// //       } else {
// //         setStats(computeStats(historyData));
// //       }
// //     } catch (error) {
// //       console.error("History fetch error:", error);
// //       // Optionally show a toast
// //     } finally {
// //       setHistoryLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const confirm = await Swal.fire({
// //       title: "Assign leave to all employees?",
// //       text: "This leave will be added for all active employees.",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Yes, assign to all",
// //       confirmButtonColor: "#2563eb",
// //     });

// //     if (!confirm.isConfirmed) return;

// //     try {
// //       setLoading(true);

// //       const res = await axios.post("/api/admin/set-leave", form, {
// //         headers: {
// //           Authorization: `Bearer ${adminToken}`,
// //         },
// //       });

// //       Swal.fire(
// //         "Success",
// //         res.data.message || "Leave assigned successfully",
// //         "success"
// //       );

// //       setForm({
// //         leaveType: "",
// //         fromDate: "",
// //         toDate: "",
// //         reason: "",
// //         status: "Approved",
// //         adminRemark: "",
// //       });

// //       // Refresh history after assignment
// //       fetchHistory();
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error.response?.data?.message || "Failed to assign leave",
// //         "error"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formatDate = (date) => {
// //     if (!date) return "-";
// //     return new Date(date).toLocaleDateString("en-IN");
// //   };

// //   const getStatusBadge = (status) => {
// //     const styles = {
// //       Approved: "bg-green-100 text-green-700 border-green-200",
// //       Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
// //       Rejected: "bg-red-100 text-red-700 border-red-200",
// //     };
// //     const Icon = {
// //       Approved: <CheckCircle size={14} />,
// //       Pending: <Clock size={14} />,
// //       Rejected: <XCircle size={14} />,
// //     };
// //     return (
// //       <span
// //         className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${
// //           styles[status] || styles.Pending
// //         }`}
// //       >
// //         {Icon[status]}
// //         {status}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
// //           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// //             <Users className="w-6 h-6 text-blue-500" />
// //             All Leave Assignment
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">
// //             Assign leave to all active employees at once.
// //           </p>
// //         </div>

// //         {/* Warning Alert */}
// //         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
// //           <AlertTriangle className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
// //           <div>
// //             <h3 className="font-bold text-yellow-800">Important</h3>
// //             <p className="text-sm text-yellow-700">
// //               This action will create leave records for every active employee.
// //               Please check the dates carefully before submitting.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Form Card */}
// //         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
// //           <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
// //             <FileText className="text-blue-500" />
// //             Leave Details
// //           </h2>

// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             <div className="grid md:grid-cols-2 gap-5">
// //               <div>
// //                 <label className="text-sm font-semibold text-gray-600">
// //                   Leave Type
// //                 </label>
// //                 <select
// //                   name="leaveType"
// //                   value={form.leaveType}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// //                 >
// //                   <option value="">Select Leave Type</option>
// //                   <option value="Casual Leave">Casual Leave</option>
// //                   <option value="Sick Leave">Sick Leave</option>
// //                   <option value="Emergency Leave">Emergency Leave</option>
// //                   <option value="Paid Leave">Paid Leave</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="text-sm font-semibold text-gray-600">
// //                   From Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   name="fromDate"
// //                   value={form.fromDate}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="text-sm font-semibold text-gray-600">
// //                   To Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   name="toDate"
// //                   value={form.toDate}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
// //                 />
// //               </div>
// //             </div>

// //             {/* Stats Cards – now using state.stats */}
// //             <div className="grid md:grid-cols-3 gap-5 mb-8">
// //               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
// //                 <p className="text-gray-500 text-sm">Total Leave Events</p>
// //                 <h2 className="text-3xl font-bold text-blue-600">
// //                   {stats.totalLeaveEvents}
// //                 </h2>
// //               </div>

// //               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
// //                 <p className="text-gray-500 text-sm">Employees Affected</p>
// //                 <h2 className="text-3xl font-bold text-green-600">
// //                   {stats.totalEmployeesAffected}
// //                 </h2>
// //               </div>

// //               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
// //                 <p className="text-gray-500 text-sm">Approved Leave Events</p>
// //                 <h2 className="text-3xl font-bold text-yellow-600">
// //                   {stats.approvedCount}
// //                 </h2>
// //               </div>
// //             </div>

// //             <div>
// //               <label className="text-sm font-semibold text-gray-600">
// //                 Reason
// //               </label>
// //               <textarea
// //                 name="reason"
// //                 value={form.reason}
// //                 onChange={handleChange}
// //                 required
// //                 rows="4"
// //                 placeholder="Example: Company holiday / Office closed / Festival leave"
// //                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
// //               />
// //             </div>

// //             <div>
// //               <label className="text-sm font-semibold text-gray-600">
// //                 Admin Remark
// //               </label>
// //               <textarea
// //                 name="adminRemark"
// //                 value={form.adminRemark}
// //                 onChange={handleChange}
// //                 rows="3"
// //                 placeholder="Optional remark shown to employees"
// //                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full md:w-auto bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2 className="w-5 h-5 animate-spin" />
// //                   Assigning...
// //                 </>
// //               ) : (
// //                 <>
// //                   <Send className="w-5 h-5" />
// //                   Assign Leave to All
// //                 </>
// //               )}
// //             </button>
// //           </form>
// //         </div>

// //         {/* History Section */}
// //         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
// //           <div className="p-6 border-b border-gray-100">
// //             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// //               <Clock className="w-5 h-5 text-blue-500" />
// //               Assigned Leave History
// //             </h2>
// //           </div>

// //           {historyLoading ? (
// //             <div className="p-10 flex justify-center">
// //               <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
// //             </div>
// //           ) : history.length === 0 ? (
// //             <div className="p-10 text-center text-gray-500">
// //               No bulk leave assignments found.
// //             </div>
// //           ) : (
// //             <div className="divide-y divide-gray-100">
// //               {history.map((item) => (
// //                 <div key={item._id} className="p-5 hover:bg-gray-50 transition">
// //                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
// //                     <div className="flex-1">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
// //                           <Users className="w-5 h-5 text-blue-600" />
// //                         </div>
// //                         <div>
// //                           <h3 className="font-bold text-gray-800">
// //                             {item.leaveType}
// //                           </h3>
// //                           <p className="text-sm text-gray-500 flex items-center gap-1">
// //                             <Calendar size={14} />
// //                             {formatDate(item.fromDate)} - {formatDate(item.toDate)}
// //                           </p>
// //                         </div>
// //                       </div>

// //                       <div className="mt-3 grid sm:grid-cols-2 gap-3">
// //                         <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
// //                           <p className="text-xs text-gray-500">Reason</p>
// //                           <p className="text-sm font-medium text-gray-700">
// //                             {item.reason}
// //                           </p>
// //                         </div>
// //                         <div className="bg-gradient-to-br from-amber-50 to-yellow-50/80 border border-amber-200/70 rounded-xl p-3 shadow-sm transition-all duration-200 hover:shadow-md">
// //                           <div className="flex items-start space-x-2">
// //                             <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
// //                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
// //                               </svg>
// //                             </div>
// //                             <div className="flex-1 min-w-0">
// //                               <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Admin Remark</p>
// //                               <p className="mt-0.5 text-sm font-medium text-gray-800 break-words leading-relaxed">
// //                                 {item.adminRemark || <span className="text-gray-400 font-normal italic">No remarks</span>}
// //                               </p>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="flex flex-col items-start gap-2">
// //                       {getStatusBadge(item.status)}
// //                       <span className="text-xs text-gray-400">
// //                         Created: {formatDate(item.createdAt)}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSetLeave;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
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

//   const handleDeleteLeave = async (historyId) => {
//   const confirm = await Swal.fire({
//     title: "Cancel this leave?",
//     text: "This will remove this leave from all employees.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, cancel it",
//     confirmButtonColor: "#dc2626",
//   });

//   if (!confirm.isConfirmed) return;

//   try {
//     await axios.delete(`/api/admin/set-leave/${historyId}`, {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     });

//     Swal.fire("Cancelled", "Leave cancelled successfully", "success");
//     fetchHistory();
//   } catch (error) {
//     Swal.fire(
//       "Error",
//       error.response?.data?.message || "Failed to cancel leave",
//       "error"
//     );
//   }
// };
//   const adminToken = localStorage.getItem("adminToken");

//   // Compute total days whenever dates change
//   useEffect(() => {
//     if (form.fromDate && form.toDate) {
//       const from = new Date(form.fromDate);
//       const to = new Date(form.toDate);
//       if (from && to && !isNaN(from) && !isNaN(to) && to >= from) {
//         const diffTime = Math.abs(to - from);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
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
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
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
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
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

//   const getStatusBadge = (status) => {
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
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//             <Users className="w-6 h-6 text-blue-500" />
//             All Leave Assignment
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Assign leave to all active employees at once.
//           </p>
//         </div>

//         {/* Warning Alert */}
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
//           <AlertTriangle className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
//           <div>
//             <h3 className="font-bold text-yellow-800">Important</h3>
//             <p className="text-sm text-yellow-700">
//               This action will create leave records for every active employee.
//               Please check the dates carefully before submitting.
//             </p>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <FileText className="text-blue-500" />
//             Leave Details
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid md:grid-cols-2 gap-5">
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Leave Type
//                 </label>
//                 <select
//                   name="leaveType"
//                   value={form.leaveType}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
//                 >
//                   <option value="">Select Leave Type</option>
//                   <option value="Casual Leave">Casual Leave</option>
//                   <option value="Sick Leave">Sick Leave</option>
//                   <option value="Emergency Leave">Emergency Leave</option>
//                   <option value="Paid Leave">Paid Leave</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   From Date
//                 </label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={form.fromDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   To Date
//                 </label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={form.toDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
//                 />
//               </div>
//             </div>

//             {/* Total Days Display – added here */}
//             <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-fit">
//               <Calendar className="w-4 h-4 text-blue-500" />
//               <span>
//                 Total Days:{" "}
//                 <span className="font-bold text-blue-700">
//                   {totalDays > 0 ? totalDays : "—"}
//                 </span>
//               </span>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid md:grid-cols-3 gap-5 my-6">
//               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//                 <p className="text-gray-500 text-sm">Total Leave Events</p>
//                 <h2 className="text-3xl font-bold text-blue-600">
//                   {stats.totalLeaveEvents}
//                 </h2>
//               </div>

//               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//                 <p className="text-gray-500 text-sm">Employees Affected</p>
//                 <h2 className="text-3xl font-bold text-green-600">
//                   {stats.totalEmployeesAffected}
//                 </h2>
//               </div>

//               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//                 <p className="text-gray-500 text-sm">Approved Leave Events</p>
//                 <h2 className="text-3xl font-bold text-yellow-600">
//                   {stats.approvedCount}
//                 </h2>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Reason
//               </label>
//               <textarea
//                 name="reason"
//                 value={form.reason}
//                 onChange={handleChange}
//                 required
//                 rows="4"
//                 placeholder="Example: Company holiday / Office closed / Festival leave"
//                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Admin Remark
//               </label>
//               <textarea
//                 name="adminRemark"
//                 value={form.adminRemark}
//                 onChange={handleChange}
//                 rows="3"
//                 placeholder="Optional remark shown to employees"
//                 className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full md:w-auto bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Assigning...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-5 h-5" />
//                   Assign Leave to All
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* History Section */}
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//               <Clock className="w-5 h-5 text-blue-500" />
//               Assigned Leave History
//             </h2>
//           </div>

//           {historyLoading ? (
//             <div className="p-10 flex justify-center">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
//             </div>
//           ) : history.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">
//               No bulk leave assignments found.
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-100">
//               {history.map((item) => (
//                 <div key={item._id} className="p-5 hover:bg-gray-50 transition">
//                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                           <Users className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-gray-800">
//                             {item.leaveType}
//                           </h3>
//                           <p className="text-sm text-gray-500 flex items-center gap-1">
//                             <Calendar size={14} />
//                             {formatDate(item.fromDate)} - {formatDate(item.toDate)}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="mt-3 grid sm:grid-cols-2 gap-3">
//                         <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
//                           <p className="text-xs text-gray-500">Reason</p>
//                           <p className="text-sm font-medium text-gray-700">
//                             {item.reason}
//                           </p>
//                         </div>
//                         <div className="bg-gradient-to-br from-amber-50 to-yellow-50/80 border border-amber-200/70 rounded-xl p-3 shadow-sm transition-all duration-200 hover:shadow-md">
//                           <div className="flex items-start space-x-2">
//                             <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
//                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                               </svg>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Admin Remark</p>
//                               <p className="mt-0.5 text-sm font-medium text-gray-800 break-words leading-relaxed">
//                                 {item.adminRemark || <span className="text-gray-400 font-normal italic">No remarks</span>}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-start gap-2">
//                       {getStatusBadge(item.status)}
//                       <span className="text-xs text-gray-400">
//                         Created: {formatDate(item.createdAt)}
//                       </span>
//                     </div>

//                     <button
//   onClick={() => handleDeleteLeave(item._id)}
//   className="px-3 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100"
// >
//   Cancel Leave
// </button>
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

// export default AdminSetLeave;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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

  // const adminToken = localStorage.getItem("adminToken");
 const adminToken =  sessionStorage.getItem("adminToken");
 
  // Delete handler (only for non‑past leaves)
  const handleDeleteLeave = async (historyId, toDate) => {
    // Check if the leave is already past
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
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
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

  // Compute total days when dates change
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
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
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
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
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
    // If the leave is past, override with "Expired"
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-500" />
            All Leave Assignment
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Assign leave to all active employees at once.
          </p>
        </div>

        {/* Warning Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
          <AlertTriangle className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-yellow-800">Important</h3>
            <p className="text-sm text-yellow-700">
              This action will create leave records for every active employee.
              Please check the dates carefully before submitting.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-500" />
            Leave Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Leave Type
                </label>
                <select
                  name="leaveType"
                  value={form.leaveType}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                >
                  <option value="">Select Leave Type</option>
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
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
            </div>

            {/* Total Days Display */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-fit">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>
                Total Days:{" "}
                <span className="font-bold text-blue-700">
                  {totalDays > 0 ? totalDays : "—"}
                </span>
              </span>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-5 my-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Total Leave Events</p>
                <h2 className="text-3xl font-bold text-blue-600">
                  {stats.totalLeaveEvents}
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Employees Affected</p>
                <h2 className="text-3xl font-bold text-green-600">
                  {stats.totalEmployeesAffected}
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Approved Leave Events</p>
                <h2 className="text-3xl font-bold text-yellow-600">
                  {stats.approvedCount}
                </h2>
              </div>
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
                className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
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
                className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
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

        {/* History Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Assigned Leave History
            </h2>
          </div>

          {historyLoading ? (
            <div className="p-10 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : history.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No bulk leave assignments found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((item) => {
                const isPast = new Date(item.toDate) < new Date();
                return (
                  <div key={item._id} className="p-5 hover:bg-gray-50 transition">
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
                              {formatDate(item.fromDate)} - {formatDate(item.toDate)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid sm:grid-cols-2 gap-3">
                          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                            <p className="text-xs text-gray-500">Reason</p>
                            <p className="text-sm font-medium text-gray-700">
                              {item.reason}
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-yellow-50/80 border border-amber-200/70 rounded-xl p-3 shadow-sm transition-all duration-200 hover:shadow-md">
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

                      {/* Conditional Cancel Button */}
                      {isPast ? (
                        <button
                          disabled
                          className="px-3 py-1 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 text-xs font-semibold cursor-not-allowed"
                          title="Past leaves cannot be cancelled"
                        >
                          Past
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteLeave(item._id, item.toDate)}
                          className="px-3 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100"
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
        </div>
      </div>
    </div>
  );
};

export default AdminSetLeave;