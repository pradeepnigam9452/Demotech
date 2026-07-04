import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Users,
  Mail,
  Phone,
  Trash2,
  CalendarDays,
  Loader2,
  X,
  Search,
  MapPin,
  Briefcase,
  IdCard,
  CalendarCheck2,
  Plus,
  Edit,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

const AdminStaffMembers = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const [search, setSearch] = useState("");

  // Create/Edit states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Detail Modal states
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({
    totalRecords: 0,
    totalWorkingDays: 0,
    presentDays: 0,
    adminLeaveDays: 0,
    absentDays: 0,
  });
  const [monthWiseAttendanceSummary, setMonthWiseAttendanceSummary] = useState([]);
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    role: "staff",
    password: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",
    address: "",
    category: "",
    designation: "",
    joiningDate: "",
    salary: "",
    experience: "",
    aadharNumber: "",
    remarks: "",
    github: "",
    profileImage: null,
  });

  const categoryOptions = [
    "HR",
    "admin",
    "Frontend Developer",
    "Backend Developer",
    "MERN Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Project Manager",
    "Business Analyst",
    "Digital Marketer",
    "Content Writer",
    "Sales Executive",
    "Support Engineer",
    "Intern",
    "Other",
  ];

  const adminToken = sessionStorage.getItem("adminToken") || "";
  const authHeaders = adminToken
    ? { Authorization: `Bearer ${adminToken}` }
    : {};

  // ---------- API Calls ----------
  const getStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/allstaff");
      const data = res.data?.staff || res.data?.data || res.data || [];
      setStaffList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Staff fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to load staff members",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  // ---------- Helpers ----------
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const formatDisplayDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "N/A";
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthLabel = (monthData, index) => {
    if (monthData?.monthName) {
      return monthData.year
        ? `${monthData.monthName} ${monthData.year}`
        : monthData.monthName;
    }
    if (typeof monthData?.month === "string" && Number.isNaN(Number(monthData.month))) {
      return monthData.year
        ? `${monthData.month} ${monthData.year}`
        : monthData.month;
    }
    const numericMonth = Number(monthData?.month);
    const numericYear = Number(monthData?.year);
    if (
      Number.isInteger(numericMonth) &&
      numericMonth >= 1 &&
      numericMonth <= 12 &&
      Number.isInteger(numericYear)
    ) {
      return new Date(numericYear, numericMonth - 1, 1).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      });
    }
    return monthData?.label || `Month ${index + 1}`;
  };

  const formatAttendanceLocation = (location) => {
    if (!location) return "N/A";
    if (typeof location === "string") return location;
    if (typeof location === "object") {
      if (location.address) return location.address;
      if (location.name) return location.name;
      const latitude = location.latitude ?? location.lat ?? location.coordinates?.[1];
      const longitude = location.longitude ?? location.lng ?? location.lon ?? location.coordinates?.[0];
      if (latitude !== undefined && longitude !== undefined) {
        return `${latitude}, ${longitude}`;
      }
    }
    return "N/A";
  };

  const getAttendanceImage = (item) =>
    item?.image ||
    item?.selfie ||
    item?.selfieImage ||
    item?.photo ||
    null;

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      role: "staff",
      password: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      city: "",
      state: "",
      pincode: "",
      emergencyContact: "",
      address: "",
      category: "",
      designation: "",
      joiningDate: "",
      salary: "",
      experience: "",
      aadharNumber: "",
      remarks: "",
      github: "",
      profileImage: null,
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  // ---------- Form Handlers ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (staff) => {
    if (!staff) {
      Swal.fire("Error", "Invalid staff data", "error");
      return;
    }
    setIsEditMode(true);
    setEditingId(staff._id);
    setFormData({
      name: staff.name || "",
      email: staff.email || "",
      number: staff.number || "",
      role: staff.role || "staff",
      password: "",
      dateOfBirth: formatDateForInput(staff.dateOfBirth),
      gender: staff.gender || "",
      maritalStatus: staff.maritalStatus || "",
      city: staff.city || "",
      state: staff.state || "",
      pincode: staff.pincode || "",
      emergencyContact: staff.emergencyContact || "",
      address: staff.address || "",
      category: staff.category || "",
      designation: staff.designation || "",
      joiningDate: formatDateForInput(staff.joiningDate),
      salary: staff.salary || "",
      experience: staff.experience || "",
      aadharNumber: staff.aadharNumber || staff.aadhaarNumber || "",
      remarks: staff.remarks || "",
      github: staff.github || "",
      profileImage: staff.profileImage,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profileImage") {
          if (value instanceof File) {
            payload.append("profileImage", value);
          }
          return;
        }
        if (key === "password" && isEditMode && !value) {
          return;
        }
        payload.append(key, value ?? "");
      });

      const url = isEditMode
        ? `/api/updatestaff/${editingId}`
        : "/api/createstaff";
      const method = isEditMode ? "put" : "post";

      await axios({
        method,
        url,
        data: payload,
        headers: { ...authHeaders },
      });

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Success!",
        text: isEditMode
          ? "Staff updated successfully!"
          : "Staff created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsModalOpen(false);
      resetForm();
      getStaff();
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          (isEditMode ? "Failed to update staff" : "Failed to create staff"),
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This staff member will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      setDeleteLoadingId(id);
      await axios.delete(`/api/deletestaff/${id}`, { headers: authHeaders });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Staff member deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });
      getStaff();
    } catch (error) {
      console.error("Delete staff error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete staff",
      });
    } finally {
      setDeleteLoadingId(null);
    }
  };

  // ----- Open Detail Modal with attendance -----
  const handleRowClick = async (staff) => {
    if (!staff) return;

    setSelectedStaff(staff);
    setIsDetailOpen(true);
    setDetailLoading(true);

    setAttendanceRecords([]);
    setMonthWiseAttendanceSummary([]);

    setAttendanceSummary({
      totalRecords: 0,
      totalWorkingDays: 0,
      presentDays: 0,
      adminLeaveDays: 0,
      absentDays: 0,
    });

    try {
      const res = await axios.get(
        `/api/admin/attendance/${staff._id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log("ATTENDANCE RESPONSE:", res.data);

      // ========================
      // OVERALL SUMMARY
      // ========================

      setAttendanceSummary({
        totalRecords: res.data?.summary?.totalRecords ?? 0,
        totalWorkingDays: res.data?.summary?.totalWorkingDays ?? 0,
        presentDays: res.data?.summary?.presentDays ?? 0,
        adminLeaveDays: res.data?.summary?.adminLeaveDays ?? res.data?.summary?.leaveDays ?? 0,
        absentDays: res.data?.summary?.absentDays ?? 0,
      });

      // ========================
      // ATTENDANCE RECORDS
      // ========================

      const records = Array.isArray(res.data?.attendance) ? res.data.attendance : [];
      const formattedRecords = records.map((item) => ({
        ...item,
        location: item.location?.fullAddress || item.location?.address || item.location?.name || formatAttendanceLocation(item.location),
        selfie: item.selfie || item.image || item.selfieImage || item.photo || null,
      }));

      setAttendanceRecords(formattedRecords);

      // ========================
      // MONTH-WISE SUMMARY
      // ========================

      const monthData = Array.isArray(res.data?.monthWiseAttendance)
        ? res.data.monthWiseAttendance
        : [];

      const formattedMonthSummary = monthData.map((month, index) => {
        const dates = Array.isArray(month?.dates) ? month.dates : [];
        const presentDays = month.presentDays ?? dates.filter((item) => item.status === "Present").length;
        const leaveDays = month.leaveDays ?? month.adminLeaveDays ?? dates.filter((item) => item.status === "Leave").length;
        const absentDays = month.absentDays ?? dates.filter((item) => item.status === "Absent").length;
        const totalRecords = month.totalRecords ?? dates.length;
        const totalWorkingDays = month.totalWorkingDays ?? presentDays + leaveDays + absentDays;
        const attendancePercentage = totalWorkingDays > 0 ? Math.round((presentDays / totalWorkingDays) * 100) : 0;

        return {
          key: month._id || month.monthKey || `${month.year}-${month.month}-${index}`,
          label: formatMonthLabel(month, index),
          totalWorkingDays,
          presentDays,
          leaveDays,
          absentDays,
          totalRecords,
          attendancePercentage,
        };
      });

      console.log("MONTH SUMMARY:", formattedMonthSummary);
      setMonthWiseAttendanceSummary(formattedMonthSummary);
    } catch (error) {
      console.error("Attendance fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to load attendance",
      });
    } finally {
      setDetailLoading(false);
    }
  };

  // Filtered staff
  const filteredStaff = useMemo(() => {
    const text = search.toLowerCase().trim();
    return staffList
      .filter((staff) => staff && typeof staff === "object")
      .filter((staff) => {
        if (!text) return true;
        return (
          staff.name?.toLowerCase().includes(text) ||
          staff.email?.toLowerCase().includes(text) ||
          staff.staffId?.toLowerCase().includes(text) ||
          staff.category?.toLowerCase().includes(text) ||
          staff.designation?.toLowerCase().includes(text)
        );
      });
  }, [search, staffList]);

  // Helper for status badge
  const getStatusBadge = (status) => {
    const val = status?.toLowerCase();
    if (val === "present") return "bg-green-100 text-green-700";
    if (val === "leave") return "bg-yellow-100 text-yellow-700";
    if (val === "absent") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-500";
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Staff Members</h1>
                <p className="text-sm text-slate-500">
                  Manage staff, view attendance details, and take actions.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
              >
                <Plus size={18} />
                Create Staff
              </button>
            </div>
          </div>
        </div>

        {/* ---------- TABLE ---------- */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={42} className="animate-spin text-blue-600" />
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            No staff members found.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Staff ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Designation</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((staff, index) => (
                    <tr
                      key={staff._id}
                      className="hover:bg-blue-50/30 cursor-pointer transition"
                      onClick={() => handleRowClick(staff)}
                    >
                      <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                      <td className="px-4 py-3 font-mono text-xs">{staff.staffId || "N/A"}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          {staff.profileImage ? (
                            <img
                              src={staff.profileImage}
                              alt={staff.name}
                              className="h-8 w-8 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                              {staff.name?.charAt(0).toUpperCase() || "S"}
                            </div>
                          )}
                          {staff.name || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 truncate max-w-[150px]">
                        {staff.email || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{staff.number || staff.mobile || "N/A"}</td>
                      <td className="px-4 py-3 text-slate-600">{staff.category || "N/A"}</td>
                      <td className="px-4 py-3 text-slate-600">{staff.designation || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            staff.status || "Active"
                          )}`}
                        >
                          {staff.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="flex items-center justify-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleEdit(staff)}
                            className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(staff._id)}
                            disabled={deleteLoadingId === staff._id}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition disabled:opacity-50"
                            title="Delete"
                          >
                            {deleteLoadingId === staff._id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
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

      {/* ---------- Create/Edit Modal (unchanged) ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Users size={24} className="text-blue-600" />
                {isEditMode ? "Edit Staff" : "Create Staff"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Profile Image</label>
                    {isEditMode &&
                      typeof formData.profileImage === "string" &&
                      formData.profileImage && (
                        <div className="mb-2 flex items-center gap-3">
                          <img
                            src={formData.profileImage}
                            alt="Current profile"
                            className="h-14 w-14 rounded-xl object-cover border border-slate-200"
                          />
                          <span className="text-xs text-slate-500">Current image (upload a new one to replace it)</span>
                        </div>
                      )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData.profileImage instanceof File && (
                      <p className="text-sm text-slate-500 mt-1">Selected: {formData.profileImage.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter full name"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter pincode"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="staff@example.com"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="GitHub username"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Emergency contact number"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="Software Developer"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="Enter salary"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Experience (years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Years"
                      step="0.5"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Aadhar number"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Login Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {isEditMode ? "New Password" : "Password"}{" "}
                      {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!isEditMode}
                      placeholder={
                        isEditMode
                          ? "Leave blank to keep old password"
                          : "Enter password"
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter remarks"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold py-2.5"
                >
                  {formLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      {isEditMode ? "Update Staff" : "Create Staff"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Detail Modal (Staff + Attendance) ---------- */}
      {isDetailOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDetailOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border border-slate-200">
                  {selectedStaff.profileImage ? (
                    <img
                      src={selectedStaff.profileImage}
                      alt={selectedStaff.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-lg">
                      {selectedStaff.name?.charAt(0).toUpperCase() || "S"}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedStaff.name || "N/A"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {selectedStaff.staffId || "N/A"} •{" "}
                    {selectedStaff.designation || selectedStaff.category || "Staff"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Staff Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium">{selectedStaff.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium">{selectedStaff.number || selectedStaff.mobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-medium">{selectedStaff.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Designation</p>
                  <p className="font-medium">{selectedStaff.designation || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Joining Date</p>
                  <p className="font-medium">{formatDisplayDate(selectedStaff.joiningDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      selectedStaff.status || "Active"
                    )}`}
                  >
                    {selectedStaff.status || "Active"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500">City</p>
                  <p className="font-medium">{selectedStaff.city || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">State</p>
                  <p className="font-medium">{selectedStaff.state || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Pincode</p>
                  <p className="font-medium">{selectedStaff.pincode || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="font-medium">{selectedStaff.address || "N/A"}</p>
                </div>
              </div>

              {/* Attendance Summary */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-600" />
                  Attendance Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Records</p>
                    <h4 className="text-xl font-bold text-slate-800">
                      {attendanceSummary.totalRecords}
                    </h4>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Working Days</p>
                    <h4 className="text-xl font-bold text-blue-700">
                      {attendanceSummary.totalWorkingDays}
                    </h4>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Present</p>
                    <h4 className="text-xl font-bold text-green-700">
                      {attendanceSummary.presentDays}
                    </h4>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Leave</p>
                    <h4 className="text-xl font-bold text-yellow-700">
                      {attendanceSummary.adminLeaveDays}
                    </h4>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Absent</p>
                    <h4 className="text-xl font-bold text-red-700">
                      {attendanceSummary.absentDays}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Month-wise Attendance Summary */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CalendarDays size={20} className="text-indigo-600" />
                  Month-wise Attendance Summary
                </h3>

                {detailLoading ? (
                  <div className="flex items-center justify-center py-8 text-blue-600">
                    <Loader2 size={26} className="animate-spin" />
                  </div>
                ) : monthWiseAttendanceSummary.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    No month-wise attendance summary found.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[760px] text-sm">
                      <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Month</th>
                          <th className="px-4 py-3 text-center font-semibold text-slate-700">Working Days</th>
                          <th className="px-4 py-3 text-center font-semibold text-green-700">Present</th>
                          <th className="px-4 py-3 text-center font-semibold text-yellow-700">Leave</th>
                          <th className="px-4 py-3 text-center font-semibold text-red-700">Absent</th>
                          <th className="px-4 py-3 text-center font-semibold text-slate-700">Records</th>
                          <th className="px-4 py-3 text-center font-semibold text-blue-700">Attendance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {monthWiseAttendanceSummary.map((month) => (
                          <tr key={month.key} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{month.label}</td>
                            <td className="px-4 py-3 text-center text-slate-700">{month.totalWorkingDays}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex min-w-9 justify-center rounded-lg bg-green-50 px-2 py-1 font-bold text-green-700">
                                {month.presentDays}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex min-w-9 justify-center rounded-lg bg-yellow-50 px-2 py-1 font-bold text-yellow-700">
                                {month.leaveDays}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex min-w-9 justify-center rounded-lg bg-red-50 px-2 py-1 font-bold text-red-700">
                                {month.absentDays}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-slate-700">{month.totalRecords}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 font-bold text-blue-700">
                                {month.attendancePercentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Attendance Records Table with Location & Selfie */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CalendarCheck2 size={20} className="text-blue-600" />
                  Attendance Log
                </h3>
                {detailLoading ? (
                  <div className="flex items-center justify-center py-10 text-blue-600">
                    <Loader2 size={28} className="animate-spin" />
                  </div>
                ) : attendanceRecords.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    No attendance records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                        <tr>
                          <th className="px-4 py-2 text-left">Date & Time</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Selfie</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRecords.map((record) => (
                          <tr key={record._id}>
                            {/* DATE & TIME */}
                            <td className="px-4 py-3">
                              {record.date
                                ? new Date(record.date).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "N/A"}
                            </td>

                            {/* STATUS */}
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(
                                  record.status
                                )}`}
                              >
                                {record.status}
                              </span>
                            </td>

                            {/* LOCATION – now using the formatted string */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <MapPin size={15} />
                                <span>{record.location || "N/A"}</span>
                              </div>
                            </td>

                            {/* SELFIE */}
                            <td className="px-4 py-3">
                              {record.selfie ? (
                                <img
                                  src={record.selfie}
                                  alt="Attendance Selfie"
                                  className="h-12 w-12 cursor-pointer rounded-xl object-cover"
                                  onClick={() => setSelectedAttendanceRecord(record)}
                                />
                              ) : (
                                <span className="text-xs text-gray-400">No Selfie</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Proof Modal (without location) */}
      {selectedAttendanceRecord && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedAttendanceRecord(null)}
          />

          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  <ImageIcon size={20} className="text-blue-600" />
                  Attendance Proof
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedAttendanceRecord.date
                    ? new Date(selectedAttendanceRecord.date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAttendanceRecord(null)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                {selectedAttendanceRecord.selfie ? (
                  <img
                    src={selectedAttendanceRecord.selfie}
                    alt="Attendance selfie"
                    className="h-full max-h-[480px] min-h-[300px] w-full object-contain"
                  />
                ) : (
                  <div className="flex min-h-[300px] items-center justify-center text-slate-400">
                    No selfie available
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date & Time</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {selectedAttendanceRecord.date
                      ? new Date(selectedAttendanceRecord.date).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                      selectedAttendanceRecord.status
                    )}`}
                  >
                    {selectedAttendanceRecord.status}
                  </span>
                </div>

                {/* Location removed from here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaffMembers;