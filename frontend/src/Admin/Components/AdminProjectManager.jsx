


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { MoreVertical, Edit, Trash2, ExternalLink, Plus, X } from 'lucide-react';

// const initialForm = {
//   title: '',
//   description: '',
//   link: '',
//   features: [],
//   image: null,
// };

// const AdminProjectManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState(initialForm);
//   const [image, setImage] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(null);

//   const toggleMenu = (id) => {
//     setMenuOpen(menuOpen === id ? null : id);
//   };

//   useEffect(() => { fetchProjects(); }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('/api/projects/getAllProjects');
//       setProjects(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) =>
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const openAddModal = () => {
//     setFormData({ title: '', description: '', link: '', features: [], image: null });
//     setImage(null);
//     setEditingId(null);
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('link', formData.link);
    
//     let featuresArray = [];
//     if (typeof formData.features === 'string') {
//       featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
//     } else if (Array.isArray(formData.features)) {
//       featuresArray = formData.features;
//     }
//     data.append('features', JSON.stringify(featuresArray));
//     if (image) data.append('image', image);

//     try {
//       if (editingId) {
//         await axios.put(`/api/projects/updateProject/${editingId}`, data);
//         Swal.fire('Updated!', 'Project updated successfully.', 'success');
//       } else {
//         await axios.post('/api/projects/addProject', data);
//         Swal.fire('Added!', 'Project added successfully.', 'success');
//       }
//       fetchProjects();
//       setShowModal(false);
//     } catch (err) {
//       console.log(err);
//       Swal.fire('Error', err.response?.data?.error || err.message, 'error');
//     }
//   };

//   const handleEdit = (project) => {
//     setFormData({
//       title: project.title || '',
//       description: project.description || '',
//       link: project.link || '',
//       features: Array.isArray(project.features) ? project.features.join(', ') : '',
//       image: null,
//     });
//     setEditingId(project._id);
//     setImage(null);
//     setShowModal(true);
//     setMenuOpen(null);
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Delete this project?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       confirmButtonColor: '#dc2626',
//     });
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`/api/projects/deleteProject/${id}`);
//         Swal.fire('Deleted!', 'Project has been deleted.', 'success');
//         fetchProjects();
//       } catch (err) {
//         Swal.fire('Error', err.message, 'error');
//       }
//     }
//     setMenuOpen(null);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* Header */}
  

// <div className="mb-8">
//   <div className="flex justify-between items-center">
//     <h1 className="text-2xl md:text-3xl font-bold text-[#1B3C53]">Projects</h1>
    
//     <button
//       onClick={openAddModal}
//       className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//     >
//       <Plus size={18} />
//       <span>Add Project</span>
//     </button>
//   </div>
// </div>
//       {/* Project Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <div
//             key={project._id}
//             className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
//           >
//             {/* Image Container */}
//             <div className="relative h-52 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
//               <img
//                 src={`/uploads/projects/${project.image}`}
//                 alt={project.title}
//                 className="max-h-full max-w-full object-contain"
//               />
//               {/* Action Menu Button */}
//               <div className="absolute top-3 right-3">
//                 <button
//                   onClick={() => toggleMenu(project._id)}
//                   className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
//                 >
//                   <MoreVertical size={18} className="text-gray-600" />
//                 </button>
//                 {/* Dropdown Menu */}
//                 {menuOpen === project._id && (
//                   <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
//                     <button
//                       onClick={() => handleEdit(project)}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
//                     >
//                       <Edit size={14} />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(project._id)}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors"
//                     >
//                       <Trash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-5">
//               <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
//                 {project.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                 {project.description}
//               </p>

//               {/* Features List */}
//               {(project.features || []).length > 0 && (
//                 <div className="mb-3">
//                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                     Features
//                   </p>
//                   <ul className="flex flex-wrap gap-1.5">
//                     {(project.features || []).slice(0, 3).map((feature, idx) => (
//                       <li
//                         key={idx}
//                         className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
//                       >
//                         {feature}
//                       </li>
//                     ))}
//                     {(project.features || []).length > 3 && (
//                       <li className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
//                         +{(project.features || []).length - 3} more
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               )}

