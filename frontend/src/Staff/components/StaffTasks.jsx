
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

  // ✅ Simple token only
  const token = localStorage.getItem("staffToken");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const normalizeStatus = (status = "") => {
    const value = String(status).toLowerCase().trim();

    if (value === "in progress" || value === "in-progress") return "in-progress";
    if (value === "complete" || value === "completed") return "completed";
    if (value === "pending") return "pending";

    return value || "pending";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "-";

    return d.toLocaleDateString("en-IN");
  };

  const formatTime = (date) => {
    if (!date) return "-";

    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "-";

    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ No localStorage staffId logic
  // Backend token/auth se current staff identify karega
  const getProgressLogs = (task) => {
    return task?.myWorkLogs || task?.workLogs || [];
  };

  const handleApiError = (error, fallbackMessage) => {
    console.log("API error:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || fallbackMessage,
    });
  };

  const fetchTasks = async () => {
    if (!token) {
      setFetching(false);

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Staff token not found. Please login again.",
      });

      return;
    }

    try {
      setFetching(true);

      const res = await axios.get("/api/staff/tasks/my", authConfig);

      setTasks(res.data.data || []);
    } catch (error) {
      handleApiError(error, "Failed to fetch tasks");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleProgressChange = (e) => {
    const { name, value } = e.target;

    setProgressForm((prev) => ({
      ...prev,
      [name]: value,
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
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Progress description is required.",
      });
      return;
    }

    if (!selectedTask?._id) {
      Swal.fire({
        icon: "warning",
        title: "Task Missing",
        text: "Please select a valid task.",
      });
      return;
    }

    try {
      setProgressLoading(true);

      const res = await axios.post(
        `/api/staff/tasks/${selectedTask._id}/progress`,
        {
          description: progressForm.description.trim(),
          hoursWorked: Number(progressForm.hoursWorked) || 0,
          status: progressForm.status,
        },
        authConfig
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Progress added successfully.",
        timer: 1600,
        showConfirmButton: false,
      });

      const updatedTask = res.data.data;

      if (updatedTask?._id) {
        setTasks((prev) =>
          prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );

        setSelectedTask(updatedTask);
      } else {
        fetchTasks();
      }

      setProgressForm({
        description: "",
        hoursWorked: "",
        status: "in-progress",
      });
    } catch (error) {
      handleApiError(error, "Failed to add progress");
    } finally {
      setProgressLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase().trim();

      const title = task.title || "";
      const description = task.description || "";
      const taskStatus = normalizeStatus(task.status);

      const matchesSearch =
        !searchText ||
        title.toLowerCase().includes(searchText) ||
        description.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" || taskStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => normalizeStatus(task.status) === "pending")
        .length,
      progress: tasks.filter(
        (task) => normalizeStatus(task.status) === "in-progress"
      ).length,
      completed: tasks.filter(
        (task) => normalizeStatus(task.status) === "completed"
      ).length,
    };
  }, [tasks]);

  const getPriorityBadge = (priority = "medium") => {
    const value = String(priority).toLowerCase();

    const styles = {
      low: "bg-green-50 text-green-700 border-green-200",
      medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
      high: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <span
        className={`rounded-full border px-3 py-1 text-xs font-bold ${
          styles[value] || styles.medium
        }`}
      >
        {value}
      </span>
    );
  };

  const getStatusBadge = (status = "pending") => {
    const value = normalizeStatus(status);

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

    const labels = {
      pending: "Pending",
      "in-progress": "In Progress",
      completed: "Completed",
    };

    return (
      <span
        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${
          styles[value] || styles.pending
        }`}
      >
        {icons[value] || icons.pending}
        {labels[value] || "Pending"}
      </span>
    );
  };

  const isOverdue = (deadline, status) => {
    if (!deadline || normalizeStatus(status) === "completed") return false;

    const today = new Date();
    const endDate = new Date(deadline);

    if (Number.isNaN(endDate.getTime())) return false;

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return endDate < today;
  };

  if (fetching) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <ClipboardList className="h-7 w-7 text-blue-500" />
            My Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View your assigned tasks and submit daily work progress.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h2 className="text-3xl font-bold text-gray-800">{stats.total}</h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-gray-600">
              {stats.pending}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.progress}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.completed}
            </h2>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search task..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <ClipboardList className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <h3 className="font-bold text-gray-700">No tasks found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You do not have any assigned task yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredTasks.map((task) => {
              const logs = getProgressLogs(task);
              const overdue = isOverdue(task.deadline, task.status);

              return (
                <div
                  key={task._id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {task.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {task.description || "No description"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span
                      className={`flex items-center gap-1 ${
                        overdue ? "font-semibold text-red-600" : ""
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
                      Logs: {logs.length}
                    </span>
                  </div>

                  {overdue && (
                    <div className="mb-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertTriangle size={18} />
                      This task deadline has passed.
                    </div>
                  )}

                  {task.assignedTo?.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2 flex items-center gap-1 text-xs font-semibold text-gray-500">
                        <Users size={14} />
                        Assigned Team
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {task.assignedTo.map((staff, index) => {
                          const staffKey =
                            typeof staff === "string"
                              ? `${staff}-${index}`
                              : staff._id || staff.staffId || index;

                          return (
                            <span
                              key={staffKey}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                            >
                              {typeof staff === "string"
                                ? "Staff"
                                : staff.name || staff.staffId || "Staff"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h3 className="mb-3 font-bold text-gray-800">
                      Latest Progress
                    </h3>

                    {logs.length > 0 ? (
                      <div className="space-y-3">
                        {logs.slice(0, 2).map((log, index) => (
                          <div
                            key={log._id || index}
                            className="rounded-xl border border-gray-100 bg-white p-3"
                          >
                            <div className="mb-1 flex items-center justify-between gap-3">
                              <span className="text-xs text-gray-400">
                                {formatDate(log.date || log.createdAt)} •{" "}
                                {formatTime(log.date || log.createdAt)}
                              </span>

                              {getStatusBadge(log.status)}
                            </div>

                            <p className="text-sm text-gray-700">
                              {log.description}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-100 px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-200"
                  >
                    <Eye size={18} />
                    View / Add Progress
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {showProgressModal && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Send className="h-5 w-5 text-blue-500" />
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
                        className="mt-1 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-400"
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
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-400"
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
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={progressLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-100 px-5 py-3 font-bold text-blue-700 disabled:opacity-60 hover:bg-blue-200"
                    >
                      {progressLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Submit Progress
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h3 className="mb-4 text-lg font-bold text-gray-800">
                    Progress History
                  </h3>

                  {getProgressLogs(selectedTask).length > 0 ? (
                    <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
                      {getProgressLogs(selectedTask).map((log, index) => (
                        <div
                          key={log._id || index}
                          className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                        >
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs text-gray-400">
                              {formatDate(log.date || log.createdAt)} •{" "}
                              {formatTime(log.date || log.createdAt)}
                            </span>

                            {getStatusBadge(log.status)}
                          </div>

                          <p className="text-sm text-gray-700">
                            {log.description}
                          </p>

                          <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
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
                    <div className="py-10 text-center text-gray-500">
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