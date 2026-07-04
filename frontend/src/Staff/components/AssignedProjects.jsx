

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FolderOpen,
//   ExternalLink,
//   Loader2,
//   X,
//   Calendar,
//   CheckCircle,
//   Clock,
//   Send,
// } from "lucide-react";

// const AssignedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [workDetails, setWorkDetails] = useState("");
//   const [hoursWorked, setHoursWorked] = useState("");
//   const [progressList, setProgressList] = useState([]);
//   const [progressLoading, setProgressLoading] = useState(false);
//   const [progressMessage, setProgressMessage] = useState("");

//   const token = localStorage.getItem("staffToken");

//   const fetchAssignedProjects = async () => {
//     try {
//       const res = await axios.get("/api/projects/myAssignedProjects", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProjects(res.data.data || []);
//     } catch (error) {
//       console.log("Assigned projects error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProjectProgress = async (projectId) => {
//     try {
//       const res = await axios.get(`/api/staff/progress/${projectId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProgressList(res.data.data || []);
//     } catch (error) {
//       console.log("Progress fetch error:", error);
//     }
//   };

//   const openProjectModal = async (project) => {
//     setSelectedProject(project);
//     setWorkDetails("");
//     setHoursWorked("");
//     setProgressMessage("");
//     await fetchProjectProgress(project._id);
//   };

//   const submitDailyProgress = async () => {
//     if (!workDetails.trim()) {
//       setProgressMessage("Please enter work details");
//       return;
//     }

//     try {
//       setProgressLoading(true);
//       setProgressMessage("");

//       const res = await axios.post(
//         "/api/staff/progress",
//         {
//           projectId: selectedProject._id,
//           workDetails,
//           hoursWorked,
//           status: "In Progress",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProgressMessage(res.data.message || "Progress added successfully");
//       setWorkDetails("");
//       setHoursWorked("");
//       fetchProjectProgress(selectedProject._id);
//     } catch (error) {
//       setProgressMessage(
//         error.response?.data?.message || "Failed to add progress"
//       );
//     } finally {
//       setProgressLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssignedProjects();
//   }, []);

//   const formatDate = (date) => {
//     if (!date) return "Not added";
//     return new Date(date).toLocaleDateString("en-IN");
//   };

//   const formatTime = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex justify-center items-center">
//         <Loader2 className="w-9 h-9 animate-spin text-blue-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//             <FolderOpen className="w-6 h-6 text-blue-500" />
//             My Assigned Projects
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             View projects assigned to you and update daily work progress.
//           </p>
//         </div>

//         {projects.length === 0 ? (
//           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
//             <FolderOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-gray-700">
//               No projects assigned yet
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Your assigned projects will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {projects.map((project) => (
//               <div
//                 key={project._id}
//                 onClick={() => openProjectModal(project)}
//                 className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
//               >
//                 <div className="h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100">
//                   <img
//                     src={`/uploads/projects/${project.image}`}
//                     alt={project.title}
//                     className="max-h-full max-w-full object-contain p-4"
//                   />
//                 </div>

//                 <div className="p-5">
//                   <div className="flex items-center justify-between gap-3">
//                     <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                       {project.title}
//                     </h3>

//                     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold border border-green-200">
//                       {project.status || "Assigned"}
//                     </span>
//                   </div>

//                   <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                     {project.description}
//                   </p>

//                   <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
//                     <Calendar size={14} />
//                     Assigned: {formatDate(project.assignedDate)}
//                   </p>

//                   <button className="mt-5 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2.5 rounded-xl font-semibold transition border border-blue-200">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedProject && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
//             <div className="relative h-64 bg-gray-50 flex items-center justify-center rounded-t-2xl border-b border-gray-100">
//               <img
//                 src={`/uploads/projects/${selectedProject.image}`}
//                 alt={selectedProject.title}
//                 className="max-h-full max-w-full object-contain p-6"
//               />

//               <button
//                 onClick={() => setSelectedProject(null)}
//                 className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 border border-gray-200"
//               >
//                 <X size={20} className="text-gray-600" />
//               </button>
//             </div>

//             <div className="p-6 md:p-8">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {selectedProject.title}
//                 </h2>

//                 <span className="w-fit bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200">
//                   {selectedProject.status || "Assigned"}
//                 </span>
//               </div>

//               <p className="text-gray-600 mt-4 leading-relaxed">
//                 {selectedProject.description}
//               </p>

//               <div className="grid md:grid-cols-2 gap-4 mt-6">
//                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
//                   <p className="text-sm text-gray-500">Assigned Date</p>
//                   <p className="font-bold text-gray-800">
//                     {formatDate(selectedProject.assignedDate)}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
//                   <p className="text-sm text-gray-500">Created Date</p>
//                   <p className="font-bold text-gray-800">
//                     {formatDate(selectedProject.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               {(selectedProject.features || []).length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//                     <CheckCircle size={18} className="text-emerald-600" />
//                     Project Features
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {selectedProject.features.map((feature, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-200"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {selectedProject.link && (
//                 <a
//                   href={selectedProject.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-8 inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-3 rounded-xl font-bold border border-blue-200 transition"
//                 >
//                   Open Project
//                   <ExternalLink size={18} />
//                 </a>
//               )}

//               {/* Add Daily Progress */}
//               <div className="mt-8 border-t border-gray-100 pt-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">
//                   Add Daily Work Progress
//                 </h3>

//                 <textarea
//                   value={workDetails}
//                   onChange={(e) => setWorkDetails(e.target.value)}
//                   placeholder="Write today's work details..."
//                   rows="4"
//                   className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
//                 />

//                 <input
//                   type="number"
//                   value={hoursWorked}
//                   onChange={(e) => setHoursWorked(e.target.value)}
//                   placeholder="Hours worked"
//                   className="w-full mt-3 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
//                 />

//                 <button
//                   onClick={submitDailyProgress}
//                   disabled={progressLoading}
//                   className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2 border border-blue-200 transition disabled:opacity-60"
//                 >
//                   {progressLoading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={18} />
//                       Submit Progress
//                     </>
//                   )}
//                 </button>

//                 {progressMessage && (
//                   <p className="mt-3 text-sm font-semibold text-blue-600">
//                     {progressMessage}
//                   </p>
//                 )}
//               </div>

//               {/* Progress History */}
//               <div className="mt-8 border-t border-gray-100 pt-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">
//                   Progress History
//                 </h3>

//                 {progressList.length === 0 ? (
//                   <p className="text-gray-500 text-sm">No progress added yet.</p>
//                 ) : (
//                   <div className="space-y-4">
//                     {progressList.map((progress) => (
//                       <div
//                         key={progress._id}
//                         className="bg-gray-50 border border-gray-100 rounded-xl p-4"
//                       >
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//                           <p className="font-bold text-gray-800">
//                             {formatDate(progress.date)}
//                           </p>

//                           <span className="w-fit bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
//                             {progress.status}
//                           </span>
//                         </div>

//                         <p className="text-gray-600 mt-3">
//                           {progress.workDetails}
//                         </p>

//                         <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Clock size={15} />
//                             {progress.hoursWorked || 0} hours
//                           </span>

//                           <span>
//                             Added: {formatDate(progress.createdAt)}{" "}
//                             {formatTime(progress.createdAt)}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedProjects;




import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FolderOpen,
  ExternalLink,
  Loader2,
  X,
  Calendar,
  CheckCircle,
  Clock,
  Send,
} from "lucide-react";

const AssignedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [workDetails, setWorkDetails] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [progressList, setProgressList] = useState([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");

  const token = localStorage.getItem("staffToken");

  const fetchAssignedProjects = async () => {
    try {
      const res = await axios.get("/api/projects/myAssignedProjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data.data || []);
    } catch (error) {
      console.log("Assigned projects error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectProgress = async (projectId) => {
    try {
      const res = await axios.get(`/api/staff/progress/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProgressList(res.data.data || []);
    } catch (error) {
      console.log("Progress fetch error:", error);
    }
  };

  const openProjectModal = async (project) => {
    setSelectedProject(project);
    setWorkDetails("");
    setHoursWorked("");
    setProgressMessage("");
    await fetchProjectProgress(project._id);
  };

  const submitDailyProgress = async () => {
    if (!workDetails.trim()) {
      setProgressMessage("Please enter work details");
      return;
    }

    try {
      setProgressLoading(true);
      setProgressMessage("");

      const res = await axios.post(
        "/api/staff/progress",
        {
          projectId: selectedProject._id,
          workDetails,
          hoursWorked,
          status: "In Progress",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProgressMessage(res.data.message || "Progress added successfully");
      setWorkDetails("");
      setHoursWorked("");
      fetchProjectProgress(selectedProject._id);
    } catch (error) {
      setProgressMessage(
        error.response?.data?.message || "Failed to add progress"
      );
    } finally {
      setProgressLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not added";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-gray-500">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ===== Header – Glassmorphism ===== */}
        <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50">
          <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-gray-800">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-2xl text-white">
              <FolderOpen className="h-7 w-7" />
            </span>
            My Assigned Projects
          </h1>
          <p className="mt-1 text-sm text-gray-600 ml-1">
            View projects assigned to you and update daily work progress.
          </p>
        </div>

        {/* ===== Project Cards Grid ===== */}
        {projects.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-10 text-center shadow-sm">
            <FolderOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700">
              No projects assigned yet
            </h2>
            <p className="text-gray-500 mt-2">
              Your assigned projects will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => openProjectModal(project)}
                className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-indigo-200 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-50/80 flex items-center justify-center border-b border-gray-100/80 p-4">
                  <img
                    src={`/uploads/projects/${project.image}`}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold border border-emerald-200">
                      {project.status || "Assigned"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                    <Calendar size={14} />
                    Assigned: {formatDate(project.assignedDate)}
                  </p>

                  <button className="mt-5 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl font-semibold transition border border-blue-200 hover:border-blue-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Project Modal – Glassmorphism ===== */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 bg-gray-50/80 flex items-center justify-center rounded-t-3xl border-b border-gray-200/50 p-6">
              <img
                src={`/uploads/projects/${selectedProject.image}`}
                alt={selectedProject.title}
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white border border-gray-200/60 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProject.title}
                </h2>
                <span className="shrink-0 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-200">
                  {selectedProject.status || "Assigned"}
                </span>
              </div>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60">
                  <p className="text-sm text-gray-500">Assigned Date</p>
                  <p className="font-bold text-gray-800">
                    {formatDate(selectedProject.assignedDate)}
                  </p>
                </div>
                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60">
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-bold text-gray-800">
                    {formatDate(selectedProject.createdAt)}
                  </p>
                </div>
              </div>

              {/* Features */}
              {(selectedProject.features || []).length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-600" />
                    Project Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Link */}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-bold border border-blue-200 transition hover:border-blue-300"
                >
                  Open Project
                  <ExternalLink size={18} />
                </a>
              )}

              {/* Add Daily Progress */}
              <div className="mt-8 border-t border-gray-200/50 pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-500" />
                  Add Daily Work Progress
                </h3>

                <textarea
                  value={workDetails}
                  onChange={(e) => setWorkDetails(e.target.value)}
                  placeholder="Write today's work details..."
                  rows="4"
                  className="w-full border border-gray-200/80 bg-white/60 backdrop-blur-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
                />

                <input
                  type="number"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  placeholder="Hours worked"
                  className="w-full mt-3 border border-gray-200/80 bg-white/60 backdrop-blur-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />

                <button
                  onClick={submitDailyProgress}
                  disabled={progressLoading}
                  className="mt-4 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2 border border-blue-200 transition disabled:opacity-60 hover:border-blue-300"
                >
                  {progressLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Progress
                    </>
                  )}
                </button>

                {progressMessage && (
                  <p className="mt-3 text-sm font-semibold text-blue-600 bg-blue-50/80 border border-blue-200 rounded-xl p-2">
                    {progressMessage}
                  </p>
                )}
              </div>

              {/* Progress History */}
              <div className="mt-8 border-t border-gray-200/50 pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Progress History
                </h3>

                {progressList.length === 0 ? (
                  <p className="text-gray-500 text-sm">No progress added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {progressList.map((progress) => (
                      <div
                        key={progress._id}
                        className="bg-gray-50/80 border border-gray-200/60 rounded-xl p-4 hover:bg-white/60 transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <p className="font-bold text-gray-800">
                            {formatDate(progress.date)}
                          </p>
                          <span className="shrink-0 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
                            {progress.status}
                          </span>
                        </div>

                        <p className="text-gray-600 mt-3">
                          {progress.workDetails}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={15} />
                            {progress.hoursWorked || 0} hours
                          </span>
                          <span>
                            Added: {formatDate(progress.createdAt)}{" "}
                            {formatTime(progress.createdAt)}
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
      )}
    </div>
  );
};

export default AssignedProjects;