//               {/* Link */}
//               {project.link && (
//                 <a
//                   href={project.link}
//                   className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Visit Project
//                   <ExternalLink size={14} />
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {projects.length === 0 && (
//         <div className="text-center py-16 bg-white rounded-xl shadow-sm">
//           <p className="text-gray-500">No projects yet. Click "Add Project" to get started.</p>
//         </div>
//       )}

//       {/* Modal Form */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {editingId ? 'Edit Project' : 'Add New Project'}
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
//                   <input
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Project title"
//                     required
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Project description"
//                     required
//                   />
//                 </div>

//                 {/* Link */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
//                   <input
//                     name="link"
//                     value={formData.link}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="https://..."
//                   />
//                 </div>

//                 {/* Features */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Features (comma-separated)
//                   </label>
//                   <input
//                     name="features"
//                     value={formData.features}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Responsive, Fast, Secure"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Separate each feature with a comma</p>
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Project Image {!editingId && '*'}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
//                     required={!editingId}
//                   />
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all"
//                 >
//                   {editingId ? 'Update Project' : 'Add Project'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProjectManager;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Plus,
  X,
  UserPlus,
} from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  link: "",
  features: "",
  image: null,
};

const AdminProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const [assignModal, setAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchProjects();
    fetchStaff();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects/getAllProjects");
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("/api/allstaff");
      setStaffList(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setFormData(initialForm);
    setImage(null);
    setEditingId(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("link", formData.link);

    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    data.append("features", JSON.stringify(featuresArray));

    if (image) {
      data.append("image", image);
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      if (editingId) {
        await axios.put(`/api/projects/updateProject/${editingId}`, data, config);
        Swal.fire("Updated!", "Project updated successfully.", "success");
      } else {
        await axios.post("/api/projects/addProject", data, config);
        Swal.fire("Added!", "Project added successfully.", "success");
      }

      fetchProjects();
      setShowModal(false);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || err.message, "error");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "",
      features: Array.isArray(project.features)
        ? project.features.join(", ")
        : "",
      image: null,
    });

    setEditingId(project._id);
    setImage(null);
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this project?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/projects/deleteProject/${id}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        Swal.fire("Deleted!", "Project has been deleted.", "success");
        fetchProjects();
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || err.message, "error");
      }
    }

    setMenuOpen(null);
  };

  const openAssignModal = (project) => {
    setSelectedProject(project);
    setSelectedStaffIds(project.assignedTo?.map((s) => s._id || s) || []);
    setAssignModal(true);
    setMenuOpen(null);
  };

  const handleStaffSelect = (id) => {
    setSelectedStaffIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleAssignProject = async () => {
    try {
      await axios.put(
        "/api/projects/assignProject",
        {
          projectId: selectedProject._id,
          staffIds: selectedStaffIds,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      Swal.fire("Assigned!", "Project assigned successfully.", "success");
      setAssignModal(false);
      fetchProjects();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B3C53]">
            Projects
          </h1>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md"
          >
            <Plus size={18} />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative h-52 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
              <img
                src={`/uploads/projects/${project.image}`}
                alt={project.title}
                className="max-h-full max-w-full object-contain"
              />

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleMenu(project._id)}
                  className="p-2 bg-white rounded-full shadow-md"
                >
                  <MoreVertical size={18} className="text-gray-600" />
                </button>

                {menuOpen === project._id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                    <button
                      onClick={() => openAssignModal(project)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2"
                    >
                      <UserPlus size={14} />
                      Assign
                    </button>

                    <button
                      onClick={() => handleEdit(project)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              {(project.features || []).length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Features
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {(project.features || []).slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Assigned Staff
                </p>

                {project.assignedTo?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {project.assignedTo.map((staff) => (
                      <span
                        key={staff._id || staff}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      >
                        {staff.name || staff.staffId || "Staff"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">Not assigned yet</p>
                )}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            No projects yet. Click "Add Project" to get started.
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h3>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Project title"
                  required
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Project description"
                  required
                />

                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://..."
                  required
                />

                <input
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="React, Node, MongoDB"
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-sm"
                  required={!editingId}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {editingId ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {assignModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                Assign Project
              </h3>

              <button
                onClick={() => setAssignModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Project: <b>{selectedProject?.title}</b>
            </p>

            <div className="space-y-3">
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <label
                    key={staff._id}
                    className="flex items-center justify-between border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {staff.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {staff.staffId} • {staff.category}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedStaffIds.includes(staff._id)}
                      onChange={() => handleStaffSelect(staff._id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                  </label>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">
                  No staff found
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setAssignModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAssignProject}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Assign Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectManager;