

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, ExternalLink, X, Building, Phone, Mail, Briefcase, User, Link as LinkIcon } from "lucide-react";

const initialForm = {
  projectName: "",
  clientName: "",
  companyName: "",
  mobile: "",
  email: "",
  projectDetail: "",
  link: "",
};

const ClientProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [logo, setLogo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/client-projects/getAllClientProjects");
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const openAddModal = () => {
    setFormData(initialForm);
    setLogo(null);
    setEditingId(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (logo) data.append("logo", logo);

    try {
      if (editingId) {
        await axios.put(`/api/client-projects/${editingId}`, data);
        Swal.fire("Updated!", "Client project updated successfully.", "success");
      } else {
        await axios.post("/api/client-projects/add", data);
        Swal.fire("Added!", "Client project added successfully.", "success");
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || err.message, "error");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      projectName: project.projectName || "",
      clientName: project.clientName || "",
      companyName: project.companyName || "",
      mobile: project.mobile || "",
      email: project.email || "",
      projectDetail: project.projectDetail || "",
      link: project.link || "",
    });
    setLogo(null);
    setEditingId(project._id);
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this project?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#dc2626",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/client-projects/${id}`);
        Swal.fire("Deleted!", "Client project has been deleted.", "success");
        fetchProjects();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
    setMenuOpen(null);
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Client Projects</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus size={18} />
          <span>Add Client Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Header with Logo */}
            <div className="relative p-5 pb-3 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100">
                  <img
                    src={`/uploads/projects/${project.logo}`}
                    alt={project.projectName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    {project.projectName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Project Name</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <User size={12} className="text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      {project.clientName}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 ml-5">Client Name</p>
                </div>
              </div>
              
              {/* Menu Button */}
              <button
                onClick={() => toggleMenu(project._id)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {menuOpen === project._id && (
                <div className="absolute right-4 top-12 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  <button
                    onClick={() => handleEdit(project)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="p-5 space-y-3">
              {/* Company */}
              <div className="flex items-start gap-2">
                <Building size="15" className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm text-gray-800 font-medium">{project.companyName}</p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-start gap-2">
                <Phone size="15" className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="text-sm text-gray-800">{project.mobile}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail size="15" className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-800 break-all">{project.email}</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Project Details
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.projectDetail}
                </p>
              </div>

              {/* Link */}
              {project.link && (
                <div className="pt-1">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon size="14" />
                    Visit Project Link
                    <ExternalLink size="12" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Briefcase size="32" className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No client projects yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Add Client Project" to get started.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-8">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingId ? "Edit Client Project" : "Add New Client Project"}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size="20" className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Link
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Project Detail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Detail <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="projectDetail"
                    value={formData.projectDetail}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Brief description of the project"
                    required
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Logo {!editingId && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                    required={!editingId}
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload company logo (JPG, PNG, GIF)</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    {editingId ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProjectManager;