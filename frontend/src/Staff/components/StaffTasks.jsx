import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FolderKanban,
  Loader2,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  Calendar,
  Briefcase,
  ExternalLink,
  Github,
  Eye,
  X,
  MessageSquare,
  UserCheck,
  RefreshCw,
} from "lucide-react";

const StaffAssignedProjects = () => {
  const [requests, setRequests] = useState([]);
  const [myProjects, setMyProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [activeTab, setActiveTab] = useState("requests");
  const [search, setSearch] = useState("");

  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [workLoading, setWorkLoading] = useState(false);
  const [workForm, setWorkForm] = useState({
    description: "",
    hoursWorked: "",
    workStatus: "In Progress",
  });

  const staffToken = localStorage.getItem("staffToken") || "";

  const authHeaders = {
    Authorization: `Bearer ${staffToken}`,
  };

  // =====================================================
  // API DATA NORMALIZER
  // Supports both:
  // 1) { _id, project: {...}, status, ... }
  // 2) { assignmentId, projectId, title, assignmentStatus, ... }
  // =====================================================

  const normalizeItem = (item) => {
    if (!item) return null;

    if (item.project && typeof item.project === "object") {
      return {
        assignmentId: item._id,
        status: item.status,
        adminMessage: item.adminMessage || "",
        staffResponse: item.staffResponse || "",
        requestedAt: item.requestedAt,
        respondedAt: item.respondedAt,
        removedAt: item.removedAt,
        workUpdates: item.workUpdates || [],
        project: item.project,
      };
    }

    return {
      assignmentId: item.assignmentId || item._id,
      status: item.assignmentStatus || item.status,
      adminMessage: item.adminMessage || "",
      staffResponse: item.staffResponse || "",
      requestedAt: item.requestedAt,
      respondedAt: item.respondedAt,
      removedAt: item.removedAt,
      workUpdates: item.workUpdates || [],
      project: {
        _id: item.projectId,
        title: item.title,
        description: item.description,
        clientName: item.clientName,
        projectUrl: item.projectUrl,
        githubUrl: item.githubUrl,
        startDate: item.startDate,
        deadline: item.deadline,
        priority: item.priority,
        status: item.projectStatus,
        technologies: item.technologies,
      },
    };
  };

  // =====================================================
  // GET ASSIGNMENT REQUESTS
  // =====================================================

  const getProjectRequests = async () => {
    const res = await axios.get(
      "/api/staff/running-project-requests",
      {
        headers: authHeaders,
      }
    );

    const data = Array.isArray(res.data?.data)
      ? res.data.data
      : [];

    setRequests(
      data.map(normalizeItem).filter(Boolean)
    );
  };

  // =====================================================
  // GET ACCEPTED PROJECTS
  // =====================================================

  const getMyProjects = async () => {
    const res = await axios.get(
      "/api/staff/my-running-projects",
      {
        headers: authHeaders,
      }
    );

    const data = Array.isArray(res.data?.data)
      ? res.data.data
      : [];

    const normalizedProjects = data
      .map(normalizeItem)
      .filter(
        (item) =>
          item &&
          item.project &&
          item.project._id
      );

    setMyProjects(normalizedProjects);

    return normalizedProjects;
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        getProjectRequests(),
        getMyProjects(),
      ]);
    } catch (error) {
      console.error("Project load error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Load Projects",
        text:
          error.response?.data?.message ||
          "Failed to load assigned projects.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // ACCEPT REQUEST
  // =====================================================

  const handleAccept = async (item) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Accept Project?",
      text: `Do you want to accept \"${item.project?.title || "this project"}\"?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(item.assignmentId);

      const res = await axios.patch(
        `/api/staff/running-project-requests/${item.assignmentId}/respond`,
        {
          action: "accept",
          staffResponse: "Project accepted",
        },
        {
          headers: authHeaders,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Project Accepted",
        text:
          res.data?.message ||
          "Project accepted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      await loadData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Accept Failed",
        text:
          error.response?.data?.message ||
          "Unable to accept this project.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // =====================================================
  // REJECT REQUEST
  // =====================================================

  const handleReject = async (item) => {
    const result = await Swal.fire({
      title: "Reject Project?",
      input: "textarea",
      inputLabel: "Reason (optional)",
      inputPlaceholder: "Write your reason here...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject Project",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(item.assignmentId);

      const res = await axios.patch(
        `/api/staff/running-project-requests/${item.assignmentId}/respond`,
        {
          action: "reject",
          staffResponse:
            result.value?.trim() ||
            "Project rejected",
        },
        {
          headers: authHeaders,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Project Rejected",
        text:
          res.data?.message ||
          "Project rejected successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      await loadData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reject Failed",
        text:
          error.response?.data?.message ||
          "Unable to reject this project.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // =====================================================
  // ADD PROJECT WORK UPDATE
  // =====================================================

  const handleAddWorkUpdate = async (e) => {
    e.preventDefault();

    if (!selectedItem?.assignmentId) {
      Swal.fire({
        icon: "error",
        title: "Project Missing",
        text: "Unable to find this project assignment.",
      });
      return;
    }

    if (!workForm.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Please describe what you worked on.",
      });
      return;
    }

    try {
      setWorkLoading(true);

      const res = await axios.post(
        `/api/staff/running-projects/${selectedItem.assignmentId}/work-update`,
        {
          description: workForm.description.trim(),
          hoursWorked: Number(workForm.hoursWorked) || 0,
          workStatus: workForm.workStatus,
        },
        {
          headers: authHeaders,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Work Update Added",
        text:
          res.data?.message ||
          "Your project work update was saved successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setWorkForm({
        description: "",
        hoursWorked: "",
        workStatus: "In Progress",
      });

      const freshProjects = await getMyProjects();

      const freshSelectedItem = freshProjects.find(
        (item) =>
          String(item.assignmentId) ===
          String(selectedItem.assignmentId)
      );

      if (freshSelectedItem) {
        setSelectedItem(freshSelectedItem);
      }
    } catch (error) {
      console.error("Add work update error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Add Update",
        text:
          error.response?.data?.message ||
          "Failed to save your project work update.",
      });
    } finally {
      setWorkLoading(false);
    }
  };

  // =====================================================
  // DETAILS MODAL
  // =====================================================

  const openDetails = (item) => {
    setSelectedItem(item);
    setWorkForm({
      description: "",
      hoursWorked: "",
      workStatus: "In Progress",
    });
    setDetailsModal(true);
  };

  // =====================================================
  // FILTERS
  // =====================================================

  const filteredRequests = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return requests;

    return requests.filter((item) => {
      const project = item.project || {};

      return (
        project.title?.toLowerCase().includes(text) ||
        project.clientName?.toLowerCase().includes(text) ||
        project.priority?.toLowerCase().includes(text) ||
        item.status?.toLowerCase().includes(text)
      );
    });
  }, [requests, search]);

  const filteredMyProjects = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return myProjects;

    return myProjects.filter((item) => {
      const project = item.project || {};

      return (
        project.title?.toLowerCase().includes(text) ||
        project.clientName?.toLowerCase().includes(text) ||
        project.priority?.toLowerCase().includes(text) ||
        project.status?.toLowerCase().includes(text)
      );
    });
  }, [myProjects, search]);

  // =====================================================
  // HELPERS
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPriorityStyle = (priority) => {
    if (priority === "Urgent") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    if (priority === "High") {
      return "bg-orange-100 text-orange-700 border-orange-200";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }

    return "bg-green-100 text-green-700 border-green-200";
  };

  const getProjectStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "On Hold") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  const getAssignmentStatusStyle = (status) => {
    if (status === "Accepted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Removed") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  const pendingCount = requests.filter(
    (item) => item.status === "Pending"
  ).length;

  const acceptedCount = requests.filter(
    (item) => item.status === "Accepted"
  ).length;

  const rejectedCount = requests.filter(
    (item) => item.status === "Rejected"
  ).length;

  // =====================================================
  // LOADER
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  const currentList =
    activeTab === "requests"
      ? filteredRequests
      : filteredMyProjects;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FolderKanban size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Assigned Projects
                </h1>

                <p className="text-sm text-slate-500">
                  Review assignment requests and manage your accepted projects.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
                />
              </div>

              <button
                type="button"
                onClick={loadData}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw size={17} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
            <p className="text-sm text-yellow-700">Pending Requests</p>
            <h2 className="mt-1 text-3xl font-bold text-yellow-700">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm text-green-700">Accepted</p>
            <h2 className="mt-1 text-3xl font-bold text-green-700">
              {acceptedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <p className="text-sm text-red-700">Rejected</p>
            <h2 className="mt-1 text-3xl font-bold text-red-700">
              {rejectedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-700">My Active Projects</p>
            <h2 className="mt-1 text-3xl font-bold text-blue-700">
              {myProjects.length}
            </h2>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "requests"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Assignment Requests ({requests.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "projects"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            My Projects ({myProjects.length})
          </button>
        </div>

        {/* PROJECT TABLE */}
        {currentList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FolderKanban className="mx-auto mb-3 h-12 w-12 text-slate-300" />

            <h3 className="font-semibold text-slate-700">
              {activeTab === "requests"
                ? "No assignment requests found"
                : "No accepted projects found"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {activeTab === "requests"
                ? "New project requests will appear here."
                : "Projects you accept will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Project
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Client
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Priority
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Project Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Request Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Deadline
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {currentList.map((item) => {
                    const project = item.project || {};

                    return (
                      <tr
                        key={`${project._id}-${item.assignmentId}`}
                        onClick={() => openDetails(item)}
                        className="cursor-pointer transition hover:bg-blue-50/40"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                              <FolderKanban size={20} />
                            </div>

                            <div>
                              <p className="max-w-[220px] truncate font-semibold text-slate-800">
                                {project.title || "Untitled Project"}
                              </p>

                              <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                                {project.description || "No description"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {project.clientName || "N/A"}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                              project.priority
                            )}`}
                          >
                            {project.priority || "Medium"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getProjectStatusStyle(
                              project.status
                            )}`}
                          >
                            {project.status || "Planning"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getAssignmentStatusStyle(
                              item.status
                            )}`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar size={15} />
                            {formatDate(project.deadline)}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              title="View Details"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetails(item);
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                            >
                              <Eye size={17} />
                            </button>

                           {["Pending", "Accepted"].includes(item.status) && (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleReject(item);
    }}
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
  >
    <XCircle size={17} />
  </button>
)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {detailsModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDetailsModal(false)}
          />

          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                  <FolderKanban className="text-blue-600" />
                  Project Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete information about your assigned project.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailsModal(false)}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {selectedItem.project?.title ||
                        "Untitled Project"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Client: {selectedItem.project?.clientName || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                        selectedItem.project?.priority
                      )}`}
                    >
                      {selectedItem.project?.priority || "Medium"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getAssignmentStatusStyle(
                        selectedItem.status
                      )}`}
                    >
                      {selectedItem.status || "Pending"}
                    </span>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {selectedItem.project?.description ||
                    "No description available."}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Start Date</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {formatDate(
                      selectedItem.project?.startDate
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {formatDate(
                      selectedItem.project?.deadline
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Project Status</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedItem.project?.status || "Planning"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Requested On</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {formatDate(selectedItem.requestedAt)}
                  </p>
                </div>
              </div>

              {/* TECHNOLOGIES */}
              <div className="mt-6">
                <h4 className="font-bold text-slate-800">
                  Technologies
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedItem.project?.technologies?.length > 0 ? (
                    selectedItem.project.technologies.map(
                      (technology, index) => (
                        <span
                          key={`${technology}-${index}`}
                          className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                          {technology}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-sm text-slate-400">
                      No technologies added.
                    </span>
                  )}
                </div>
              </div>

              {/* ADMIN MESSAGE */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <h4 className="flex items-center gap-2 font-semibold text-blue-800">
                  <MessageSquare size={17} />
                  Admin Message
                </h4>

                <p className="mt-2 text-sm leading-6 text-blue-700">
                  {selectedItem.adminMessage ||
                    "No message from admin."}
                </p>
              </div>

              {/* STAFF RESPONSE */}
              {selectedItem.staffResponse && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="font-semibold text-slate-800">
                    Your Response
                  </h4>

                  <p className="mt-2 text-sm text-slate-600">
                    {selectedItem.staffResponse}
                  </p>
                </div>
              )}

              {/* WORK UPDATE FORM */}
              {selectedItem.status === "Accepted" && (
                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <MessageSquare size={18} />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-800">
                        Add Work Update
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        Add a short update about what you worked on in this project.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleAddWorkUpdate}
                    className="mt-5 space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        What did you work on?
                      </label>

                      <textarea
                        rows={4}
                        value={workForm.description}
                        onChange={(e) =>
                          setWorkForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Example: Completed the login page UI, added validation and connected the login API..."
                        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Hours Worked
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={workForm.hoursWorked}
                          onChange={(e) =>
                            setWorkForm((prev) => ({
                              ...prev,
                              hoursWorked: e.target.value,
                            }))
                          }
                          placeholder="Example: 4"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Work Status
                        </label>

                        <select
                          value={workForm.workStatus}
                          onChange={(e) =>
                            setWorkForm((prev) => ({
                              ...prev,
                              workStatus: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Blocked">
                            Blocked
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={workLoading}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {workLoading ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <MessageSquare size={18} />
                          Add Work Update
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* WORK PROGRESS HISTORY */}
              {selectedItem.status === "Accepted" && (
                <div className="mt-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">
                        Work Progress History
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        Your latest project activity and work logs.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {selectedItem.workUpdates?.length || 0} Updates
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedItem.workUpdates?.length > 0 ? (
                      [...selectedItem.workUpdates]
                        .reverse()
                        .map((update, index) => (
                          <div
                            key={update._id || index}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar size={14} />
                                {formatDate(update.date)}
                              </div>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  update.workStatus === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : update.workStatus === "Blocked"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {update.workStatus || "In Progress"}
                              </span>
                            </div>

                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
                              {update.description}
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                              <Clock3 size={14} />
                              Hours Worked:
                              <span className="font-bold text-slate-700">
                                {update.hoursWorked || 0}
                              </span>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                        <MessageSquare className="mx-auto h-9 w-9 text-slate-300" />

                        <p className="mt-3 text-sm font-medium text-slate-600">
                          No work updates added yet.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Add your first project work update above.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LINKS */}
              <div className="mt-6 flex flex-wrap gap-3">
                {selectedItem.project?.projectUrl && (
                  <a
                    href={selectedItem.project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <ExternalLink size={17} />
                    Open Live Project
                  </a>
                )}

                {selectedItem.project?.githubUrl && (
                  <a
                    href={selectedItem.project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-200"
                  >
                    <Github size={17} />
                    Open GitHub
                  </a>
                )}
              </div>

              {/* REQUEST ACTIONS */}
              {["Pending", "Rejected"].includes(selectedItem.status) && (
                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
                  {selectedItem.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => {
                        setDetailsModal(false);
                        handleReject(selectedItem);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700"
                    >
                      <XCircle size={17} />
                      Reject
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setDetailsModal(false);
                      handleAccept(selectedItem);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white hover:bg-green-700"
                  >
                    <UserCheck size={17} />
                    {selectedItem.status === "Rejected"
                      ? "Accept Now"
                      : "Accept Project"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAssignedProjects;
