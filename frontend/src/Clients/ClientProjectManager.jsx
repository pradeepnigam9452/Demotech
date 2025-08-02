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
      const res = await axios.get("/api/client-projects");
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
      fetchProjects();
      setShowModal(false);
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-xl shadow p-4 relative"
          >
            <img
              src={`/uploads/logos/${project.logo}`}
              alt={project.projectName}
              className="w-full h-56 object-contain rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#1B3C53]">
              {project.projectName}
            </h3>
            <p className="text-gray-700 mt-1 font-semibold">
              {project.clientName}
            </p>
            <p className="text-sm text-gray-600">{project.companyName}</p>
            <p className="text-sm mt-1">📞 {project.mobile}</p>
            <p className="text-sm">📧 {project.email}</p>
            <p className="text-gray-600 mt-2">{project.projectDetail}</p>
            <a
              href={project.link}
              className="text-blue-600 hover:underline block mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Link
            </a>

            <div className="flex mt-4 w-36 text-sm gap-2 z-10 p-2 rounded-xl shadow">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg"
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
        className="fixed top-6 right-6 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-full shadow-lg text-lg"
      >
        + Add Client Project
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000005e] flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg  relative"
          >
            <h3 className="text-xl font-semibold text-[#1B3C53] mb-2">
              {editingId ? "Edit Client Project" : "Add New Client Project"}
            </h3>

            {/* --- Section 1 --- */}
            <div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Name */}
                <div>
                  <label className="block font-medium">Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>

                {/* Client Name */}
                <div>
                  <label className="block font-medium">Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block font-medium">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>

                {/* Mobile No. */}
                <div>
                  <label className="block font-medium">Mobile No.</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            {/* --- Section 2 --- */}
            <div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>

                {/* Project Link */}
                <div>
                  <label className="block font-medium">Project Link</label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Project Detail */}
              <div className="mt-4">
                <label className="block font-medium">Project Detail</label>
                <textarea
                  name="projectDetail"
                  value={formData.projectDetail}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  rows={3}
                  required
                />
              </div>

              {/* Logo Upload */}
              <div className="mt-4">
                <label className="block font-medium">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="w-full mt-1 p-2 border rounded"
                  required={!editingId}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {editingId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientProjectManager;
