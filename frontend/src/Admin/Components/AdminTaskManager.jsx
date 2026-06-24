import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ClipboardList,
  Plus,
  Users,
  Calendar,
  Loader2,
  Trash2,
  Eye,
  Search,
  X,
  RefreshCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  Pencil,
} from "lucide-react";

const AdminTaskManager = () => {
  const emptyForm = {
    title: "",
    description: "",
    assignedTo: [],
    priority: "medium",
    deadline: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [staffList, setStaffList] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedTask, setSelectedTask] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);

  // const adminToken = localStorage.getItem("adminToken");
  const adminToken =  sessionStorage.getItem("adminToken");
 
  const authHeader = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  };

  const getId = (item) => {
    if (!item) return "";
    return typeof item === "string" ? item : item._id;
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getStaffName = (staffId) => {
    const staff = staffList.find((item) => item._id === staffId);
    return staff?.name || "Unknown Staff";
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("/api/allstaff", authHeader);
      setStaffList(res.data.data || res.data.staff || res.data || []);
    } catch (error) {
      console.log("Staff fetch error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch staff",
        "error"
      );
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/admin/tasks", authHeader);
      setTasks(res.data.data || []);
    } catch (error) {
      console.log("Task fetch error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch tasks",
        "error"
      );
    }
  };

  const loadData = async () => {
    try {
      setFetching(true);
      await Promise.all([fetchStaff(), fetchTasks()]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStaffToggle = (staffId) => {
    setForm((prev) => {
      const alreadySelected = prev.assignedTo.includes(staffId);

      return {
        ...prev,
        assignedTo: alreadySelected
          ? prev.assignedTo.filter((id) => id !== staffId)
          : [...prev.assignedTo, staffId],
      };
    });
  };

  const handleAssignStaffToggle = (staffId) => {
    setSelectedStaffIds((prev) => {
      const alreadySelected = prev.includes(staffId);

      return alreadySelected
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return Swal.fire("Warning", "Task title is required", "warning");
    }

    if (form.assignedTo.length === 0) {
      return Swal.fire("Warning", "Please select at least one staff", "warning");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/admin/tasks", form, authHeader);

      Swal.fire(
        "Success",
        res.data.message || "Task created successfully",
        "success"
      );

      setForm(emptyForm);
      fetchTasks();
    } catch (error) {
      console.log("Create task error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to create task",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const openAssignModal = (task) => {
    setSelectedTask(task);
    setSelectedStaffIds((task.assignedTo || []).map((staff) => getId(staff)));
    setShowAssignModal(true);
  };

  const handleUpdateAssignedStaff = async () => {
    if (!selectedTask) return;

    if (selectedStaffIds.length === 0) {
      return Swal.fire("Warning", "Please select at least one staff", "warning");
    }

    try {
      setAssignLoading(true);

      const res = await axios.put(
        `/api/admin/tasks/${selectedTask._id}/assign`,
        {
          assignedTo: selectedStaffIds,
        },
        authHeader
      );

      Swal.fire(
        "Success",
        res.data.message || "Task assigned staff updated",
        "success"
      );

      setShowAssignModal(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      console.log("Assign update error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update assigned staff",
        "error"
      );
    } finally {
      setAssignLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirm = await Swal.fire({
      title: "Delete this task?",
      text: "This task and all progress logs will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/api/admin/tasks/${taskId}`, authHeader);

      Swal.fire("Deleted", "Task deleted successfully", "success");
      fetchTasks();
    } catch (error) {
      console.log("Delete task error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to delete task",
        "error"
      );
    }
  };

  const openProgressModal = (task) => {
    setSelectedTask(task);
    setShowProgressModal(true);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const titleMatch = task.title?.toLowerCase().includes(searchText);

      const staffMatch = task.assignedTo?.some((staff) =>
        staff.name?.toLowerCase().includes(searchText)
      );

      const statusMatch =
        statusFilter === "all" || task.status === statusFilter;

      return (titleMatch || staffMatch) && statusMatch;
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
        {priority}
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <ClipboardList className="w-7 h-7 text-blue-500" />
                Admin Task Manager
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Create tasks, assign them to multiple staff, and manage daily
                progress.
              </p>
            </div>

            <button
              onClick={loadData}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
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

        {/* Create Task Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="text-blue-500" />
            Create New Task
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Create Staff Dashboard UI"
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write task details..."
                className="w-full mt-1 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-3">
                <Users size={18} />
                Assign Staff
              </label>

              {staffList.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-gray-500 text-center">
                  No staff found.
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-2">
                  {staffList.map((staff) => {
                    const checked = form.assignedTo.includes(staff._id);

                    return (
                      <label
                        key={staff._id}
                        className={`border rounded-xl p-4 cursor-pointer transition flex items-start gap-3 ${
                          checked
                            ? "bg-blue-50 border-blue-300"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleStaffToggle(staff._id)}
                          className="mt-1"
                        />

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {staff.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {staff.staffId} • {staff.category}
                          </p>
                          <p className="text-xs text-gray-400">
                            {staff.email}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create & Assign Task
                </>
              )}
            </button>
          </form>
        </div>

        {/* Manage Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                Manage Tasks
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search task or staff..."
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
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
          </div>

          {filteredTasks.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No tasks found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <div key={task._id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {task.title}
                        </h3>

                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>

                      <p className="text-gray-600 text-sm mb-4">
                        {task.description || "No description"}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          Deadline: {formatDate(task.deadline)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          Created: {formatDate(task.createdAt)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          Assigned: {task.assignedTo?.length || 0}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {task.assignedTo?.map((staff) => (
                          <span
                            key={getId(staff)}
                            className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {staff.name || getStaffName(getId(staff))}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openProgressModal(task)}
                        className="px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm font-semibold hover:bg-green-100 flex items-center gap-2"
                      >
                        <Eye size={16} />
                        Progress
                      </button>

                      <button
                        onClick={() => openAssignModal(task)}
                        className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold hover:bg-blue-100 flex items-center gap-2"
                      >
                        <Pencil size={16} />
                        Assign
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold hover:bg-red-100 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Modal */}
        {showProgressModal && selectedTask && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
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

              <div className="p-6">
                {selectedTask.workLogs?.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTask.workLogs.map((log, index) => (
                      <div
                        key={log._id || index}
                        className="border border-gray-100 rounded-xl p-4 bg-gray-50"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                          <h3 className="font-bold text-gray-800">
                            {log.staff?.name || "Staff"}
                          </h3>

                          <div className="flex items-center gap-2">
                            {getStatusBadge(log.status)}
                            <span className="text-xs text-gray-400">
                              {formatDate(log.date)}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          {log.description}
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
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
                    No progress added by staff yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Assign Staff Modal */}
        {showAssignModal && selectedTask && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Manage Assigned Staff
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedTask.title}
                  </p>
                </div>

                <button
                  onClick={() => setShowAssignModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {staffList.map((staff) => {
                    const checked = selectedStaffIds.includes(staff._id);

                    return (
                      <label
                        key={staff._id}
                        className={`border rounded-xl p-4 cursor-pointer transition flex items-start gap-3 ${
                          checked
                            ? "bg-blue-50 border-blue-300"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleAssignStaffToggle(staff._id)}
                          className="mt-1"
                        />

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {staff.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {staff.staffId} • {staff.category}
                          </p>
                          <p className="text-xs text-gray-400">
                            {staff.email}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdateAssignedStaff}
                    disabled={assignLoading}
                    className="px-5 py-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 font-bold hover:bg-blue-200 disabled:opacity-60 flex items-center gap-2"
                  >
                    {assignLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTaskManager;