// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// import {
//   FolderKanban,
//   Plus,
//   X,
//   Loader2,
//   Users,
//   Calendar,
//   Clock,
//   UserPlus,
//   Search,
//   Briefcase,
//   ExternalLink,
//   Github,
//   CheckCircle2,
//   Timer,
//   User,
//   Mail,
//   Send,
//   Edit,
//   Trash2,
//   Eye,
// } from "lucide-react";

// const AdminRunningProjects = () => {
//   // =====================================================
//   // STATES
//   // =====================================================

//   const [projects, setProjects] = useState([]);
//   const [staffList, setStaffList] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [createModal, setCreateModal] = useState(false);
//   const [assignModal, setAssignModal] = useState(false);
//   const [detailsModal, setDetailsModal] = useState(false);

//   const [createLoading, setCreateLoading] = useState(false);
//   const [assignLoading, setAssignLoading] = useState(false);
//   const [deleteLoadingId, setDeleteLoadingId] = useState(null);

//   const [selectedProject, setSelectedProject] = useState(null);

//   const [search, setSearch] = useState("");
//   const [staffSearch, setStaffSearch] = useState("");

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingProjectId, setEditingProjectId] = useState(null);

//   const adminToken =
//     sessionStorage.getItem("adminToken") || "";

//   const authHeaders = {
//     Authorization: `Bearer ${adminToken}`,
//   };

//   // =====================================================
//   // CREATE PROJECT FORM
//   // =====================================================

//   const initialProjectForm = {
//     title: "",
//     description: "",
//     clientName: "",
//     projectUrl: "",
//     githubUrl: "",
//     startDate: "",
//     deadline: "",
//     priority: "Medium",
//     status: "Planning",
//     technologies: "",
//   };

//   const [projectForm, setProjectForm] = useState(
//     initialProjectForm
//   );

//   // =====================================================
//   // ASSIGN STAFF FORM
//   // =====================================================

//   const [assignmentForm, setAssignmentForm] = useState({
//     staffId: "",
//     adminMessage: "",
//   });

//   // =====================================================
//   // GET RUNNING PROJECTS
//   // =====================================================

//   const getRunningProjects = async () => {
//     try {
//       const res = await axios.get(
//         "/api/admin/running-projects",
//         {
//           headers: authHeaders,
//         }
//       );

//       setProjects(res.data?.data || []);
//     } catch (error) {
//       console.error(
//         "Running project fetch error:",
//         error
//       );

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.message ||
//           "Failed to load running projects",
//       });
//     }
//   };

//   // =====================================================
//   // GET STAFF
//   // =====================================================

//   const getStaff = async () => {
//     try {
//       const res = await axios.get("/api/allstaff", {
//         headers: authHeaders,
//       });

//       const data =
//         res.data?.data ||
//         res.data?.staff ||
//         res.data ||
//         [];

//       setStaffList(
//         Array.isArray(data) ? data : []
//       );
//     } catch (error) {
//       console.error(
//         "Staff fetch error:",
//         error
//       );
//     }
//   };

//   // =====================================================
//   // LOAD DATA
//   // =====================================================

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       await Promise.all([
//         getRunningProjects(),
//         getStaff(),
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // =====================================================
//   // PROJECT INPUT HANDLER
//   // =====================================================

//   const handleProjectInput = (e) => {
//     const { name, value } = e.target;

//     setProjectForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // CREATE / UPDATE RUNNING PROJECT
//   // =====================================================

//   const formatDateForInput = (date) => {
//     if (!date) return "";
//     return new Date(date).toISOString().split("T")[0];
//   };

//   const openCreateModal = () => {
//     setIsEditMode(false);
//     setEditingProjectId(null);
//     setProjectForm(initialProjectForm);
//     setCreateModal(true);
//   };

//   const closeProjectModal = () => {
//     setCreateModal(false);
//     setIsEditMode(false);
//     setEditingProjectId(null);
//     setProjectForm(initialProjectForm);
//   };

//   const openEditModal = (project) => {
//     setIsEditMode(true);
//     setEditingProjectId(project._id);
//     setProjectForm({
//       title: project.title || "",
//       description: project.description || "",
//       clientName: project.clientName || "",
//       projectUrl: project.projectUrl || "",
//       githubUrl: project.githubUrl || "",
//       startDate: formatDateForInput(project.startDate),
//       deadline: formatDateForInput(project.deadline),
//       priority: project.priority || "Medium",
//       status: project.status || "Planning",
//       technologies: project.technologies?.join(", ") || "",
//     });
//     setCreateModal(true);
//   };

//   const handleSaveProject = async (e) => {
//     e.preventDefault();

//     try {
//       setCreateLoading(true);

//       const payload = {
//         ...projectForm,
//         technologies: projectForm.technologies
//           .split(",")
//           .map((tech) => tech.trim())
//           .filter(Boolean),
//       };

//       let res;

//       if (isEditMode) {
//         res = await axios.put(
//           `/api/admin/running-projects/${editingProjectId}`,
//           payload,
//           { headers: authHeaders }
//         );
//       } else {
//         res = await axios.post(
//           "/api/admin/running-projects",
//           payload,
//           { headers: authHeaders }
//         );
//       }

//       Swal.fire({
//         icon: "success",
//         title: isEditMode ? "Project Updated" : "Project Created",
//         text:
//           res.data?.message ||
//           (isEditMode
//             ? "Project updated successfully"
//             : "Project created successfully"),
//         timer: 1800,
//         showConfirmButton: false,
//       });

//       closeProjectModal();
//       await getRunningProjects();
//     } catch (error) {
//       console.error("Save project error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to save project",
//       });
//     } finally {
//       setCreateLoading(false);
//     }
//   };

//   const handleDeleteProject = async (project) => {
//     const result = await Swal.fire({
//       title: "Delete Project?",
//       text: `"${project.title}" will be permanently deleted.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc2626",
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       setDeleteLoadingId(project._id);

//       const res = await axios.delete(
//         `/api/admin/running-projects/${project._id}`,
//         { headers: authHeaders }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: res.data?.message || "Project deleted successfully",
//         timer: 1600,
//         showConfirmButton: false,
//       });

//       await getRunningProjects();
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text: error.response?.data?.message || "Unable to delete project",
//       });
//     } finally {
//       setDeleteLoadingId(null);
//     }
//   };

//   const openProjectDetails = (project) => {
//     setSelectedProject(project);
//     setDetailsModal(true);
//   };

//   const getProjectAssignments = (projectId) => {
//     return staffList
//       .map((staff) => {
//         const assignment = staff.runningProjects?.find(
//           (item) =>
//             String(item.project?._id || item.project) === String(projectId)
//         );

//         if (!assignment) return null;

//         return { staff, assignment };
//       })
//       .filter(Boolean);
//   };

//   const getAcceptedCount = (projectId) =>
//     getProjectAssignments(projectId).filter(
//       (item) => item.assignment.status === "Accepted"
//     ).length;

//   const getPendingCount = (projectId) =>
//     getProjectAssignments(projectId).filter(
//       (item) => item.assignment.status === "Pending"
//     ).length;

//   // =====================================================
//   // OPEN ASSIGN MODAL
//   // =====================================================

//   const openAssignModal = (project) => {
//     setSelectedProject(project);

//     setAssignmentForm({
//       staffId: "",
//       adminMessage: "",
//     });

//     setStaffSearch("");

//     setAssignModal(true);
//   };

//   // =====================================================
//   // ASSIGN PROJECT TO STAFF
//   // =====================================================

//   const handleAssignProject = async (e) => {
//     e.preventDefault();

//     if (!assignmentForm.staffId) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select Staff",
//         text:
//           "Please select a staff member first.",
//       });

//       return;
//     }

//     try {
//       setAssignLoading(true);

//       const res = await axios.post(
//         `/api/admin/running-projects/${selectedProject._id}/assign`,
//         assignmentForm,
//         {
//           headers: authHeaders,
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Request Sent",
//         text:
//           res.data?.message ||
//           "Project assignment request sent successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setAssignModal(false);
//       setSelectedProject(null);

//       setAssignmentForm({
//         staffId: "",
//         adminMessage: "",
//       });

//       await Promise.all([
//         getRunningProjects(),
//         getStaff(),
//       ]);
//     } catch (error) {
//       console.error(
//         "Assign project error:",
//         error
//       );

//       Swal.fire({
//         icon: "error",
//         title: "Assignment Failed",
//         text:
//           error.response?.data?.message ||
//           "Failed to assign project",
//       });
//     } finally {
//       setAssignLoading(false);
//     }
//   };

//   // =====================================================
//   // FILTER PROJECTS
//   // =====================================================

//   const filteredProjects = useMemo(() => {
//     const text = search
//       .toLowerCase()
//       .trim();

//     if (!text) {
//       return projects;
//     }

//     return projects.filter((project) => {
//       return (
//         project.title
//           ?.toLowerCase()
//           .includes(text) ||
//         project.clientName
//           ?.toLowerCase()
//           .includes(text) ||
//         project.status
//           ?.toLowerCase()
//           .includes(text) ||
//         project.priority
//           ?.toLowerCase()
//           .includes(text)
//       );
//     });
//   }, [projects, search]);

//   // =====================================================
//   // FILTER STAFF
//   // =====================================================

//   const filteredStaff = useMemo(() => {
//     const text = staffSearch
//       .toLowerCase()
//       .trim();

//     return staffList.filter((staff) => {
//       if (!text) return true;

//       return (
//         staff.name
//           ?.toLowerCase()
//           .includes(text) ||
//         staff.email
//           ?.toLowerCase()
//           .includes(text) ||
//         staff.staffId
//           ?.toLowerCase()
//           .includes(text) ||
//         staff.designation
//           ?.toLowerCase()
//           .includes(text)
//       );
//     });
//   }, [staffList, staffSearch]);

//   // =====================================================
//   // HELPERS
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "N/A";

//     return new Date(date).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   const getPriorityStyle = (priority) => {
//     if (priority === "Urgent") {
//       return "bg-red-100 text-red-700 border-red-200";
//     }

//     if (priority === "High") {
//       return "bg-orange-100 text-orange-700 border-orange-200";
//     }

//     if (priority === "Medium") {
//       return "bg-yellow-100 text-yellow-700 border-yellow-200";
//     }

//     return "bg-green-100 text-green-700 border-green-200";
//   };

//   const getStatusStyle = (status) => {
//     if (status === "Completed") {
//       return "bg-green-100 text-green-700";
//     }

//     if (status === "In Progress") {
//       return "bg-blue-100 text-blue-700";
//     }

//     if (status === "On Hold") {
//       return "bg-yellow-100 text-yellow-700";
//     }

//     if (status === "Cancelled") {
//       return "bg-red-100 text-red-700";
//     }

//     return "bg-slate-100 text-slate-700";
//   };

//   // =====================================================
//   // LOADER
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center">
//         <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-7xl">

//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}

//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <div className="flex items-center gap-3">

//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
//                 <FolderKanban size={25} />
//               </div>

//               <div>
//                 <h1 className="text-2xl font-bold text-slate-800">
//                   Running Projects
//                 </h1>

//                 <p className="text-sm text-slate-500">
//                   Create projects and assign them to staff members.
//                 </p>
//               </div>

//             </div>


//             <div className="flex flex-col gap-3 sm:flex-row">

//               <div className="relative">

//                 <Search
//                   size={18}
//                   className="absolute left-3 top-3 text-slate-400"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Search projects..."
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                   className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
//                 />

//               </div>


//               <button
//                 onClick={openCreateModal}
//                 className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
//               >
//                 <Plus size={18} />

//                 Create Project
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ================================================= */}
//         {/* PROJECT STATS */}
//         {/* ================================================= */}

//         <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//             <p className="text-sm text-slate-500">
//               Total Projects
//             </p>

//             <h2 className="mt-1 text-3xl font-bold text-slate-800">
//               {projects.length}
//             </h2>
//           </div>


//           <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
//             <p className="text-sm text-blue-600">
//               In Progress
//             </p>

//             <h2 className="mt-1 text-3xl font-bold text-blue-700">
//               {
//                 projects.filter(
//                   (item) =>
//                     item.status ===
//                     "In Progress"
//                 ).length
//               }
//             </h2>
//           </div>


//           <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
//             <p className="text-sm text-green-600">
//               Completed
//             </p>

//             <h2 className="mt-1 text-3xl font-bold text-green-700">
//               {
//                 projects.filter(
//                   (item) =>
//                     item.status ===
//                     "Completed"
//                 ).length
//               }
//             </h2>
//           </div>


//           <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
//             <p className="text-sm text-yellow-700">
//               Total Staff Assigned
//             </p>

//             <h2 className="mt-1 text-3xl font-bold text-yellow-700">
//               {projects.reduce(
//                 (total, project) =>
//                   total + getAcceptedCount(project._id),
//                 0
//               )}
//             </h2>
//           </div>

//         </div>


//         {/* ================================================= */}
//         {/* PROJECT TABLE */}
//         {/* ================================================= */}

//         {filteredProjects.length === 0 ? (
//           <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
//             <FolderKanban className="mx-auto mb-3 h-12 w-12 text-slate-300" />
//             <h3 className="font-semibold text-slate-700">
//               No running projects found
//             </h3>
//             <p className="mt-1 text-sm text-slate-500">
//               Create your first running project.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1100px]">
//                 <thead className="border-b border-slate-200 bg-slate-50">
//                   <tr>
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Project</th>
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Client</th>
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</th>
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Deadline</th>
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Accepted</th>
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Pending</th>
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-100">
//                   {filteredProjects.map((project) => (
//                     <tr
//                       key={project._id}
//                       onClick={() => openProjectDetails(project)}
//                       className="cursor-pointer transition hover:bg-blue-50/40"
//                     >
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//                             <FolderKanban size={21} />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="max-w-[220px] truncate font-semibold text-slate-800">{project.title}</p>
//                             <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">{project.description}</p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-5 py-4 text-sm text-slate-700">
//                         {project.clientName || "N/A"}
//                       </td>

//                       <td className="px-5 py-4">
//                         <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(project.priority)}`}>
//                           {project.priority}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(project.status)}`}>
//                           {project.status}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-2 text-sm text-slate-600">
//                           <Calendar size={15} />
//                           {formatDate(project.deadline)}
//                         </div>
//                       </td>

//                       <td className="px-5 py-4 text-center">
//                         <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-sm font-bold text-green-700">
//                           {getAcceptedCount(project._id)}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4 text-center">
//                         <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-700">
//                           {getPendingCount(project._id)}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <div className="flex items-center justify-center gap-2">
                         

//                           <button
//                             type="button"
//                             title="Assign Staff"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openAssignModal(project);
//                             }}
//                             className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
//                           >
//                             <UserPlus size={17} />
//                           </button>

//                           <button
//                             type="button"
//                             title="Edit Project"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openEditModal(project);
//                             }}
//                             className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100"
//                           >
//                             <Edit size={17} />
//                           </button>

//                           <button
//                             type="button"
//                             title="Delete Project"
//                             disabled={deleteLoadingId === project._id}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteProject(project);
//                             }}
//                             className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
//                           >
//                             {deleteLoadingId === project._id ? (
//                               <Loader2 size={17} className="animate-spin" />
//                             ) : (
//                               <Trash2 size={17} />
//                             )}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//       </div>


//       {/* ================================================= */}
//       {/* CREATE PROJECT MODAL */}
//       {/* ================================================= */}

//       {createModal && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//           <div
//             className="absolute inset-0 bg-black/50"
//             onClick={closeProjectModal}
//           />


//           <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             {/* MODAL HEADER */}

//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

//               <div>

//                 <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">

//                   {isEditMode ? (
//                     <Edit className="text-indigo-600" />
//                   ) : (
//                     <Plus className="text-blue-600" />
//                   )}

//                   {isEditMode
//                     ? "Update Running Project"
//                     : "Create Running Project"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {isEditMode
//                     ? "Update project information."
//                     : "Add a new project to your running project list."}
//                 </p>

//               </div>


//               <button
//                 type="button"
//                 onClick={closeProjectModal}
//                 className="rounded-full p-2 hover:bg-slate-100"
//               >
//                 <X size={21} />
//               </button>

//             </div>


//             {/* FORM */}

//             <form
//               onSubmit={handleSaveProject}
//               className="p-6"
//             >

//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

//                 {/* TITLE */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Project Title *
//                   </label>

//                   <input
//                     type="text"
//                     name="title"
//                     value={projectForm.title}
//                     onChange={handleProjectInput}
//                     required
//                     placeholder="Salon Booking System"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* CLIENT */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Client Name
//                   </label>

//                   <input
//                     type="text"
//                     name="clientName"
//                     value={
//                       projectForm.clientName
//                     }
//                     onChange={handleProjectInput}
//                     placeholder="ABC Salon"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* START DATE */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Start Date *
//                   </label>

//                   <input
//                     type="date"
//                     name="startDate"
//                     value={
//                       projectForm.startDate
//                     }
//                     onChange={handleProjectInput}
//                     required
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* DEADLINE */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Deadline *
//                   </label>

//                   <input
//                     type="date"
//                     name="deadline"
//                     value={
//                       projectForm.deadline
//                     }
//                     onChange={handleProjectInput}
//                     required
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* PRIORITY */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Priority
//                   </label>

//                   <select
//                     name="priority"
//                     value={
//                       projectForm.priority
//                     }
//                     onChange={handleProjectInput}
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Low">
//                       Low
//                     </option>

//                     <option value="Medium">
//                       Medium
//                     </option>

//                     <option value="High">
//                       High
//                     </option>

//                     <option value="Urgent">
//                       Urgent
//                     </option>
//                   </select>
//                 </div>


//                 {/* STATUS */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Project Status
//                   </label>

//                   <select
//                     name="status"
//                     value={
//                       projectForm.status
//                     }
//                     onChange={handleProjectInput}
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Planning">
//                       Planning
//                     </option>

//                     <option value="In Progress">
//                       In Progress
//                     </option>

//                     <option value="On Hold">
//                       On Hold
//                     </option>

//                     <option value="Completed">
//                       Completed
//                     </option>

//                     <option value="Cancelled">
//                       Cancelled
//                     </option>
//                   </select>
//                 </div>


//                 {/* PROJECT URL */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Project URL
//                   </label>

//                   <input
//                     type="url"
//                     name="projectUrl"
//                     value={
//                       projectForm.projectUrl
//                     }
//                     onChange={handleProjectInput}
//                     placeholder="https://project.com"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* GITHUB URL */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     GitHub URL
//                   </label>

//                   <input
//                     type="url"
//                     name="githubUrl"
//                     value={
//                       projectForm.githubUrl
//                     }
//                     onChange={handleProjectInput}
//                     placeholder="https://github.com/..."
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>


//                 {/* TECHNOLOGIES */}

//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Technologies
//                   </label>

//                   <input
//                     type="text"
//                     name="technologies"
//                     value={
//                       projectForm.technologies
//                     }
//                     onChange={handleProjectInput}
//                     placeholder="React, Node.js, Express, MongoDB"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />

//                   <p className="mt-1 text-xs text-slate-400">
//                     Separate technologies with commas.
//                   </p>
//                 </div>


//                 {/* DESCRIPTION */}

//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Project Description *
//                   </label>

//                   <textarea
//                     name="description"
//                     value={
//                       projectForm.description
//                     }
//                     onChange={handleProjectInput}
//                     required
//                     rows={5}
//                     placeholder="Describe the project..."
//                     className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//               </div>


//               {/* BUTTONS */}

//               <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setCreateModal(false)
//                   }
//                   className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="submit"
//                   disabled={createLoading}
//                   className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//                 >

//                   {createLoading ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       {isEditMode ? "Updating..." : "Creating..."}
//                     </>
//                   ) : (
//                     <>
//                       {isEditMode ? (
//                         <Edit size={18} />
//                       ) : (
//                         <Plus size={18} />
//                       )}

//                       {isEditMode ? "Update Project" : "Create Project"}
//                     </>
//                   )}

//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}


//       {/* ================================================= */}
//       {/* PROJECT DETAILS MODAL */}
//       {/* ================================================= */}

//       {detailsModal && selectedProject && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/50"
//             onClick={() => setDetailsModal(false)}
//           />

//           <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
//             <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
//               <div>
//                 <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
//                   <FolderKanban className="text-blue-600" />
//                   Project Details
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Complete project and assignment details.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setDetailsModal(false)}
//                 className="rounded-full p-2 hover:bg-slate-100"
//               >
//                 <X size={21} />
//               </button>
//             </div>

