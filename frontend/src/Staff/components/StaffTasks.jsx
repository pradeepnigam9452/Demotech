import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Eye,
  X,
  Send,
  Search,
  Users,
  FileText,
  Timer,
} from "lucide-react";

const StaffTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedTask, setSelectedTask] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const [progressForm, setProgressForm] = useState({
    description: "",
    hoursWorked: "",
    status: "in-progress",
  });

  const staffToken = localStorage.getItem("staffToken");

  const getLoggedStaffId = () => {
    try {
      const staffData = JSON.parse(localStorage.getItem("staff") || "{}");
      return localStorage.getItem("staffMongoId") || staffData._id || "";
    } catch (error) {
      return localStorage.getItem("staffMongoId") || "";
    }
  };

  const loggedStaffId = getLoggedStaffId();

  const authHeader = {
    headers: {
      Authorization: `Bearer ${staffToken}`,
    },
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const formatTime = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStaffIdFromLog = (staff) => {
    if (!staff) return "";
    return typeof staff === "string" ? staff : staff._id;
  };

  const getMyProgressLogs = (task) => {
    const logs = task.workLogs || [];

    if (!loggedStaffId) return logs;

    return logs.filter((log) => getStaffIdFromLog(log.staff) === loggedStaffId);
  };

  const fetchTasks = async () => {
    try {
      setFetching(true);

      const res = await axios.get("/api/staff/tasks", authHeader);

      setTasks(res.data.data || []);
    } catch (error) {
      console.log("Staff task fetch error:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch tasks",
        "error"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleProgressChange = (e) => {
    setProgressForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openProgressModal = (task) => {
    setSelectedTask(task);
    setProgressForm({
      description: "",
      hoursWorked: "",
      status: "in-progress",
    });
    setShowProgressModal(true);
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();

    if (!progressForm.description.trim()) {
      return Swal.fire("Warning", "Progress description is required", "warning");
    }

    if (!selectedTask) return;

    try {
      setProgressLoading(true);

      const res = await axios.post(
        `/api/staff/tasks/${selectedTask._id}/progress`,
        {
          description: progressForm.description,
          hoursWorked: Number(progressForm.hoursWorked) || 0,
          status: progressForm.status,
        },
        authHeader
      );

      Swal.fire(
        "Success",
        res.data.message || "Progress added successfully",
        "success"
      );

      const updatedTask = res.data.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );

      setSelectedTask(updatedTask);

      setProgressForm({
        description: "",
        hoursWorked: "",
        status: "in-progress",
      });
    } catch (error) {
      console.log("Add progress error:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add progress",
        "error"
      );
    } finally {
      setProgressLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const titleMatch = task.title?.toLowerCase().includes(searchText);
      const descriptionMatch = task.description
        ?.toLowerCase()
        .includes(searchText);

      const statusMatch =
        statusFilter === "all" || task.status === statusFilter;

      return (titleMatch || descriptionMatch) && statusMatch;
    });
  }, [tasks, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      progress: tasks.filter((task) => task.status === "in-progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    };
  }, [tasks]);

  const getPriorityBadge = (priority) => {
    const styles = {
      low: "bg-green-50 text-green-700 border-green-200",
      medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
      high: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold border ${
          styles[priority] || styles.medium
        }`}
      >
        {priority || "medium"}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-gray-100 text-gray-700 border-gray-200",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    };

    const icons = {
      pending: <Clock size={14} />,
      "in-progress": <AlertTriangle size={14} />,
      completed: <CheckCircle size={14} />,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
          styles[status] || styles.pending
        }`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  const isOverdue = (deadline, status) => {
    if (!deadline || status === "completed") return false;

    const today = new Date();
    const endDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return endDate < today;
  };

  if (fetching) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-blue-500" />
            My Tasks
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            View your assigned tasks and submit daily work progress.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h2 className="text-3xl font-bold text-gray-800">{stats.total}</h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-gray-600">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.progress}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.completed}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search task..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-700">No tasks found</h3>
            <p className="text-gray-500 text-sm mt-1">
              You do not have any assigned task yet.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => {
              const myLogs = getMyProgressLogs(task);
              const overdue = isOverdue(task.deadline, task.status);

              return (
                <div
                  key={task._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {task.title}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {task.description || "No description"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span
                      className={`flex items-center gap-1 ${
                        overdue ? "text-red-600 font-semibold" : ""
                      }`}
                    >
                      <Calendar size={16} />
                      Deadline: {formatDate(task.deadline)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      Created: {formatDate(task.createdAt)}
                    </span>

                    <span className="flex items-center gap-1">
                      <FileText size={16} />
                      My Logs: {myLogs.length}
                    </span>
                  </div>

                  {overdue && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4 flex gap-2">
                      <AlertTriangle size={18} />
                      This task deadline has passed.
                    </div>
                  )}

                  {task.assignedTo?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                        <Users size={14} />
                        Assigned Team
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {task.assignedTo.map((staff) => (
                          <span
                            key={typeof staff === "string" ? staff : staff._id}
                            className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {typeof staff === "string"
                              ? "Staff"
                              : staff.name || "Staff"}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-5">
                    <h3 className="font-bold text-gray-800 mb-3">
                      Latest My Progress
                    </h3>

                    

                    {myLogs.length > 0 ? (
                      <div className="space-y-3">
                        {myLogs.slice(0, 2).map((log, index) => (
                          <div
                            key={log._id || index}
                            className="bg-white border border-gray-100 rounded-xl p-3"
                          >
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <span className="text-xs text-gray-400">
                                {formatDate(log.date)} • {formatTime(log.date)}
                              </span>

                              {getStatusBadge(log.status)}
                            </div>

                            <p className="text-sm text-gray-700">
                              {log.description}
                            </p>

                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Timer size={13} />
                              Hours: {log.hoursWorked || 0}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No progress added yet.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => openProgressModal(task)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                  >
                    <Eye size={18} />
                    View / Add Progress
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Progress Modal */}
        {showProgressModal && selectedTask && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Task Progress
                  </h2>

                  <p className="text-sm text-gray-500">
                    {selectedTask.title}
                  </p>
                </div>

                <button
                  onClick={() => setShowProgressModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 grid lg:grid-cols-2 gap-6">
                {/* Add Progress */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue-500" />
                    Add Daily Progress
                  </h3>

                  <form onSubmit={handleAddProgress} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Work Description
                      </label>

                      <textarea
                        name="description"
                        value={progressForm.description}
                        onChange={handleProgressChange}
                        rows="5"
                        placeholder="Example: Today I completed login page UI and form validation."
                        className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Hours Worked
                      </label>

                      <input
                        type="number"
                        name="hoursWorked"
                        value={progressForm.hoursWorked}
                        onChange={handleProgressChange}
                        min="0"
                        step="0.5"
                        placeholder="Example: 4"
                        className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Status
                      </label>

                      <select
                        name="status"
                        value={progressForm.status}
                        onChange={handleProgressChange}
                        className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={progressLoading}
                      className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {progressLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Progress
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* My Progress History */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    My Progress History
                  </h3>

                  {getMyProgressLogs(selectedTask).length > 0 ? (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {getMyProgressLogs(selectedTask).map((log, index) => (
                        <div
                          key={log._id || index}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="text-xs text-gray-400">
                              {formatDate(log.date)} • {formatTime(log.date)}
                            </span>

                            {getStatusBadge(log.status)}
                          </div>

                          <p className="text-sm text-gray-700">
                            {log.description}
                          </p>

                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Timer size={13} />
                            Hours Worked:{" "}
                            <span className="font-bold">
                              {log.hoursWorked || 0}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-10">
                      No progress added yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffTasks;