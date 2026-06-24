

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  FileText,
  Loader2,
  Send,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const LeaveApplication = () => {
  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("staffToken");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/api/staff/me/leave", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaves(res.data.data || []);
    } catch (error) {
      console.log("Leave fetch error:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyLeave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("/api/staff/me/leave", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Leave applied successfully");

      setForm({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

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
    if (status === "Approved") return <CheckCircle className="w-5 h-5" />;
    if (status === "Rejected") return <XCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            Leave Application
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Apply for leave and check whether your request is pending, approved,
            or rejected.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-green-600 text-sm font-semibold">Approved</p>
            <h2 className="text-3xl font-bold text-green-700">
              {approvedLeaves}
            </h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <p className="text-yellow-600 text-sm font-semibold">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-700">
              {pendingLeaves}
            </h2>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-600 text-sm font-semibold">Rejected</p>
            <h2 className="text-3xl font-bold text-red-700">
              {rejectedLeaves}
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Apply Leave Form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Apply Leave
            </h2>

            <form onSubmit={applyLeave} className="space-y-4">
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
                  placeholder="Write your leave reason..."
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-blue-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Apply Leave
                  </>
                )}
              </button>

              {message && (
                <p className="text-sm font-semibold text-blue-600 text-center">
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Leave Requests List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden lg:col-span-2">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                My Leave Requests
              </h2>
            </div>

            {fetching ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
            ) : leaves.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No leave applications found.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {leaves.map((leave) => (
                  <div key={leave._id} className="p-5 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {leave.leaveType}
                        </h3>

                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar size={15} />
                          {formatDate(leave.fromDate)} -{" "}
                          {formatDate(leave.toDate)}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Reason:</strong> {leave.reason}
                        </p>

                        {leave.adminRemark && (
                         <div className="mt-3 bg-yellow-750 border border-gray-100 rounded-xl p-3">
                            <p className="text-xs text-yellow-500">
                              Admin Remark
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              {leave.adminRemark}
                            </p>
                          </div>
                        )}
                      </div>

                      <span
                        className={`w-fit px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border ${getStatusStyle(
                          leave.status
                        )}`}
                      >
                        {getStatusIcon(leave.status)}
                        {leave.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;