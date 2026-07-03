


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
  Briefcase,
  Filter,
  TrendingUp,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AdminLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const adminToken = sessionStorage.getItem("adminToken");

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
    if (status === "Approved")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "Rejected")
      return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
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
      <div className="min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading leave requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white rounded-2xl p-7 mb-8 shadow-sm border border-gray-100/80"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Leave Requests
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage and track employee leave applications
                </p>
              </div>
            </div>
           
          </div>
        </motion.div>

        {/* ===== Stats Cards ===== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-8"
        >
          <StatCard
            label="Total Requests"
            value={total}
            icon={<FileText size={20} />}
            color="blue"
          />
          <StatCard
            label="Pending"
            value={pending}
            icon={<Clock size={20} />}
            color="amber"
          />
          <StatCard
            label="Approved"
            value={approved}
            icon={<CheckCircle size={20} />}
            color="emerald"
          />
          <StatCard
            label="Rejected"
            value={rejected}
            icon={<XCircle size={20} />}
            color="rose"
          />
        </motion.div>

        {/* ===== Main List ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              All Requests
              <span className="ml-2 text-sm font-medium text-gray-400 bg-gray-200 px-2.5 py-0.5 rounded-full">
                {filteredLeaves.length}
              </span>
            </h2>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white text-sm font-medium shadow-sm transition"
            >
              <option value="All">📋 All Requests</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Approved">✅ Approved</option>
              <option value="Rejected">❌ Rejected</option>
            </select>
          </div>

          {/* List */}
          {filteredLeaves.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-300 mb-4">
                <FileText size={28} />
              </div>
              <p className="text-gray-500 font-medium">No leave requests found</p>
              <p className="text-gray-400 text-sm mt-1">
                {filterStatus !== "All"
                  ? `No ${filterStatus.toLowerCase()} requests at the moment`
                  : "All leave requests will appear here"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredLeaves.map((leave, index) => (
                <motion.div
                  key={leave._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="p-5 hover:bg-blue-50/30 transition-all duration-200 group"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                    {/* Left: User + Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <User className="text-blue-600" size={20} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg leading-tight">
                            {leave.staff?.name || "Unknown Staff"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {leave.staff?.staffId || "-"} •{" "}
                            {leave.staff?.category || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 hover:bg-gray-100/50 transition">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            Leave Type
                          </p>
                          <p className="font-semibold text-gray-800 mt-0.5">
                            {leave.leaveType}
                          </p>
                        </div>

                        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 hover:bg-gray-100/50 transition">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            Leave Date
                          </p>
                          <p className="font-semibold text-gray-800 mt-0.5 flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            {formatDate(leave.fromDate)} — {formatDate(leave.toDate)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          Reason
                        </p>
                        <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                          {leave.reason}
                        </p>
                      </div>

                      {leave.adminRemark && (
                        <div className="mt-4 bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5">
                          <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
                            Admin Remark
                          </p>
                          <p className="text-sm font-medium text-indigo-700 mt-0.5">
                            {leave.adminRemark}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="xl:w-56 flex-shrink-0 flex flex-row xl:flex-col gap-3 xl:gap-3 items-start xl:items-stretch">
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border shadow-sm w-full ${getStatusStyle(
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
                        className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-gray-700 bg-white text-sm font-medium shadow-sm transition cursor-pointer w-full"
                      >
                        <option value="Pending" >
                           Pending
                        </option>
                        <option value="Approved"> Approve</option>
                        <option value="Rejected"> Reject</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ===== Stat Card Component =====
const StatCard = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      value: "text-blue-700",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      value: "text-amber-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-600",
      value: "text-emerald-700",
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-600",
      value: "text-rose-700",
    },
  };

  const styles = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`${styles.bg} border ${styles.border} rounded-2xl p-5 shadow-sm transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h2 className={`text-3xl font-bold ${styles.value} mt-1`}>{value}</h2>
        </div>
        <div className={`${styles.bg} p-2.5 rounded-xl ${styles.text}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLeaveRequests;