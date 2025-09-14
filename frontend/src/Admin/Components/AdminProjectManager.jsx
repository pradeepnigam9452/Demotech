import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MoreVertical } from 'lucide-react';

const initialForm = {
  title: '',
  description: '',
  link: '',
  features: [], // ✅ this must be an array, not a string
  image: null,
};

const AdminProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

const handleOutsideClick = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(false);
    }
  };


  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects/getAllProjects');
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err); 
    }
  };

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const openAddModal = () => {
    setFormData(initialForm);
    setImage(null);
    setEditingId(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('link', formData.link);
    data.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim())));
    if (image) data.append('image', image);

    try {
      if (editingId) {
        await axios.put(`/api/projects/updateProject/${editingId}`, data);
        Swal.fire('Updated!', 'Project updated successfully.', 'success');
      } else {
        await axios.post('/api/projects/addProject', data);
        Swal.fire('Added!', 'Project added successfully.', 'success');
      }
      fetchProjects();
      setShowModal(false);
    } catch (err) {
      console.log(err)
      Swal.fire('Error', err.response?.data?.error || err.message, 'error');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title ||'',
      description: project.description ||'',
      link: project.link ||'',
features: Array.isArray(project.features) ? project.features.join(', ') : '',
    }); 
    setEditingId(project._id);
    setImage(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this project?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/projects/deleteProject/${id}`);
        Swal.fire('Deleted!', 'Project has been deleted.', 'success');
        fetchProjects();
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  return (
    <div className="   bg-gray-100 min-h-screen relative">
 <h1 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-6">
                Projects
              </h1>
      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow p-4 relative">
            <img
              src={`/uploads/projects/${project.image}`}
              alt={project.title}
              className="w-full h-60 object-contain rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#1B3C53]">{project.title}</h3>
            <p className="text-gray-600 mt-1">{project.description}</p>
            <p className="text-sm mt-2">
              <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
  {(project.features || []).map((feature, idx) => (
    <li key={idx}>{feature}</li>
  ))}
</ul>
            </p>
            <a
              href={project.link}
              className="inline-block text-blue-600 bg-gray-150 hover:underline mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Link
            </a>

        <div className="flex mt-2 w-36 bg-white text-sm gap-2 z-10 p-2 rounded-xl shadow">
  <button
    onClick={() => {
      handleEdit(project);
      setMenuOpen(false);
    }}
    className="flex-1 px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg transition-colors duration-200"
  >
    Edit
  </button>
  <button
    onClick={() => {
      handleDelete(project._id);
      setMenuOpen(false);
    }}
    className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200"
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
        + Add Project
      </button>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000005e] bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg space-y-4 relative"
          >
            <h3 className="text-xl font-semibold text-[#1B3C53]">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            {['title', 'description', 'link', 'features',].map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize">{field}</label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder={field === 'features' ? 'Comma-separated values' : ''}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block font-medium">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full mt-1 p-2 border rounded"
                required={!editingId}
              />
            </div>

            <div className="flex justify-end gap-2">
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
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjectManager;
