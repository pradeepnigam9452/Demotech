import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire(
          "Updated!",
          "Client project updated successfully.",
          "success"
        );
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
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this project?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
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
  };

  return (
    <div className="md:p-4 bg-gray-100 min-h-screen relative">
      <h1 className="text-3xl font-bold text-[#1B3C53] pb-3">
        Client Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between transition hover:shadow-lg border border-gray-100"
          >
            {/* Top Section: Logo + Basic Info */}
            <div className="flex items-start gap-4">
              <img
                src={`/uploads/projects/${project.logo}`}
                alt={project.projectName}
                className="w-28 h-28 sm:w-20 sm:h-20 rounded-xl object-contain bg-white p-3 shadow-lg border border-gray-200 hover:scale-105 transition duration-300"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1B3C53] leading-tight">
                  {project.projectName}
                </h3>
                <p className="text-xs text-gray-500">Project Name</p>

                <p className="mt-1 font-medium text-gray-700">
                  {project.clientName}
                </p>
                <p className="text-xs text-gray-500">Client Name</p>
              </div>
            </div>

            {/* Middle Section: Details */}
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <div>
                <span className="text-gray-500 font-medium">Company:</span>{" "}
                {project.companyName}
              </div>
              <div>
                <span className="text-gray-500 font-medium">Mobile:</span>{" "}
                {project.mobile}
              </div>
              <div>
                <span className="text-gray-500 font-medium">Email:</span>{" "}
                {project.email}
              </div>
              <div>
                <span className="text-gray-500 font-medium">Details:</span>
                <p className="text-xs text-gray-600 mt-1">
                  {project.projectDetail}
                </p>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  className="text-blue-600 hover:underline text-xs inline-block mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Visit Link
                </a>
              )}
            </div>

            {/* Bottom Section: Actions */}
            <div className="mt-6 flex justify-end gap-2 text-sm">
              <button
                onClick={() => handleEdit(project)}
                className="px-4 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="px-4 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={openAddModal}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-blue-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg text-base sm:text-lg z-50"
      >
        + Add Client Project
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000005e] z-50 flex justify-center items-start overflow-y-auto px-4 py-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative max-h-full overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-[#1B3C53] mb-2">
              {editingId ? "Edit Client Project" : "Add New Client Project"}
            </h3>

            {/* --- Section 1 --- */}
            <div className="space-y-6">
              {/* Section 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>

              {/* Section 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Project Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>

              {/* Project Detail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Project Detail
                </label>
                <textarea
                  name="projectDetail"
                  value={formData.projectDetail}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief about the project"
                  required
                ></textarea>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  required={!editingId}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientProjectManager;
