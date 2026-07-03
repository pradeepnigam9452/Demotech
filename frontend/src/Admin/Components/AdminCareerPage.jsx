




// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Briefcase,
//   GraduationCap,
//   Users,
//   FileText,
//   PlusCircle,
//   Loader2,
//   Trash2,
//   Eye,
//   Mail,
//   Phone,
//   MapPin,
//   IndianRupee,
//   Clock,
//   Search,
//   Sparkles,
//   ListChecks,
// } from "lucide-react";

// const initialForm = {
//   title: "",
//   department: "",
//   location: "Bhopal, Madhya Pradesh",
//   jobType: "Internship",
//   experience: "Fresher",
//   salary: "Not Disclosed",
//   skills: "",
//   description: "",
//   responsibilities: "",
//   requirements: "",
//   isActive: true,
// };

// const AdminCareerPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [formData, setFormData] = useState(initialForm);

//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);

//   const [activeSection, setActiveSection] = useState("Candidate Requests");
//   const [search, setSearch] = useState("");
//   const [applicationFilter, setApplicationFilter] = useState("All");
//   const [openingFilter, setOpeningFilter] = useState("All");

//   const getAuthHeaders = () => {
//     const token =
//       localStorage.getItem("adminToken") || localStorage.getItem("token");

//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const fetchCareerData = async () => {
//     try {
//       setLoading(true);

//       const [jobsRes, applicationsRes] = await Promise.all([
//         axios.get("/api/careers/jobs", {
//           headers: getAuthHeaders(),
//         }),
//         axios.get("/api/careers/applications", {
//           headers: getAuthHeaders(),
//         }),
//       ]);

//       setJobs(jobsRes.data.data || []);
//       setApplications(applicationsRes.data.data || []);
//     } catch (error) {
//       console.log("Career admin fetch error:", error);
//       alert(error.response?.data?.message || "Failed to fetch career data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCareerData();
//   }, []);

//   const stats = useMemo(() => {
//     const totalJobs = jobs.filter((job) => job.jobType !== "Internship").length;

//     const totalInternships = jobs.filter(
//       (job) => job.jobType === "Internship"
//     ).length;

//     const internshipRequests = applications.filter(
//       (application) => application.job?.jobType === "Internship"
//     ).length;

//     return {
//       totalOpenings: jobs.length,
//       totalJobs,
//       totalInternships,
//       totalApplications: applications.length,
//       internshipRequests,
//     };
//   }, [jobs, applications]);

//   const filteredOpenings = useMemo(() => {
//     return jobs.filter((job) => {
//       if (openingFilter === "All") return true;
//       if (openingFilter === "Jobs") return job.jobType !== "Internship";
//       if (openingFilter === "Internships") return job.jobType === "Internship";
//       return true;
//     });
//   }, [jobs, openingFilter]);

//   const filteredApplications = useMemo(() => {
//     return applications.filter((application) => {
//       const searchText = `
//         ${application.name || ""}
//         ${application.email || ""}
//         ${application.phone || ""}
//         ${application.job?.title || ""}
//         ${application.job?.jobType || ""}
//         ${application.status || ""}
//       `.toLowerCase();

//       const matchesSearch = searchText.includes(search.toLowerCase());

//       const matchesFilter =
//         applicationFilter === "All"
//           ? true
//           : applicationFilter === "Internship Requests"
//           ? application.job?.jobType === "Internship"
//           : application.job?.jobType !== "Internship";

//       return matchesSearch && matchesFilter;
//     });
//   }, [applications, search, applicationFilter]);

//   const handleStatCardClick = (type) => {
//     if (type === "allOpenings") {
//       setOpeningFilter("All");
//       setActiveSection("Available Openings");
//     }

//     if (type === "jobs") {
//       setOpeningFilter("Jobs");
//       setActiveSection("Available Openings");
//     }

//     if (type === "internships") {
//       setOpeningFilter("Internships");
//       setActiveSection("Available Openings");
//     }

//     if (type === "allApplications") {
//       setApplicationFilter("All");
//       setActiveSection("Candidate Requests");
//     }

//     if (type === "internshipRequests") {
//       setApplicationFilter("Internship Requests");
//       setActiveSection("Candidate Requests");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCreateJob = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.department || !formData.description) {
//       alert("Title, department and description are required");
//       return;
//     }

//     try {
//       setCreating(true);

//       await axios.post("/api/careers/jobs", formData, {
//         headers: getAuthHeaders(),
//       });

//       alert(`${formData.jobType} created successfully!`);

//       setFormData(initialForm);
//       setActiveSection("Available Openings");
//       setOpeningFilter("All");
//       fetchCareerData();
//     } catch (error) {
//       console.log("Create career job error:", error);
//       alert(error.response?.data?.message || "Failed to create opening");
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this opening?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/careers/jobs/${id}`, {
//         headers: getAuthHeaders(),
//       });

//       alert("Opening deleted successfully");
//       fetchCareerData();
//     } catch (error) {
//       console.log("Delete job error:", error);
//       alert(error.response?.data?.message || "Failed to delete opening");
//     }
//   };

//   const handleDeleteApplication = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this candidate request?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/careers/applications/${id}`, {
//         headers: getAuthHeaders(),
//       });

//       alert("Candidate request deleted successfully");

//       setApplications((prev) =>
//         prev.filter((application) => application._id !== id)
//       );
//     } catch (error) {
//       console.log("Delete application error:", error);
//       alert(error.response?.data?.message || "Failed to delete request");
//     }
//   };

//   const getResumeUrl = (resumePath) => {
//     if (!resumePath) return "#";
//     if (resumePath.startsWith("http")) return resumePath;
//     return resumePath.startsWith("/") ? resumePath : `/${resumePath}`;
//   };

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-white px-1 py-10 md:px-8 lg:px-10">
//       <motion.div
//         className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full opacity-5 blur-3xl"
//         style={{ background: "#378af9" }}
//         animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10"
//         >
//           <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
//             <Sparkles className="h-4 w-4" />
//             Admin Career Panel
//           </span>

//           <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
//             Manage <span className="text-[#378af9]">Jobs & Internships</span>
//           </h1>

//           <p className="mt-3 max-w-2xl text-gray-500">
//             Create new openings, view available jobs and internships, and track
//             candidate application requests.
//           </p>

//           <div className="mt-5 h-1 w-20 rounded-full bg-[#378af9]" />
//         </motion.div>

  
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
//         >
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <SectionButton
//               active={activeSection === "Create Opening"}
//               icon={<PlusCircle />}
//               label="Create Opening"
//               onClick={() => setActiveSection("Create Opening")}
//             />

//             <SectionButton
//               active={activeSection === "Available Openings"}
//               icon={<ListChecks />}
//               label="Available Openings"
//               onClick={() => {
//                 setOpeningFilter("All");
//                 setActiveSection("Available Openings");
//               }}
//             />

//             <SectionButton
//               active={activeSection === "Candidate Requests"}
//               icon={<Users />}
//               label="Candidate Requests"
//               onClick={() => setActiveSection("Candidate Requests")}
//             />
//           </div>

          
//         </motion.div>

//         {loading ? (
//           <div className="flex justify-center py-24">
//             <Loader2 className="h-10 w-10 animate-spin text-[#378af9]" />
//           </div>
//         ) : (
//           <>
//             {activeSection === "Create Opening" && (
//               <CreateOpeningSection
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleCreateJob={handleCreateJob}
//                 creating={creating}
//               />
//             )}

//             {activeSection === "Available Openings" && (
//               <AvailableOpeningsSection
//                 jobs={filteredOpenings}
//                 openingFilter={openingFilter}
//                 setOpeningFilter={setOpeningFilter}
//                 handleDeleteJob={handleDeleteJob}
//               />
//             )}

//             {activeSection === "Candidate Requests" && (
//               <CandidateRequestsTable
//                 applications={filteredApplications}
//                 search={search}
//                 setSearch={setSearch}
//                 applicationFilter={applicationFilter}
//                 setApplicationFilter={setApplicationFilter}
//                 stats={stats}
//                 getResumeUrl={getResumeUrl}
//                 handleDeleteApplication={handleDeleteApplication}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// const SectionButton = ({ active, icon, label, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
//         active
//           ? "bg-[#378af9] text-white shadow-md shadow-blue-200/50"
//           : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-[#378af9]"
//       }`}
//     >
//       {React.cloneElement(icon, { className: "h-5 w-5" })}
//       {label}
//     </button>
//   );
// };

// const CreateOpeningSection = ({
//   formData,
//   handleChange,
//   handleCreateJob,
//   creating,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-6 flex items-center gap-3">
//         <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
//           <PlusCircle className="h-5 w-5 text-[#378af9]" />
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Create Opening</h2>
//           <p className="text-sm text-gray-500">Add job or internship</p>
//         </div>
//       </div>

//       <form onSubmit={handleCreateJob} className="space-y-4">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <Input
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="MERN Stack Developer Intern"
//             required
//           />

//           <Input
//             label="Department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             placeholder="Development"
//             required
//           />

//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               Opening Type
//             </label>

//             <select
//               name="jobType"
//               value={formData.jobType}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//             >
//               <option value="Internship">Internship</option>
//               <option value="Full Time">Full Time</option>
//               <option value="Part Time">Part Time</option>
//               <option value="Remote">Remote</option>
//               <option value="Hybrid">Hybrid</option>
//             </select>
//           </div>

//           <Input
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Bhopal, Madhya Pradesh"
//           />

//           <Input
//             label="Experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Fresher / 1-2 Years"
//           />

//           <Input
//             label="Salary / Stipend"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             placeholder="Stipend Based / Not Disclosed"
//           />
//         </div>

//         <Input
//           label="Skills"
//           name="skills"
//           value={formData.skills}
//           onChange={handleChange}
//           placeholder="React, Node, MongoDB"
//         />

//         <Textarea
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Write short job description..."
//           required
//         />

//         <Textarea
//           label="Responsibilities"
//           name="responsibilities"
//           value={formData.responsibilities}
//           onChange={handleChange}
//           placeholder="Build UI, Create APIs, Fix bugs"
//         />

//         <Textarea
//           label="Requirements"
//           name="requirements"
//           value={formData.requirements}
//           onChange={handleChange}
//           placeholder="JavaScript, React, Git"
//         />

//         <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="h-4 w-4 accent-[#378af9]"
//           />
//           Active opening
//         </label>

//         <button
//           type="submit"
//           disabled={creating}
//           className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
//         >
//           {creating ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             <>
//               <PlusCircle className="h-4 w-4" />
//               Create Opening
//             </>
//           )}
//         </button>
//       </form>
//     </motion.div>
//   );
// };

// const AvailableOpeningsSection = ({
//   jobs,
//   openingFilter,
//   setOpeningFilter,
//   handleDeleteJob,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Available Openings
//           </h2>
//           <p className="text-sm text-gray-500">
//             Showing:{" "}
//             <span className="font-semibold text-[#378af9]">
//               {openingFilter}
//             </span>
//           </p>
//         </div>

//         <select
//           value={openingFilter}
//           onChange={(e) => setOpeningFilter(e.target.value)}
//           className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//         >
//           <option value="All">All</option>
//           <option value="Jobs">Jobs</option>
//           <option value="Internships">Internships</option>
//         </select>
//       </div>

//       {jobs.length === 0 ? (
//         <EmptyState text="No openings found." />
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#378af9]/40 hover:shadow-md"
//             >
//               <div className="mb-4 flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-bold text-gray-900">{job.title}</h3>
//                   <p className="text-sm font-semibold text-[#378af9]">
//                     {job.department}
//                   </p>
//                 </div>

//                 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
//                   {job.jobType}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <p className="flex items-center gap-2">
//                   <MapPin className="h-4 w-4 text-[#378af9]" />
//                   {job.location}
//                 </p>

//                 <p className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-[#378af9]" />
//                   {job.experience}
//                 </p>

//                 <p className="flex items-center gap-2">
//                   <IndianRupee className="h-4 w-4 text-[#378af9]" />
//                   {job.salary}
//                 </p>
//               </div>

//               <p className="mt-3 line-clamp-2 text-sm text-gray-500">
//                 {job.description}
//               </p>

//               <button
//                 onClick={() => handleDeleteJob(job._id)}
//                 className="mt-4 flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//               >
//                 <Trash2 className="h-4 w-4" />
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const CandidateRequestsTable = ({
//   applications,
//   search,
//   setSearch,
//   applicationFilter,
//   setApplicationFilter,
//   stats,
//   getResumeUrl,
//   handleDeleteApplication,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Candidate Requests
//           </h2>

//           <p className="text-sm text-gray-500">
//             Total internship requests:{" "}
//             <span className="font-bold text-[#378af9]">
//               {stats.internshipRequests}
//             </span>
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <select
//             value={applicationFilter}
//             onChange={(e) => setApplicationFilter(e.target.value)}
//             className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//           >
//             <option value="All">All Requests</option>
//             <option value="Internship Requests">Internship Requests</option>
//             <option value="Job Requests">Job Requests</option>
//           </select>

//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//             <input
//               type="text"
//               placeholder="Search candidate..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-full border border-gray-300 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 sm:w-72"
//             />
//           </div>
//         </div>
//       </div>

//       {applications.length === 0 ? (
//         <EmptyState text="No candidate requests found." />
//       ) : (
//         <div className="overflow-x-auto rounded-2xl border border-gray-100">
//           <table className="w-full min-w-[1000px] border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">
//                 <th className="px-4 py-4 font-semibold">Candidate</th>
//                 <th className="px-4 py-4 font-semibold">Contact</th>
//                 <th className="px-4 py-4 font-semibold">Applied For</th>
//                 <th className="px-4 py-4 font-semibold">Type</th>
//                 <th className="px-4 py-4 font-semibold">Status</th>
//                 <th className="px-4 py-4 font-semibold">Resume</th>
//                 <th className="px-4 py-4 font-semibold">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {applications.map((application) => (
//                 <tr
//                   key={application._id}
//                   className="border-b border-gray-100 text-sm transition hover:bg-blue-50/50"
//                 >
//                   <td className="px-4 py-4">
//                     <p className="font-semibold text-gray-900">
//                       {application.name}
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       {application.createdAt
//                         ? new Date(application.createdAt).toLocaleDateString(
//                             "en-IN"
//                           )
//                         : "N/A"}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="flex items-center gap-2 text-gray-700">
//                       <Mail className="h-4 w-4 text-[#378af9]" />
//                       {application.email}
//                     </p>

//                     <p className="mt-1 flex items-center gap-2 text-gray-700">
//                       <Phone className="h-4 w-4 text-[#378af9]" />
//                       {application.phone}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="font-semibold text-gray-900">
//                       {application.job?.title || "Job deleted"}
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       {application.job?.department || "N/A"}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
//                       {application.job?.jobType || "N/A"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-4">
//                     <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
//                       {application.status || "Pending"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-4">
//                     {application.resume ? (
//                       <a
//                         href={getResumeUrl(application.resume)}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 rounded-full bg-[#378af9] px-4 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
//                       >
//                         <Eye className="h-4 w-4" />
//                         View
//                       </a>
//                     ) : (
//                       <span className="text-xs text-gray-400">No resume</span>
//                     )}
//                   </td>

//                   <td className="px-4 py-4">
//                     <button
//                       onClick={() => handleDeleteApplication(application._id)}
//                       className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const StatCard = ({ icon, title, value, onClick }) => {
//   return (
//     <motion.div
//       onClick={onClick}
//       initial={{ opacity: 0, y: 22 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#378af9]/50 hover:shadow-md"
//     >
//       <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#378af9]">
//         {React.cloneElement(icon, { className: "h-5 w-5" })}
//       </div>

//       <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
//       <p className="mt-1 text-sm font-medium text-gray-500">{title}</p>
//     </motion.div>
//   );
// };

// const Input = ({ label, ...props }) => {
//   return (
//     <div>
//       <label className="mb-1 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         {...props}
//         className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//       />
//     </div>
//   );
// };

// const Textarea = ({ label, ...props }) => {
//   return (
//     <div>
//       <label className="mb-1 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <textarea
//         {...props}
//         rows="3"
//         className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//       />
//     </div>
//   );
// };

// const EmptyState = ({ text }) => {
//   return (
//     <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
//       <p className="font-medium text-gray-500">{text}</p>
//     </div>
//   );
// };

// export default AdminCareerPage;



// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import {
//   Users,
//   PlusCircle,
//   Loader2,
//   Trash2,
//   Eye,
//   Mail,
//   Phone,
//   MapPin,
//   IndianRupee,
//   Clock,
//   Search,
//   Sparkles,
//   ListChecks,
// } from "lucide-react";

// const initialForm = {
//   title: "",
//   department: "",
//   location: "Bhopal, Madhya Pradesh",
//   jobType: "Internship",
//   experience: "Fresher",
//   salary: "Not Disclosed",
//   skills: "",
//   description: "",
//   responsibilities: "",
//   requirements: "",
//   isActive: true,
// };

// const applicationStatuses = ["Pending", "Shortlisted", "Selected", "Rejected"];

// const AdminCareerPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [formData, setFormData] = useState(initialForm);

//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);

//   const [activeSection, setActiveSection] = useState("Candidate Requests");
//   const [search, setSearch] = useState("");
//   const [applicationFilter, setApplicationFilter] = useState("All");
//   const [openingFilter, setOpeningFilter] = useState("All");

//   const getAuthHeaders = () => {
//     const token =
//       localStorage.getItem("adminToken") || localStorage.getItem("token");

//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const fetchCareerData = async () => {
//     try {
//       setLoading(true);

//       const [jobsRes, applicationsRes] = await Promise.all([
//         axios.get("/api/careers/jobs", {
//           headers: getAuthHeaders(),
//         }),
//         axios.get("/api/careers/applications", {
//           headers: getAuthHeaders(),
//         }),
//       ]);

//       setJobs(jobsRes.data.data || []);
//       setApplications(applicationsRes.data.data || []);
//     } catch (error) {
//       console.log("Career admin fetch error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: error.response?.data?.message || "Failed to fetch career data",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCareerData();
//   }, []);

//   const stats = useMemo(() => {
//     const totalJobs = jobs.filter((job) => job.jobType !== "Internship").length;

//     const totalInternships = jobs.filter(
//       (job) => job.jobType === "Internship"
//     ).length;

//     const internshipRequests = applications.filter(
//       (application) => application.job?.jobType === "Internship"
//     ).length;

//     return {
//       totalOpenings: jobs.length,
//       totalJobs,
//       totalInternships,
//       totalApplications: applications.length,
//       internshipRequests,
//     };
//   }, [jobs, applications]);

//   const filteredOpenings = useMemo(() => {
//     return jobs.filter((job) => {
//       if (openingFilter === "All") return true;
//       if (openingFilter === "Jobs") return job.jobType !== "Internship";
//       if (openingFilter === "Internships") return job.jobType === "Internship";
//       return true;
//     });
//   }, [jobs, openingFilter]);

//   const filteredApplications = useMemo(() => {
//     return applications.filter((application) => {
//       const searchText = `
//         ${application.name || ""}
//         ${application.email || ""}
//         ${application.phone || ""}
//         ${application.job?.title || ""}
//         ${application.job?.jobType || ""}
//         ${application.status || ""}
//       `.toLowerCase();

//       const matchesSearch = searchText.includes(search.toLowerCase());

//       const matchesFilter =
//         applicationFilter === "All"
//           ? true
//           : applicationFilter === "Internship Requests"
//           ? application.job?.jobType === "Internship"
//           : application.job?.jobType !== "Internship";

//       return matchesSearch && matchesFilter;
//     });
//   }, [applications, search, applicationFilter]);

//   const handleStatCardClick = (type) => {
//     if (type === "allOpenings") {
//       setOpeningFilter("All");
//       setActiveSection("Available Openings");
//     }

//     if (type === "jobs") {
//       setOpeningFilter("Jobs");
//       setActiveSection("Available Openings");
//     }

//     if (type === "internships") {
//       setOpeningFilter("Internships");
//       setActiveSection("Available Openings");
//     }

//     if (type === "allApplications") {
//       setApplicationFilter("All");
//       setActiveSection("Candidate Requests");
//     }

//     if (type === "internshipRequests") {
//       setApplicationFilter("Internship Requests");
//       setActiveSection("Candidate Requests");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCreateJob = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.department || !formData.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Required Fields",
//         text: "Title, department and description are required.",
//       });
//       return;
//     }

//     try {
//       setCreating(true);

//       await axios.post("/api/careers/jobs", formData, {
//         headers: getAuthHeaders(),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Created!",
//         text: `${formData.jobType} created successfully!`,
//         timer: 1800,
//         showConfirmButton: false,
//       });

//       setFormData(initialForm);
//       setActiveSection("Available Openings");
//       setOpeningFilter("All");
//       fetchCareerData();
//     } catch (error) {
//       console.log("Create career job error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: error.response?.data?.message || "Failed to create opening",
//       });
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     const result = await Swal.fire({
//       title: "Delete Opening?",
//       text: "Are you sure you want to delete this opening?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(`/api/careers/jobs/${id}`, {
//         headers: getAuthHeaders(),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Opening deleted successfully.",
//         timer: 1800,
//         showConfirmButton: false,
//       });

//       fetchCareerData();
//     } catch (error) {
//       console.log("Delete job error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: error.response?.data?.message || "Failed to delete opening",
//       });
//     }
//   };

//   const handleDeleteApplication = async (id) => {
//     const result = await Swal.fire({
//       title: "Delete Request?",
//       text: "Are you sure you want to delete this candidate request?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(`/api/careers/applications/${id}`, {
//         headers: getAuthHeaders(),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Candidate request deleted successfully.",
//         timer: 1800,
//         showConfirmButton: false,
//       });

//       setApplications((prev) =>
//         prev.filter((application) => application._id !== id)
//       );
//     } catch (error) {
//       console.log("Delete application error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: error.response?.data?.message || "Failed to delete request",
//       });
//     }
//   };

//   const handleUpdateApplicationStatus = async (id, status) => {
//     if (!status) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select Status",
//         text: "Please select a status before updating.",
//       });
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Update Status?",
//       text: `Are you sure you want to change status to "${status}"?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#378af9",
//       cancelButtonColor: "#ef4444",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const res = await axios.put(
//         `/api/careers/applications/${id}/status`,
//         { status },
//         {
//           headers: getAuthHeaders(),
//         }
//       );

//       const updatedApplication = res.data.data;

//       setApplications((prev) =>
//         prev.map((application) =>
//           application._id === id
//             ? updatedApplication || { ...application, status }
//             : application
//         )
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Application status updated successfully.",
//         timer: 1800,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.log("Update application status error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: error.response?.data?.message || "Failed to update status.",
//       });
//     }
//   };

//   const getResumeUrl = (resumePath) => {
//     if (!resumePath) return "#";
//     if (resumePath.startsWith("http")) return resumePath;
//     return resumePath.startsWith("/") ? resumePath : `/${resumePath}`;
//   };

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-white px-1 py-2 md:px-0 lg:px-10">
//       <motion.div
//         className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
//         style={{ background: "#f1f3f5" }}
//         animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full opacity-5 blur-3xl"
//         style={{ background: "#eceef0" }}
//         animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10"
//         >
//           <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
//             <Sparkles className="h-4 w-4" />
//             Admin Career Panel
//           </span>

//           <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
//             Manage <span className="text-[#378af9]">Jobs & Internships</span>
//           </h1>

//           <p className="mt-3 max-w-2xl text-gray-500">
//             Create new openings, view available jobs and internships, and track
//             candidate application requests.
//           </p>

//           <div className="mt-5 h-1 w-20 rounded-full bg-[#378af9]" />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
//         >
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <SectionButton
//               active={activeSection === "Create Opening"}
//               icon={<PlusCircle />}
//               label="Create Opening"
//               onClick={() => setActiveSection("Create Opening")}
//             />

//             <SectionButton
//               active={activeSection === "Available Openings"}
//               icon={<ListChecks />}
//               label="Available Openings"
//               onClick={() => {
//                 setOpeningFilter("All");
//                 setActiveSection("Available Openings");
//               }}
//             />

//             <SectionButton
//               active={activeSection === "Candidate Requests"}
//               icon={<Users />}
//               label="Candidate Requests"
//               onClick={() => setActiveSection("Candidate Requests")}
//             />
//           </div>
//         </motion.div>

//         {loading ? (
//           <div className="flex justify-center py-24">
//             <Loader2 className="h-10 w-10 animate-spin text-[#378af9]" />
//           </div>
//         ) : (
//           <>
//             {activeSection === "Create Opening" && (
//               <CreateOpeningSection
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleCreateJob={handleCreateJob}
//                 creating={creating}
//               />
//             )}

//             {activeSection === "Available Openings" && (
//               <AvailableOpeningsSection
//                 jobs={filteredOpenings}
//                 openingFilter={openingFilter}
//                 setOpeningFilter={setOpeningFilter}
//                 handleDeleteJob={handleDeleteJob}
//               />
//             )}

//             {activeSection === "Candidate Requests" && (
//               <CandidateRequestsTable
//                 applications={filteredApplications}
//                 search={search}
//                 setSearch={setSearch}
//                 applicationFilter={applicationFilter}
//                 setApplicationFilter={setApplicationFilter}
//                 stats={stats}
//                 getResumeUrl={getResumeUrl}
//                 handleDeleteApplication={handleDeleteApplication}
//                 handleUpdateApplicationStatus={handleUpdateApplicationStatus}
//                 applicationStatuses={applicationStatuses}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// const SectionButton = ({ active, icon, label, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
//         active
//           ? "bg-[#378af9] text-white shadow-md shadow-blue-200/50"
//           : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-[#378af9]"
//       }`}
//     >
//       {React.cloneElement(icon, { className: "h-5 w-5" })}
//       {label}
//     </button>
//   );
// };

// const CreateOpeningSection = ({
//   formData,
//   handleChange,
//   handleCreateJob,
//   creating,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-6 flex items-center gap-3">
//         <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
//           <PlusCircle className="h-5 w-5 text-[#378af9]" />
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Create Opening</h2>
//           <p className="text-sm text-gray-500">Add job or internship</p>
//         </div>
//       </div>

//       <form onSubmit={handleCreateJob} className="space-y-4">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <Input
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="MERN Stack Developer Intern"
//             required
//           />

//           <Input
//             label="Department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             placeholder="Development"
//             required
//           />

//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               Opening Type
//             </label>

//             <select
//               name="jobType"
//               value={formData.jobType}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//             >
//               <option value="Internship">Internship</option>
//               <option value="Full Time">Full Time</option>
//               <option value="Part Time">Part Time</option>
//               <option value="Remote">Remote</option>
//               <option value="Hybrid">Hybrid</option>
//             </select>
//           </div>

//           <Input
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Bhopal, Madhya Pradesh"
//           />

//           <Input
//             label="Experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Fresher / 1-2 Years"
//           />

//           <Input
//             label="Salary / Stipend"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             placeholder="Stipend Based / Not Disclosed"
//           />
//         </div>

//         <Input
//           label="Skills"
//           name="skills"
//           value={formData.skills}
//           onChange={handleChange}
//           placeholder="React, Node, MongoDB"
//         />

//         <Textarea
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Write short job description..."
//           required
//         />

//         <Textarea
//           label="Responsibilities"
//           name="responsibilities"
//           value={formData.responsibilities}
//           onChange={handleChange}
//           placeholder="Build UI, Create APIs, Fix bugs"
//         />

//         <Textarea
//           label="Requirements"
//           name="requirements"
//           value={formData.requirements}
//           onChange={handleChange}
//           placeholder="JavaScript, React, Git"
//         />

//         <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="h-4 w-4 accent-[#378af9]"
//           />
//           Active opening
//         </label>

//         <button
//           type="submit"
//           disabled={creating}
//           className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
//         >
//           {creating ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             <>
//               <PlusCircle className="h-4 w-4" />
//               Create Opening
//             </>
//           )}
//         </button>
//       </form>
//     </motion.div>
//   );
// };

// const AvailableOpeningsSection = ({
//   jobs,
//   openingFilter,
//   setOpeningFilter,
//   handleDeleteJob,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Available Openings
//           </h2>
//           <p className="text-sm text-gray-500">
//             Showing:{" "}
//             <span className="font-semibold text-[#378af9]">
//               {openingFilter}
//             </span>
//           </p>
//         </div>

//         <select
//           value={openingFilter}
//           onChange={(e) => setOpeningFilter(e.target.value)}
//           className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//         >
//           <option value="All">All</option>
//           <option value="Jobs">Jobs</option>
//           <option value="Internships">Internships</option>
//         </select>
//       </div>

//       {jobs.length === 0 ? (
//         <EmptyState text="No openings found." />
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#378af9]/40 hover:shadow-md"
//             >
//               <div className="mb-4 flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-bold text-gray-900">{job.title}</h3>
//                   <p className="text-sm font-semibold text-[#378af9]">
//                     {job.department}
//                   </p>
//                 </div>

//                 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
//                   {job.jobType}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <p className="flex items-center gap-2">
//                   <MapPin className="h-4 w-4 text-[#378af9]" />
//                   {job.location}
//                 </p>

//                 <p className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-[#378af9]" />
//                   {job.experience}
//                 </p>

//                 <p className="flex items-center gap-2">
//                   <IndianRupee className="h-4 w-4 text-[#378af9]" />
//                   {job.salary}
//                 </p>
//               </div>

//               <p className="mt-3 line-clamp-2 text-sm text-gray-500">
//                 {job.description}
//               </p>

//               <button
//                 onClick={() => handleDeleteJob(job._id)}
//                 className="mt-4 flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//               >
//                 <Trash2 className="h-4 w-4" />
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const CandidateRequestsTable = ({
//   applications,
//   search,
//   setSearch,
//   applicationFilter,
//   setApplicationFilter,
//   stats,
//   getResumeUrl,
//   handleDeleteApplication,
//   handleUpdateApplicationStatus,
//   applicationStatuses,
// }) => {
//   const [selectedStatuses, setSelectedStatuses] = useState({});

//   useEffect(() => {
//     const statusMap = {};

//     applications.forEach((application) => {
//       statusMap[application._id] = application.status || "Pending";
//     });

//     setSelectedStatuses(statusMap);
//   }, [applications]);

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Selected":
//         return "bg-green-100 text-green-700";
//       case "Shortlisted":
//         return "bg-blue-100 text-blue-700";
//       case "Rejected":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-yellow-100 text-yellow-700";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 22 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
//     >
//       <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Candidate Requests
//           </h2>

//           <p className="text-sm text-gray-500">
//             Total internship requests:{" "}
//             <span className="font-bold text-[#378af9]">
//               {stats.internshipRequests}
//             </span>
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <select
//             value={applicationFilter}
//             onChange={(e) => setApplicationFilter(e.target.value)}
//             className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//           >
//             <option value="All">All Requests</option>
//             <option value="Internship Requests">Internship Requests</option>
//             <option value="Job Requests">Job Requests</option>
//           </select>

//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//             <input
//               type="text"
//               placeholder="Search candidate..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-full border border-gray-300 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 sm:w-72"
//             />
//           </div>
//         </div>
//       </div>

//       {applications.length === 0 ? (
//         <EmptyState text="No candidate requests found." />
//       ) : (
//         <div className="overflow-x-auto rounded-2xl border border-gray-100">
//           <table className="w-full min-w-[1250px] border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">
//                 <th className="px-4 py-4 font-semibold">Candidate</th>
//                 <th className="px-4 py-4 font-semibold">Contact</th>
//                 <th className="px-4 py-4 font-semibold">Applied For</th>
//                 <th className="px-4 py-4 font-semibold">Type</th>
//                 <th className="px-4 py-4 font-semibold">Status</th>
//                 <th className="px-4 py-4 font-semibold">Resume</th>
//                 <th className="px-4 py-4 font-semibold">Update Status</th>
//                 <th className="px-4 py-4 font-semibold">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {applications.map((application) => {
//                 const currentStatus =
//                   selectedStatuses[application._id] ||
//                   application.status ||
//                   "Pending";

//                 return (
//                   <tr
//                     key={application._id}
//                     className="border-b border-gray-100 text-sm transition hover:bg-blue-50/50"
//                   >
//                     <td className="px-4 py-4">
//                       <p className="font-semibold text-gray-900">
//                         {application.name}
//                       </p>

//                       <p className="text-xs text-gray-500">
//                         {application.createdAt
//                           ? new Date(application.createdAt).toLocaleDateString(
//                               "en-IN"
//                             )
//                           : "N/A"}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <p className="flex items-center gap-2 text-gray-700">
//                         <Mail className="h-4 w-4 text-[#378af9]" />
//                         {application.email}
//                       </p>

//                       <p className="mt-1 flex items-center gap-2 text-gray-700">
//                         <Phone className="h-4 w-4 text-[#378af9]" />
//                         {application.phone}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <p className="font-semibold text-gray-900">
//                         {application.job?.title || "Job deleted"}
//                       </p>

//                       <p className="text-xs text-gray-500">
//                         {application.job?.department || "N/A"}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
//                         {application.job?.jobType || "N/A"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
//                           application.status || "Pending"
//                         )}`}
//                       >
//                         {application.status || "Pending"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4">
//                       {application.resume ? (
//                         <a
//                           href={getResumeUrl(application.resume)}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="inline-flex items-center gap-2 rounded-full bg-[#378af9] px-4 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
//                         >
//                           <Eye className="h-4 w-4" />
//                           View
//                         </a>
//                       ) : (
//                         <span className="text-xs text-gray-400">
//                           No resume
//                         </span>
//                       )}
//                     </td>

//                     <td className="px-4 py-4">
//                       <div className="flex flex-wrap gap-2">
//                         {applicationStatuses.map((status) => (
//                           <label
//                             key={status}
//                             className={`flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition ${
//                               currentStatus === status
//                                 ? "border-[#378af9] bg-blue-50 text-[#378af9]"
//                                 : "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#378af9]/50"
//                             }`}
//                           >
//                             <input
//                               type="radio"
//                               name={`status-${application._id}`}
//                               value={status}
//                               checked={currentStatus === status}
//                               onChange={() =>
//                                 setSelectedStatuses((prev) => ({
//                                   ...prev,
//                                   [application._id]: status,
//                                 }))
//                               }
//                               className="h-3.5 w-3.5 accent-[#378af9]"
//                             />

//                             {status}
//                           </label>
//                         ))}
//                       </div>

//                       <button
//                         onClick={() =>
//                           handleUpdateApplicationStatus(
//                             application._id,
//                             currentStatus
//                           )
//                         }
//                         className="mt-3 rounded-full bg-[#378af9] px-4 py-2 text-xs font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-600"
//                       >
//                         Update Status
//                       </button>
//                     </td>

//                     <td className="px-4 py-4">
//                       <button
//                         onClick={() =>
//                           handleDeleteApplication(application._id)
//                         }
//                         className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const Input = ({ label, ...props }) => {
//   return (
//     <div>
//       <label className="mb-1 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         {...props}
//         className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//       />
//     </div>
//   );
// };

// const Textarea = ({ label, ...props }) => {
//   return (
//     <div>
//       <label className="mb-1 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <textarea
//         {...props}
//         rows="3"
//         className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
//       />
//     </div>
//   );
// };

// const EmptyState = ({ text }) => {
//   return (
//     <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
//       <p className="font-medium text-gray-500">{text}</p>
//     </div>
//   );
// };

// export default AdminCareerPage;


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Users,
  PlusCircle,
  Loader2,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  Clock,
  Search,
  Sparkles,
  ListChecks,
} from "lucide-react";

const initialForm = {
  title: "",
  department: "",
  location: "Bhopal, Madhya Pradesh",
  jobType: "Internship",
  experience: "Fresher",
  salary: "Not Disclosed",
  skills: "",
  description: "",
  responsibilities: "",
  requirements: "",
  isActive: true,
};

const applicationStatuses = ["Pending", "Shortlisted", "Selected", "Rejected"];

const AdminCareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [activeSection, setActiveSection] = useState("Candidate Requests");
  const [search, setSearch] = useState("");
  const [applicationFilter, setApplicationFilter] = useState("All");
  const [openingFilter, setOpeningFilter] = useState("All");

  const getAuthHeaders = () => {
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchCareerData = async () => {
    try {
      setLoading(true);

      const [jobsRes, applicationsRes] = await Promise.all([
        axios.get("/api/careers/jobs", {
          headers: getAuthHeaders(),
        }),
        axios.get("/api/careers/applications", {
          headers: getAuthHeaders(),
        }),
      ]);

      setJobs(jobsRes.data.data || []);
      setApplications(applicationsRes.data.data || []);
    } catch (error) {
      console.log("Career admin fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Failed to fetch career data",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerData();
  }, []);

  const stats = useMemo(() => {
    const totalJobs = jobs.filter((job) => job.jobType !== "Internship").length;

    const totalInternships = jobs.filter(
      (job) => job.jobType === "Internship"
    ).length;

    const internshipRequests = applications.filter(
      (application) => application.job?.jobType === "Internship"
    ).length;

    return {
      totalOpenings: jobs.length,
      totalJobs,
      totalInternships,
      totalApplications: applications.length,
      internshipRequests,
    };
  }, [jobs, applications]);

  const filteredOpenings = useMemo(() => {
    return jobs.filter((job) => {
      if (openingFilter === "All") return true;
      if (openingFilter === "Jobs") return job.jobType !== "Internship";
      if (openingFilter === "Internships") return job.jobType === "Internship";
      return true;
    });
  }, [jobs, openingFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = `
        ${application.name || ""}
        ${application.email || ""}
        ${application.phone || ""}
        ${application.job?.title || ""}
        ${application.job?.jobType || ""}
        ${application.status || ""}
      `.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesFilter =
        applicationFilter === "All"
          ? true
          : applicationFilter === "Internship Requests"
          ? application.job?.jobType === "Internship"
          : application.job?.jobType !== "Internship";

      return matchesSearch && matchesFilter;
    });
  }, [applications, search, applicationFilter]);

  const handleStatCardClick = (type) => {
    if (type === "allOpenings") {
      setOpeningFilter("All");
      setActiveSection("Available Openings");
    }

    if (type === "jobs") {
      setOpeningFilter("Jobs");
      setActiveSection("Available Openings");
    }

    if (type === "internships") {
      setOpeningFilter("Internships");
      setActiveSection("Available Openings");
    }

    if (type === "allApplications") {
      setApplicationFilter("All");
      setActiveSection("Candidate Requests");
    }

    if (type === "internshipRequests") {
      setApplicationFilter("Internship Requests");
      setActiveSection("Candidate Requests");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.department || !formData.description) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Title, department and description are required.",
      });
      return;
    }

    try {
      setCreating(true);

      await axios.post("/api/careers/jobs", formData, {
        headers: getAuthHeaders(),
      });

      Swal.fire({
        icon: "success",
        title: "Created!",
        text: `${formData.jobType} created successfully!`,
        timer: 1800,
        showConfirmButton: false,
      });

      setFormData(initialForm);
      setActiveSection("Available Openings");
      setOpeningFilter("All");
      fetchCareerData();
    } catch (error) {
      console.log("Create career job error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Failed to create opening",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteJob = async (id) => {
    const result = await Swal.fire({
      title: "Delete Opening?",
      text: "Are you sure you want to delete this opening?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/careers/jobs/${id}`, {
        headers: getAuthHeaders(),
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Opening deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchCareerData();
    } catch (error) {
      console.log("Delete job error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Failed to delete opening",
      });
    }
  };

  const handleDeleteApplication = async (id) => {
    const result = await Swal.fire({
      title: "Delete Request?",
      text: "Are you sure you want to delete this candidate request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/careers/applications/${id}`, {
        headers: getAuthHeaders(),
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Candidate request deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      console.log("Delete application error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Failed to delete request",
      });
    }
  };

  // const handleUpdateApplicationStatus = async (id, status) => {
  //   if (!status) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Select Status",
  //       text: "Please select a status before updating.",
  //     });
  //     return;
  //   }

  //   const result = await Swal.fire({
  //     title: "Update Status?",
  //     text: `Are you sure you want to change status to "${status}"?`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, Update",
  //     cancelButtonText: "Cancel",
  //     confirmButtonColor: "#378af9",
  //     cancelButtonColor: "#ef4444",
  //   });

  //   if (!result.isConfirmed) return;

  //   try {
  //     const res = await axios.put(
  //       `/api/careers/applications/${id}`,
        
  //       { status },
  //       {
  //         headers: getAuthHeaders(),
  //       }
  //     );

  //     const updatedApplication = res.data.data;

  //     setApplications((prev) =>
  //       prev.map((application) =>
  //         application._id === id
  //           ? updatedApplication || { ...application, status }
  //           : application
  //       )
  //     );

  //     Swal.fire({
  //       icon: "success",
  //       title: "Updated!",
  //       text: "Application status updated successfully.",
  //       timer: 1800,
  //       showConfirmButton: false,
  //     });
  //   } catch (error) {
  //     console.log("Update application status error:", error);

  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed!",
  //       text: error.response?.data?.message || "Failed to update status.",
  //     });
  //   }
  // };

  const handleUpdateApplicationStatus = async (id, status, skipConfirm = false) => {
  if (!status) {
    Swal.fire({
      icon: "warning",
      title: "Select Status",
      text: "Please select a status before updating.",
    });
    return;
  }

  // अगर skipConfirm false है तो ही कन्फर्मेशन दिखाएँ
  if (!skipConfirm) {
    const result = await Swal.fire({
      title: "Update Status?",
      text: `Are you sure you want to change status to "${status}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#378af9",
      cancelButtonColor: "#ef4444",
    });
    if (!result.isConfirmed) return;
  }

  try {
    const res = await axios.put(
      `/api/careers/applications/${id}`,
      { status },
      { headers: getAuthHeaders() }
    );

    const updatedApplication = res.data.data;

    setApplications((prev) =>
      prev.map((application) =>
        application._id === id
          ? updatedApplication || { ...application, status }
          : application
      )
    );

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Application status updated successfully.",
      timer: 1800,
      showConfirmButton: false,
    });
  } catch (error) {
    console.log("Update application status error:", error);
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: error.response?.data?.message || "Failed to update status.",
    });
  }
};
  const getResumeUrl = (resumePath) => {
    if (!resumePath) return "#";
    if (resumePath.startsWith("http")) return resumePath;
    return resumePath.startsWith("/") ? resumePath : `/${resumePath}`;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-1 py-2 md:px-0 lg:px-10">
      <motion.div
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "#f1f3f5" }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full opacity-5 blur-3xl"
        style={{ background: "#eceef0" }}
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
            <Sparkles className="h-4 w-4" />
            Admin Career Panel
          </span>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Manage <span className="text-[#378af9]">Jobs & Internships</span>
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Create new openings, view available jobs and internships, and track
            candidate application requests.
          </p>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#378af9]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <SectionButton
              active={activeSection === "Create Opening"}
              icon={<PlusCircle />}
              label="Create Opening"
              onClick={() => setActiveSection("Create Opening")}
            />

            <SectionButton
              active={activeSection === "Available Openings"}
              icon={<ListChecks />}
              label="Available Openings"
              onClick={() => {
                setOpeningFilter("All");
                setActiveSection("Available Openings");
              }}
            />

            <SectionButton
              active={activeSection === "Candidate Requests"}
              icon={<Users />}
              label="Candidate Requests"
              onClick={() => setActiveSection("Candidate Requests")}
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-[#378af9]" />
          </div>
        ) : (
          <>
            {activeSection === "Create Opening" && (
              <CreateOpeningSection
                formData={formData}
                handleChange={handleChange}
                handleCreateJob={handleCreateJob}
                creating={creating}
              />
            )}

            {activeSection === "Available Openings" && (
              <AvailableOpeningsSection
                jobs={filteredOpenings}
                openingFilter={openingFilter}
                setOpeningFilter={setOpeningFilter}
                handleDeleteJob={handleDeleteJob}
              />
            )}

            {activeSection === "Candidate Requests" && (
              <CandidateRequestsTable
                applications={filteredApplications}
                search={search}
                setSearch={setSearch}
                applicationFilter={applicationFilter}
                setApplicationFilter={setApplicationFilter}
                stats={stats}
                getResumeUrl={getResumeUrl}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateApplicationStatus={handleUpdateApplicationStatus}
                applicationStatuses={applicationStatuses}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

const SectionButton = ({ active, icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
        active
          ? "bg-[#378af9] text-white shadow-md shadow-blue-200/50"
          : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-[#378af9]"
      }`}
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      {label}
    </button>
  );
};

const CreateOpeningSection = ({
  formData,
  handleChange,
  handleCreateJob,
  creating,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
          <PlusCircle className="h-5 w-5 text-[#378af9]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Opening</h2>
          <p className="text-sm text-gray-500">Add job or internship</p>
        </div>
      </div>

      <form onSubmit={handleCreateJob} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="MERN Stack Developer Intern"
            required
          />

          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Development"
            required
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Opening Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
            >
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Bhopal, Madhya Pradesh"
          />

          <Input
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Fresher / 1-2 Years"
          />

          <Input
            label="Salary / Stipend"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Stipend Based / Not Disclosed"
          />
        </div>

        <Input
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write short job description..."
          required
        />

        <Textarea
          label="Responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="Build UI, Create APIs, Fix bugs"
        />

        <Textarea
          label="Requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="JavaScript, React, Git"
        />

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 accent-[#378af9]"
          />
          Active opening
        </label>

        <button
          type="submit"
          disabled={creating}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {creating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Create Opening
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

const AvailableOpeningsSection = ({
  jobs,
  openingFilter,
  setOpeningFilter,
  handleDeleteJob,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Available Openings
          </h2>
          <p className="text-sm text-gray-500">
            Showing:{" "}
            <span className="font-semibold text-[#378af9]">
              {openingFilter}
            </span>
          </p>
        </div>

        <select
          value={openingFilter}
          onChange={(e) => setOpeningFilter(e.target.value)}
          className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
        >
          <option value="All">All</option>
          <option value="Jobs">Jobs</option>
          <option value="Internships">Internships</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <EmptyState text="No openings found." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#378af9]/40 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm font-semibold text-[#378af9]">
                    {job.department}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
                  {job.jobType}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#378af9]" />
                  {job.location}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#378af9]" />
                  {job.experience}
                </p>

                <p className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-[#378af9]" />
                  {job.salary}
                </p>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                {job.description}
              </p>

              <button
                onClick={() => handleDeleteJob(job._id)}
                className="mt-4 flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ====== UPDATED CandidateRequestsTable ======
const CandidateRequestsTable = ({
  applications,
  search,
  setSearch,
  applicationFilter,
  setApplicationFilter,
  stats,
  getResumeUrl,
  handleDeleteApplication,
  handleUpdateApplicationStatus,
  applicationStatuses,
}) => {
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const initial = {};
    applications.forEach((app) => {
      initial[app._id] = app.status || "Pending";
    });
    setSelectedStatus(initial);
  }, [applications]);

  const handleStatusChange = (appId, newStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [appId]: newStatus }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";
      case "Shortlisted":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Candidate Requests
          </h2>

          <p className="text-sm text-gray-500">
            Total internship requests:{" "}
            <span className="font-bold text-[#378af9]">
              {stats.internshipRequests}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={applicationFilter}
            onChange={(e) => setApplicationFilter(e.target.value)}
            className="rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
          >
            <option value="All">All Requests</option>
            <option value="Internship Requests">Internship Requests</option>
            <option value="Job Requests">Job Requests</option>
          </select>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20 sm:w-72"
            />
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <EmptyState text="No candidate requests found." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full min-w-[900px] border-collapse">

<thead>
  <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">
    <th className="px-1.5 py-4 text-center font-semibold w-12">S.No</th>
    <th className="px-1.5 py-4 font-semibold">Candidate</th>
    <th className="px-1.5 py-4 font-semibold">Contact</th>
    <th className="px-1.5 py-4 font-semibold">Applied For</th>
    <th className="px-1.5 py-4 font-semibold">Type</th>
    <th className="px-1.5 py-4 font-semibold">Status</th>
    <th className="px-1.5 py-4 font-semibold">Resume</th>
    <th className="px-3 py-4 font-semibold">Update Status</th>
    <th className="px-1 py-4 font-semibold">Action</th>
  </tr>
</thead>
            <tbody>
              {applications.map((application, index) => {
                const currentStatus =
                  selectedStatus[application._id] ||
                  application.status ||
                  "Pending";

                return (
                  <tr
                    key={application._id}
                    className="border-b border-gray-100 text-sm transition hover:bg-blue-50/50"
                  >
                    {/* S.No */}
                    <td className="px-2 py-4 text-center text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-semibold text-gray-900">
                        {application.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-[#378af9]" />
                        {application.email}
                      </p>

                      <p className="mt-1 flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4 text-[#378af9]" />
                        {application.phone}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-semibold text-gray-900">
                        {application.job?.title || "Job deleted"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {application.job?.department || "N/A"}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
                        {application.job?.jobType || "N/A"}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          application.status || "Pending"
                        )}`}
                      >
                        {application.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      {application.resume ? (
                        <a
                          href={getResumeUrl(application.resume)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#378af9] px-4 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">
                          No resume
                        </span>
                      )}
                    </td>

                    {/* <td className="px-3 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={currentStatus}
                          onChange={(e) =>
                            handleStatusChange(application._id, e.target.value)
                          }
                          className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                        >
                          {applicationStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() =>
                            handleUpdateApplicationStatus(
                              application._id,
                              currentStatus
                            )
                          }
                          className="rounded-full bg-[#378af9] px-3 py-1.5 text-xs font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </div>
                    </td> */}
                    <td className="px-3 py-4">
  <select
    value={currentStatus}
    onChange={(e) => {
      const newStatus = e.target.value;
      // Optimistically update local state
      handleStatusChange(application._id, newStatus);
      // Auto-update without confirmation
      handleUpdateApplicationStatus(application._id, newStatus, true);
    }}
    className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium outline-none focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
  >
    {applicationStatuses.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
  {/* Update button REMOVED */}
</td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() =>
                          handleDeleteApplication(application._id)
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
      />
    </div>
  );
};

const Textarea = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        {...props}
        rows="3"
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
      />
    </div>
  );
};

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
      <p className="font-medium text-gray-500">{text}</p>
    </div>
  );
};

export default AdminCareerPage;