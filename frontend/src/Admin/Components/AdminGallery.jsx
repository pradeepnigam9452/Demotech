import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ImagePlus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Search,
  Link as LinkIcon,
} from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  category: "Other",
  imageAlt: "",
  projectLink: "",
  status: "Active",
};

const categories = [
  "Logo",
  "Project Image",
  "Office Image",
  "Team Image",
  "Event Image",
  "Digital Marketing",
  "Banner",
  "Other",
];

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const getAuthHeaders = () => {
    const token =
      sessionStorage.getItem("adminToken");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `/${imagePath.replace(/\\/g, "/")}`;
  };

  const getAllGallery = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/gallery");

      setGallery(res.data.data || []);
    } catch (error) {
      console.log("Gallery Fetch Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch gallery",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGallery();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setSelectedFile(null);
    setPreviewImage("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please enter gallery title",
      });
      return;
    }

    if (!editingId && !selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please select an image",
      });
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("imageAlt", formData.imageAlt);
      data.append("projectLink", formData.projectLink);
      data.append("status", formData.status);

      if (selectedFile) {
        data.append("image", selectedFile);
      }

      if (editingId) {
        await axios.put(`/api/gallery/${editingId}`, data, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Gallery item updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post("/api/gallery", data, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Uploaded",
          text: "Gallery item added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      resetForm();
      getAllGallery();
    } catch (error) {
      console.log("Gallery Save Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Other",
      imageAlt: item.imageAlt || "",
      projectLink: item.projectLink || "",
      status: item.status || "Active",
    });

    setSelectedFile(null);
    setPreviewImage(getImageUrl(item.image));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This gallery item will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/gallery/${id}`, {
        headers: getAuthHeaders(),
      });

      setGallery((prev) => prev.filter((item) => item._id !== id));

      if (editingId === id) {
        resetForm();
      }

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Gallery item deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("Gallery Delete Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete gallery item",
      });
    }
  };

  const filteredGallery = gallery.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.status?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Gallery Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Upload logos, project images, banners, team images, and more.
            </p>
          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Total Items: {gallery.length}
          </div>
        </div>

        {/* Form */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {editingId ? "Update Gallery Item" : "Create Gallery Item"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <X size={16} />
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleChange}
                    placeholder="Example: Binarylogix logo"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Project Link
                </label>
                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />
                  <input
                    type="text"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write short description"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Image {!editingId && "*"}
              </label>

              <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 text-center hover:bg-blue-50">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-48 w-full rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <ImagePlus size={42} className="mb-3 text-blue-500" />
                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload image
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG, WEBP, SVG
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                disabled={saving}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : editingId ? (
                  <>
                    <Pencil size={18} />
                    Update Gallery
                  </>
                ) : (
                  <>
                    <ImagePlus size={18} />
                    Create Gallery
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Search */}
        <div className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
          <h2 className="text-lg font-bold text-slate-900">Gallery Items</h2>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category, status..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pl-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Gallery List */}
        {loading ? (
          <div className="flex h-60 items-center justify-center rounded-2xl bg-white">
            <Loader2 size={34} className="animate-spin text-blue-600" />
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <ImagePlus size={48} className="mx-auto mb-3 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-800">
              No gallery items found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create your first gallery item from the form above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGallery.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.imageAlt || item.title}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-1 text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-blue-600">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  {item.description && (
                    <p className="line-clamp-2 text-sm text-slate-500">
                      {item.description}
                    </p>
                  )}

                  {item.projectLink && (
                    <a
                      href={item.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      <LinkIcon size={14} />
                      Open Link
                    </a>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
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
    </div>
  );
};

export default AdminGallery;