//             <div className="p-6">
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                 <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-800">
//                       {selectedProject.title}
//                     </h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Client: {selectedProject.clientName || "N/A"}
//                     </p>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(selectedProject.priority)}`}>
//                       {selectedProject.priority}
//                     </span>
//                     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(selectedProject.status)}`}>
//                       {selectedProject.status}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
//                   {selectedProject.description}
//                 </p>
//               </div>

//               <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <div className="rounded-xl border border-slate-200 p-4">
//                   <p className="text-xs text-slate-500">Start Date</p>
//                   <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedProject.startDate)}</p>
//                 </div>
//                 <div className="rounded-xl border border-slate-200 p-4">
//                   <p className="text-xs text-slate-500">Deadline</p>
//                   <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedProject.deadline)}</p>
//                 </div>
//                 <div className="rounded-xl border border-green-200 bg-green-50 p-4">
//                   <p className="text-xs text-green-600">Accepted Staff</p>
//                   <p className="mt-1 text-2xl font-bold text-green-700">{getAcceptedCount(selectedProject._id)}</p>
//                 </div>
//                 <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
//                   <p className="text-xs text-yellow-700">Pending Requests</p>
//                   <p className="mt-1 text-2xl font-bold text-yellow-700">{getPendingCount(selectedProject._id)}</p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h4 className="font-bold text-slate-800">Technologies</h4>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedProject.technologies?.length > 0 ? (
//                     selectedProject.technologies.map((technology, index) => (
//                       <span
//                         key={`${technology}-${index}`}
//                         className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
//                       >
//                         {technology}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-sm text-slate-400">No technologies added.</span>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-wrap gap-3">
//                 {selectedProject.projectUrl && (
//                   <a
//                     href={selectedProject.projectUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-medium text-blue-600 hover:bg-blue-100"
//                   >
//                     <ExternalLink size={17} />
//                     Open Live Project
//                   </a>
//                 )}
//                 {selectedProject.githubUrl && (
//                   <a
//                     href={selectedProject.githubUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-200"
//                   >
//                     <Github size={17} />
//                     Open GitHub
//                   </a>
//                 )}
//               </div>

//               <div className="mt-8">
//                 <h4 className="flex items-center gap-2 font-bold text-slate-800">
//                   <Users size={19} />
//                   Staff Assignment Details
//                 </h4>

//                 <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
//                   <table className="w-full min-w-[800px]">
//                     <thead className="bg-slate-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Staff</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Admin Message</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Staff Response</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                       {getProjectAssignments(selectedProject._id).length > 0 ? (
//                         getProjectAssignments(selectedProject._id).map(({ staff, assignment }) => (
//                           <tr key={assignment._id || staff._id}>
//                             <td className="px-4 py-3">
//                               <p className="font-semibold text-slate-800">{staff.name}</p>
//                               <p className="text-xs text-slate-500">
//                                 {staff.staffId} • {staff.designation || staff.category || "Staff"}
//                               </p>
//                             </td>
//                             <td className="px-4 py-3">
//                               <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//                                 assignment.status === "Accepted"
//                                   ? "bg-green-100 text-green-700"
//                                   : assignment.status === "Pending"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : assignment.status === "Rejected"
//                                   ? "bg-red-100 text-red-700"
//                                   : "bg-slate-100 text-slate-600"
//                               }`}>
//                                 {assignment.status}
//                               </span>
//                             </td>
//                             <td className="max-w-[240px] px-4 py-3 text-sm text-slate-600">
//                               {assignment.adminMessage || "-"}
//                             </td>
//                             <td className="max-w-[240px] px-4 py-3 text-sm text-slate-600">
//                               {assignment.staffResponse || "-"}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" className="py-8 text-center text-sm text-slate-500">
//                             No staff assignment requests found.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const project = selectedProject;
//                     setDetailsModal(false);
//                     openAssignModal(project);
//                   }}
//                   className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
//                 >
//                   <UserPlus size={17} />
//                   Assign Staff
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     const project = selectedProject;
//                     setDetailsModal(false);
//                     openEditModal(project);
//                   }}
//                   className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700"
//                 >
//                   <Edit size={17} />
//                   Edit Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* ================================================= */}
//       {/* ASSIGN STAFF MODAL */}
//       {/* ================================================= */}

//       {assignModal && selectedProject && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//           <div
//             className="absolute inset-0 bg-black/50"
//             onClick={() =>
//               setAssignModal(false)
//             }
//           />


//           <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             {/* HEADER */}

//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

//               <div>

//                 <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">

//                   <UserPlus className="text-blue-600" />

//                   Assign Project
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedProject.title}
//                 </p>

//               </div>


//               <button
//                 type="button"
//                 onClick={() =>
//                   setAssignModal(false)
//                 }
//                 className="rounded-full p-2 hover:bg-slate-100"
//               >
//                 <X size={21} />
//               </button>

//             </div>


//             <form
//               onSubmit={handleAssignProject}
//               className="p-6"
//             >

//               {/* SEARCH STAFF */}

//               <div className="relative mb-4">

//                 <Search
//                   size={18}
//                   className="absolute left-3 top-3 text-slate-400"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Search staff by name, ID, email..."
//                   value={staffSearch}
//                   onChange={(e) =>
//                     setStaffSearch(
//                       e.target.value
//                     )
//                   }
//                   className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//               </div>


//               {/* STAFF LIST */}

//               <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-2">

//                 {filteredStaff.length > 0 ? (

//                   filteredStaff.map((staff) => {

//                     const selected =
//                       assignmentForm.staffId ===
//                       staff._id;

//                     const assignment =
//                       staff.runningProjects?.find(
//                         (item) =>
//                           String(
//                             item.project?._id ||
//                             item.project
//                           ) ===
//                           String(selectedProject._id)
//                       );

//                     return (

//                       <label
//                         key={staff._id}
//                         className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
//                           selected
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-transparent hover:bg-slate-50"
//                         }`}
//                       >

//                         <div className="flex items-center gap-3">

//                           <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-blue-100">

//                             {staff.profileImage ? (

//                               <img
//                                 src={
//                                   staff.profileImage
//                                 }
//                                 alt={
//                                   staff.name
//                                 }
//                                 className="h-full w-full object-cover"
//                               />

//                             ) : (

//                               <User
//                                 size={20}
//                                 className="text-blue-600"
//                               />

//                             )}

//                           </div>


//                           <div>

//                             <p className="font-semibold text-slate-800">
//                               {staff.name}
//                             </p>

//                             <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">

//                               <span>
//                                 {staff.staffId}
//                               </span>

//                               <span>
//                                 •
//                               </span>

//                               <span>
//                                 {staff.designation ||
//                                   staff.category}
//                               </span>

//                             </div>

//                           </div>

//                         </div>


//                         <div className="flex items-center gap-3">

//                           {assignment && (

//                             <span
//                               className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//                                 assignment.status ===
//                                 "Accepted"
//                                   ? "bg-green-100 text-green-700"
//                                   : assignment.status ===
//                                     "Pending"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-slate-100 text-slate-600"
//                               }`}
//                             >
//                               {assignment.status}
//                             </span>

//                           )}


//                           <input
//                             type="radio"
//                             name="staffId"
//                             value={staff._id}
//                             checked={selected}
//                             onChange={(e) =>
//                               setAssignmentForm(
//                                 (prev) => ({
//                                   ...prev,
//                                   staffId:
//                                     e.target
//                                       .value,
//                                 })
//                               )
//                             }
//                             className="h-4 w-4 accent-blue-600"
//                           />

//                         </div>

//                       </label>

//                     );
//                   })

//                 ) : (

//                   <div className="py-8 text-center text-sm text-slate-500">
//                     No staff members found.
//                   </div>

//                 )}

//               </div>


//               {/* SELECTED STAFF */}

//               {assignmentForm.staffId && (

//                 <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">

//                   <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
//                     <CheckCircle2 size={17} />

//                     Staff Selected
//                   </div>

//                   <p className="mt-1 text-sm text-green-700">
//                     {
//                       staffList.find(
//                         (staff) =>
//                           staff._id ===
//                           assignmentForm.staffId
//                       )?.name
//                     }
//                   </p>

//                 </div>

//               )}


//               {/* ADMIN MESSAGE */}

//               <div className="mt-5">

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Assignment Message
//                 </label>

//                 <textarea
//                   value={
//                     assignmentForm.adminMessage
//                   }
//                   onChange={(e) =>
//                     setAssignmentForm(
//                       (prev) => ({
//                         ...prev,
//                         adminMessage:
//                           e.target.value,
//                       })
//                     )
//                   }
//                   rows={4}
//                   placeholder="Please review this project and accept the assignment request..."
//                   className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//               </div>


//               {/* BUTTONS */}

//               <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setAssignModal(false)
//                   }
//                   className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="submit"
//                   disabled={
//                     assignLoading ||
//                     !assignmentForm.staffId
//                   }
//                   className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >

//                   {assignLoading ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={18} />

//                       Send Assignment
//                     </>
//                   )}

//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default AdminRunningProjects;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FolderKanban,
  Plus,
  X,
  Loader2,
  Users,
  Calendar,
  Clock,
  UserPlus,
  Search,
  Briefcase,
  ExternalLink,
  Github,
  CheckCircle2,
  Timer,
  User,
  Mail,
  Send,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const AdminRunningProjects = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [projects, setProjects] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [createModal, setCreateModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [removeLoadingKey, setRemoveLoadingKey] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null);

  const [search, setSearch] = useState("");
  const [staffSearch, setStaffSearch] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const adminToken =
    sessionStorage.getItem("adminToken") || "";

  const authHeaders = {
    Authorization: `Bearer ${adminToken}`,
  };

  // =====================================================
  // CREATE PROJECT FORM
  // =====================================================

  const initialProjectForm = {
    title: "",
    description: "",
    clientName: "",
    projectUrl: "",
    githubUrl: "",
    startDate: "",
    deadline: "",
    priority: "Medium",
    status: "Planning",
    technologies: "",
  };

  const [projectForm, setProjectForm] = useState(
    initialProjectForm
  );

  // =====================================================
  // ASSIGN STAFF FORM
  // =====================================================

  const [assignmentForm, setAssignmentForm] = useState({
    staffIds: [],
    adminMessage: "",
  });

  // =====================================================
  // GET RUNNING PROJECTS
  // =====================================================

  const getRunningProjects = async () => {
    try {
      const res = await axios.get(
        "/api/admin/running-projects",
        {
          headers: authHeaders,
        }
      );

      setProjects(res.data?.data || []);
    } catch (error) {
      console.error(
        "Running project fetch error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to load running projects",
      });
    }
  };

  // =====================================================
  // GET STAFF
  // =====================================================

  const getStaff = async () => {
    try {
      const res = await axios.get("/api/allstaff", {
        headers: authHeaders,
      });

      const data =
        res.data?.data ||
        res.data?.staff ||
        res.data ||
        [];

      setStaffList(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Staff fetch error:",
        error
      );
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        getRunningProjects(),
        getStaff(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // PROJECT INPUT HANDLER
  // =====================================================

  const handleProjectInput = (e) => {
    const { name, value } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE / UPDATE RUNNING PROJECT
  // =====================================================

  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setEditingProjectId(null);
    setProjectForm(initialProjectForm);
    setCreateModal(true);
  };

  const closeProjectModal = () => {
    setCreateModal(false);
    setIsEditMode(false);
    setEditingProjectId(null);
    setProjectForm(initialProjectForm);
  };

  const openEditModal = (project) => {
    setIsEditMode(true);
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      clientName: project.clientName || "",
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      startDate: formatDateForInput(project.startDate),
      deadline: formatDateForInput(project.deadline),
      priority: project.priority || "Medium",
      status: project.status || "Planning",
      technologies: project.technologies?.join(", ") || "",
    });
    setCreateModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();

    try {
      setCreateLoading(true);

      const payload = {
        ...projectForm,
        technologies: projectForm.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      let res;

      if (isEditMode) {
        res = await axios.put(
          `/api/admin/running-projects/${editingProjectId}`,
          payload,
          { headers: authHeaders }
        );
      } else {
        res = await axios.post(
          "/api/admin/running-projects",
          payload,
          { headers: authHeaders }
        );
      }

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Project Updated" : "Project Created",
        text:
          res.data?.message ||
          (isEditMode
            ? "Project updated successfully"
            : "Project created successfully"),
        timer: 1800,
        showConfirmButton: false,
      });

      closeProjectModal();
      await getRunningProjects();
    } catch (error) {
      console.error("Save project error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save project",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteProject = async (project) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: `"${project.title}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setDeleteLoadingId(project._id);

      const res = await axios.delete(
        `/api/admin/running-projects/${project._id}`,
        { headers: authHeaders }
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: res.data?.message || "Project deleted successfully",
        timer: 1600,
        showConfirmButton: false,
      });

      await getRunningProjects();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.response?.data?.message || "Unable to delete project",
      });
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setDetailsModal(true);
  };

  const getProjectAssignments = (projectId) => {
    return staffList
      .map((staff) => {
        const assignment = staff.runningProjects?.find(
          (item) =>
            String(item.project?._id || item.project) === String(projectId)
        );

        if (!assignment) return null;

        return { staff, assignment };
      })
      .filter(Boolean);
  };

  const getAcceptedCount = (projectId) =>
    getProjectAssignments(projectId).filter(
      (item) => item.assignment.status === "Accepted"
    ).length;

  const getPendingCount = (projectId) =>
    getProjectAssignments(projectId).filter(
      (item) => item.assignment.status === "Pending"
    ).length;

  // =====================================================
  // OPEN ASSIGN MODAL
  // =====================================================

  const openAssignModal = (project) => {
    setSelectedProject(project);

    setAssignmentForm({
      staffIds: [],
      adminMessage: "",
    });

    setStaffSearch("");

    setAssignModal(true);
  };

  // =====================================================
  // MULTI SELECT HELPERS
  // =====================================================

  const toggleStaffSelection = (staffId) => {
    setAssignmentForm((prev) => {
      const alreadySelected = prev.staffIds.includes(staffId);

      return {
        ...prev,
        staffIds: alreadySelected
          ? prev.staffIds.filter((id) => id !== staffId)
          : [...prev.staffIds, staffId],
      };
    });
  };

  const getAssignableVisibleStaffIds = () => {
    return filteredStaff
      .filter((staff) => {
        const assignment = staff.runningProjects?.find(
          (item) =>
            String(item.project?._id || item.project) ===
            String(selectedProject?._id)
        );

        return ![
          "Pending",
          "Accepted",
        ].includes(assignment?.status);
      })
      .map((staff) => staff._id);
  };

  const selectAllVisibleStaff = () => {
    const visibleIds = getAssignableVisibleStaffIds();

    setAssignmentForm((prev) => ({
      ...prev,
      staffIds: Array.from(
        new Set([...prev.staffIds, ...visibleIds])
      ),
    }));
  };

  const clearSelectedStaff = () => {
    setAssignmentForm((prev) => ({
      ...prev,
      staffIds: [],
    }));
  };

  // =====================================================
  // ASSIGN PROJECT TO MULTIPLE STAFF
  // Uses the existing single-staff backend endpoint.
  // =====================================================

  const handleAssignProject = async (e) => {
    e.preventDefault();

    if (assignmentForm.staffIds.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select Staff",
        text: "Please select at least one staff member.",
      });
      return;
    }

    try {
      setAssignLoading(true);

      const results = await Promise.allSettled(
        assignmentForm.staffIds.map((staffId) =>
          axios.post(
            `/api/admin/running-projects/${selectedProject._id}/assign`,
            {
              staffId,
              adminMessage: assignmentForm.adminMessage,
            },
            {
              headers: authHeaders,
            }
          )
        )
      );

      const successCount = results.filter(
        (result) => result.status === "fulfilled"
      ).length;

      const failedResults = results.filter(
        (result) => result.status === "rejected"
      );

      const failedMessages = failedResults
        .map(
          (result) =>
            result.reason?.response?.data?.message ||
            "Assignment failed"
        )
        .filter(Boolean);

      if (successCount > 0) {
        Swal.fire({
          icon: failedResults.length > 0 ? "warning" : "success",
          title:
            failedResults.length > 0
              ? "Partially Assigned"
              : "Assignments Sent",
          text:
            failedResults.length > 0
              ? `${successCount} assignment(s) sent successfully. ${failedResults.length} failed.`
              : `${successCount} assignment request(s) sent successfully.`,
          footer:
            failedMessages.length > 0
              ? failedMessages.slice(0, 3).join(" | ")
              : undefined,
        });
      } else {
        throw failedResults[0]?.reason || new Error("All assignments failed");
      }

      setAssignModal(false);
      setAssignmentForm({
        staffIds: [],
        adminMessage: "",
      });

      await Promise.all([
        getRunningProjects(),
        getStaff(),
      ]);
    } catch (error) {
      console.error("Assign project error:", error);

      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to assign project",
      });
    } finally {
      setAssignLoading(false);
    }
  };

  // =====================================================
  // REMOVE STAFF FROM PROJECT
  // =====================================================

  const handleRemoveStaffFromProject = async (
    staff,
    assignment,
    projectId
  ) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove Staff?",
      text: `Remove ${staff.name} from this project? Their saved work history will remain in the staff record unless your backend deletes it.`,
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    const loadingKey = `${staff._id}-${projectId}`;

    try {
      setRemoveLoadingKey(loadingKey);

      const res = await axios.patch(
        `/api/admin/staff/${staff._id}/running-projects/${projectId}/remove`,
        {},
        {
          headers: authHeaders,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Staff Removed",
        text:
          res.data?.message ||
          `${staff.name} removed from the project.`,
        timer: 1700,
        showConfirmButton: false,
      });

      await getStaff();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Remove Failed",
        text:
          error.response?.data?.message ||
          "Unable to remove staff from project.",
      });
    } finally {
      setRemoveLoadingKey(null);
    }
  };

  // =====================================================
  // FILTER PROJECTS
  // =====================================================

  const filteredProjects = useMemo(() => {
    const text = search
      .toLowerCase()
      .trim();

    if (!text) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.title
          ?.toLowerCase()
          .includes(text) ||
        project.clientName
          ?.toLowerCase()
          .includes(text) ||
        project.status
          ?.toLowerCase()
          .includes(text) ||
        project.priority
          ?.toLowerCase()
          .includes(text)
      );
    });
  }, [projects, search]);

  // =====================================================
  // FILTER STAFF
  // =====================================================

  const filteredStaff = useMemo(() => {
    const text = staffSearch
      .toLowerCase()
      .trim();

    return staffList.filter((staff) => {
      if (!text) return true;

      return (
        staff.name
          ?.toLowerCase()
          .includes(text) ||
        staff.email
          ?.toLowerCase()
          .includes(text) ||
        staff.staffId
          ?.toLowerCase()
          .includes(text) ||
        staff.designation
          ?.toLowerCase()
          .includes(text)
      );
    });
  }, [staffList, staffSearch]);

  // =====================================================
  // HELPERS
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWorkStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Blocked") {
      return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
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

  const getStatusStyle = (status) => {
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

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FolderKanban size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Running Projects
                </h1>

                <p className="text-sm text-slate-500">
                  Create projects and assign them to staff members.
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
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
                />

              </div>


              <button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />

                Create Project
              </button>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROJECT STATS */}
        {/* ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Projects
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-800">
              {projects.length}
            </h2>
          </div>


          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-600">
              In Progress
            </p>

            <h2 className="mt-1 text-3xl font-bold text-blue-700">
              {
                projects.filter(
                  (item) =>
                    item.status ===
                    "In Progress"
                ).length
              }
            </h2>
          </div>


          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm text-green-600">
              Completed
            </p>

            <h2 className="mt-1 text-3xl font-bold text-green-700">
              {
                projects.filter(
                  (item) =>
                    item.status ===
                    "Completed"
                ).length
              }
            </h2>
          </div>


          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
            <p className="text-sm text-yellow-700">
              Total Staff Assigned
            </p>

            <h2 className="mt-1 text-3xl font-bold text-yellow-700">
              {projects.reduce(
                (total, project) =>
                  total + getAcceptedCount(project._id),
                0
              )}
            </h2>
          </div>

        </div>


        {/* ================================================= */}
        {/* PROJECT TABLE */}
        {/* ================================================= */}

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FolderKanban className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <h3 className="font-semibold text-slate-700">
              No running projects found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create your first running project.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Project</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Client</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Deadline</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Accepted</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Pending</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      onClick={() => openProjectDetails(project)}
                      className="cursor-pointer transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <FolderKanban size={21} />
                          </div>
                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate font-semibold text-slate-800">{project.title}</p>
                            <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">{project.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {project.clientName || "N/A"}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(project.priority)}`}>
                          {project.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(project.status)}`}>
                          {project.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={15} />
                          {formatDate(project.deadline)}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-sm font-bold text-green-700">
                          {getAcceptedCount(project._id)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-700">
                          {getPendingCount(project._id)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                         

                          <button
                            type="button"
                            title="Assign Staff"
                            onClick={(e) => {
                              e.stopPropagation();
                              openAssignModal(project);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          >
                            <UserPlus size={17} />
                          </button>

                          <button
                            type="button"
                            title="Edit Project"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(project);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            type="button"
                            title="Delete Project"
                            disabled={deleteLoadingId === project._id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            {deleteLoadingId === project._id ? (
                              <Loader2 size={17} className="animate-spin" />
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>


      {/* ================================================= */}
      {/* CREATE PROJECT MODAL */}
      {/* ================================================= */}

      {createModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeProjectModal}
          />


          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

              <div>

                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">

                  {isEditMode ? (
                    <Edit className="text-indigo-600" />
                  ) : (
                    <Plus className="text-blue-600" />
                  )}

                  {isEditMode
                    ? "Update Running Project"
                    : "Create Running Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {isEditMode
                    ? "Update project information."
                    : "Add a new project to your running project list."}
                </p>

              </div>


              <button
                type="button"
                onClick={closeProjectModal}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={21} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSaveProject}
              className="p-6"
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Project Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectInput}
                    required
                    placeholder="Salon Booking System"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* CLIENT */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Client Name
                  </label>

                  <input
                    type="text"
                    name="clientName"
                    value={
                      projectForm.clientName
                    }
                    onChange={handleProjectInput}
                    placeholder="ABC Salon"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* START DATE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Date *
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={
                      projectForm.startDate
                    }
                    onChange={handleProjectInput}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* DEADLINE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Deadline *
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={
                      projectForm.deadline
                    }
                    onChange={handleProjectInput}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* PRIORITY */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={
                      projectForm.priority
                    }
                    onChange={handleProjectInput}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Urgent">
                      Urgent
                    </option>
                  </select>
                </div>


                {/* STATUS */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Project Status
                  </label>

                  <select
                    name="status"
                    value={
                      projectForm.status
                    }
                    onChange={handleProjectInput}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Planning">
                      Planning
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="On Hold">
                      On Hold
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>


                {/* PROJECT URL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Project URL
                  </label>

                  <input
                    type="url"
                    name="projectUrl"
                    value={
                      projectForm.projectUrl
                    }
                    onChange={handleProjectInput}
                    placeholder="https://project.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* GITHUB URL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={
                      projectForm.githubUrl
                    }
                    onChange={handleProjectInput}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* TECHNOLOGIES */}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Technologies
                  </label>

                  <input
                    type="text"
                    name="technologies"
                    value={
                      projectForm.technologies
                    }
                    onChange={handleProjectInput}
                    placeholder="React, Node.js, Express, MongoDB"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Separate technologies with commas.
                  </p>
                </div>


                {/* DESCRIPTION */}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Project Description *
                  </label>

                  <textarea
                    name="description"
                    value={
                      projectForm.description
                    }
                    onChange={handleProjectInput}
                    required
                    rows={5}
                    placeholder="Describe the project..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>


              {/* BUTTONS */}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setCreateModal(false)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >

                  {createLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEditMode ? (
                        <Edit size={18} />
                      ) : (
                        <Plus size={18} />
                      )}

                      {isEditMode ? "Update Project" : "Create Project"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* PROJECT DETAILS MODAL */}
      {/* ================================================= */}

      {detailsModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDetailsModal(false)}
          />

          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                  <FolderKanban className="text-blue-600" />
                  Project Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Complete project and assignment details.
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
                      {selectedProject.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Client: {selectedProject.clientName || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Start Date</p>
                  <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedProject.startDate)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedProject.deadline)}</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-xs text-green-600">Accepted Staff</p>
                  <p className="mt-1 text-2xl font-bold text-green-700">{getAcceptedCount(selectedProject._id)}</p>
                </div>
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-xs text-yellow-700">Pending Requests</p>
                  <p className="mt-1 text-2xl font-bold text-yellow-700">{getPendingCount(selectedProject._id)}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-slate-800">Technologies</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.technologies?.length > 0 ? (
                    selectedProject.technologies.map((technology, index) => (
                      <span
                        key={`${technology}-${index}`}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                      >
                        {technology}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">No technologies added.</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {selectedProject.projectUrl && (
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <ExternalLink size={17} />
                    Open Live Project
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-200"
                  >
                    <Github size={17} />
                    Open GitHub
                  </a>
                )}
              </div>

              <div className="mt-8">
                <h4 className="flex items-center gap-2 font-bold text-slate-800">
                  <Users size={19} />
                  Staff Assignment Details
                </h4>

                <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[950px]">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Staff</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Admin Message</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Staff Response</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">Work Updates</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getProjectAssignments(selectedProject._id).length > 0 ? (
                        getProjectAssignments(selectedProject._id).map(({ staff, assignment }) => {
                          const loadingKey = `${staff._id}-${selectedProject._id}`;

                          return (
                            <tr key={assignment._id || staff._id}>
                              <td className="px-4 py-3">
                                <p className="font-semibold text-slate-800">{staff.name}</p>
                                <p className="text-xs text-slate-500">
                                  {staff.staffId} • {staff.designation || staff.category || "Staff"}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  assignment.status === "Accepted"
                                    ? "bg-green-100 text-green-700"
                                    : assignment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : assignment.status === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}>
                                  {assignment.status}
                                </span>
                              </td>
                              <td className="max-w-[240px] px-4 py-3 text-sm text-slate-600">
                                {assignment.adminMessage || "-"}
                              </td>
                              <td className="max-w-[240px] px-4 py-3 text-sm text-slate-600">
                                {assignment.staffResponse || "-"}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-blue-100 px-2 py-1 text-sm font-bold text-blue-700">
                                  {assignment.workUpdates?.length || 0}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {assignment.status !== "Removed" ? (
                                  <button
                                    type="button"
                                    title="Remove Staff from Project"
                                    disabled={removeLoadingKey === loadingKey}
                                    onClick={() =>
                                      handleRemoveStaffFromProject(
                                        staff,
                                        assignment,
                                        selectedProject._id
                                      )
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                  >
                                    {removeLoadingKey === loadingKey ? (
                                      <Loader2 size={15} className="animate-spin" />
                                    ) : (
                                      <Trash2 size={15} />
                                    )}
                                    Remove
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-400">Removed</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-sm text-slate-500">
                            No staff assignment requests found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-800">
                      <Timer size={19} />
                      Employee Work Progress
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      All descriptions and progress updates submitted by employees for this project.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-5">
                  {getProjectAssignments(selectedProject._id).some(
                    ({ assignment }) => assignment.workUpdates?.length > 0
                  ) ? (
                    getProjectAssignments(selectedProject._id)
                      .filter(({ assignment }) => assignment.workUpdates?.length > 0)
                      .map(({ staff, assignment }) => (
                        <div
                          key={`progress-${assignment._id || staff._id}`}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        >
                          <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-blue-100">
                                {staff.profileImage ? (
                                  <img
                                    src={staff.profileImage}
                                    alt={staff.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <User size={19} className="text-blue-600" />
                                )}
                              </div>

                              <div>
                                <p className="font-bold text-slate-800">{staff.name}</p>
                                <p className="text-xs text-slate-500">
                                  {staff.staffId} • {staff.designation || staff.category || "Staff"}
                                </p>
                              </div>
                            </div>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {assignment.workUpdates.length} update(s)
                            </span>
                          </div>

                          <div className="space-y-3 p-4">
                            {[...assignment.workUpdates]
                              .sort(
                                (a, b) =>
                                  new Date(b.date || 0) - new Date(a.date || 0)
                              )
                              .map((update, index) => (
                                <div
                                  key={update._id || `${staff._id}-${index}`}
                                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                >
                                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                      <Calendar size={14} />
                                      <span>{formatDateTime(update.date)}</span>
                                      <span>•</span>
                                      <span className="font-semibold text-slate-700">
                                        {Number(update.hoursWorked) || 0} hour(s)
                                      </span>
                                    </div>

                                    <span
                                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getWorkStatusStyle(
                                        update.workStatus
                                      )}`}
                                    >
                                      {update.workStatus || "In Progress"}
                                    </span>
                                  </div>

                                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
                                    {update.description || "No description"}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <Timer className="mx-auto h-9 w-9 text-slate-300" />
                      <p className="mt-2 text-sm font-semibold text-slate-600">
                        No employee work updates yet.
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Employee descriptions will appear here after they submit project updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    const project = selectedProject;
                    setDetailsModal(false);
                    openAssignModal(project);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
                >
                  <UserPlus size={17} />
                  Assign Staff
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const project = selectedProject;
                    setDetailsModal(false);
                    openEditModal(project);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700"
                >
                  <Edit size={17} />
                  Edit Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ================================================= */}
      {/* ASSIGN STAFF MODAL */}
      {/* ================================================= */}

      {assignModal && selectedProject && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setAssignModal(false)
            }
          />


          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

              <div>

                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">

                  <UserPlus className="text-blue-600" />

                  Assign Project
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedProject.title}
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setAssignModal(false)
                }
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={21} />
              </button>

            </div>


            <form
              onSubmit={handleAssignProject}
              className="p-6"
            >

              {/* SEARCH STAFF */}

              <div className="relative mb-4">

                <Search
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search staff by name, ID, email..."
                  value={staffSearch}
                  onChange={(e) =>
                    setStaffSearch(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* MULTI STAFF SELECTION ACTIONS */}

              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700">
                  Select one or more staff members
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllVisibleStaff}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    Select Visible
                  </button>

                  <button
                    type="button"
                    onClick={clearSelectedStaff}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* STAFF LIST */}

              <div className="max-h-80 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-2">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => {
                    const selected = assignmentForm.staffIds.includes(staff._id);

                    const assignment = staff.runningProjects?.find(
                      (item) =>
                        String(item.project?._id || item.project) ===
                        String(selectedProject._id)
                    );

                    const isAlreadyActive = [
                      "Pending",
                      "Accepted",
                    ].includes(assignment?.status);

                    return (
                      <label
                        key={staff._id}
                        className={`flex items-center justify-between rounded-xl border p-3 transition ${
                          isAlreadyActive
                            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
                            : selected
                            ? "cursor-pointer border-blue-500 bg-blue-50"
                            : "cursor-pointer border-transparent hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-blue-100">
                            {staff.profileImage ? (
                              <img
                                src={staff.profileImage}
                                alt={staff.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User size={20} className="text-blue-600" />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {staff.name}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                              <span>{staff.staffId}</span>
                              <span>•</span>
                              <span>{staff.designation || staff.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {assignment && (
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                assignment.status === "Accepted"
                                  ? "bg-green-100 text-green-700"
                                  : assignment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : assignment.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {assignment.status}
                            </span>
                          )}

                          <input
                            type="checkbox"
                            value={staff._id}
                            checked={selected}
                            disabled={isAlreadyActive}
                            onChange={() => toggleStaffSelection(staff._id)}
                            className="h-4 w-4 rounded accent-blue-600"
                          />
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-slate-500">
                    No staff members found.
                  </div>
                )}
              </div>

              {/* SELECTED STAFF SUMMARY */}

              {assignmentForm.staffIds.length > 0 && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                    <CheckCircle2 size={17} />
                    {assignmentForm.staffIds.length} Staff Selected
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {assignmentForm.staffIds.map((id) => {
                      const staff = staffList.find((item) => item._id === id);

                      return (
                        <span
                          key={id}
                          className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-green-700"
                        >
                          {staff?.name || id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADMIN MESSAGE */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Assignment Message
                </label>

                <textarea
                  value={
                    assignmentForm.adminMessage
                  }
                  onChange={(e) =>
                    setAssignmentForm(
                      (prev) => ({
                        ...prev,
                        adminMessage:
                          e.target.value,
                      })
                    )
                  }
                  rows={4}
                  placeholder="Please review this project and accept the assignment request..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* BUTTONS */}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setAssignModal(false)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={
                    assignLoading ||
                    assignmentForm.staffIds.length === 0
                  }
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {assignLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />

                      Send to {assignmentForm.staffIds.length} Staff
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminRunningProjects;