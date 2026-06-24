

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Users, Mail, Phone, Loader2, Plus, X, ChevronDown, Edit, Trash2 } from "lucide-react";
// import Swal from 'sweetalert2';

// // Custom dropdown component
// const CustomSelect = ({ options, value, onChange, name, required, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef(null);

//   const selectedOption = options.find(opt => opt.value === value);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredOptions = options.filter(opt =>
//     opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
//           {selectedOption ? selectedOption.label : placeholder || "Select Category"}
//         </span>
//         <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
//       </div>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none sticky top-0 bg-white"
//             onClick={(e) => e.stopPropagation()}
//           />
//           {filteredOptions.length === 0 ? (
//             <div className="px-4 py-2 text-gray-500">No options found</div>
//           ) : (
//             filteredOptions.map((opt) => (
//               <div
//                 key={opt.value}
//                 className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
//                   value === opt.value ? "bg-blue-100 text-blue-700" : ""
//                 }`}
//                 onClick={() => {
//                   onChange({ target: { name, value: opt.value } });
//                   setIsOpen(false);
//                   setSearchTerm("");
//                 }}
//               >
//                 {opt.label}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const AdminStaff = () => {
//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     staffId: "",
//     email: "",
//     number: "",
//     role: "staff",
//     password: "",
//     dateOfBirth: "",
//     gender: "",
//     maritalStatus: "",
//     city: "",
//     state: "",
//     pincode: "",
//     emergencyContact: "",
//     address: "",
//     category: "",
//     designation: "",
//     joiningDate: "",
//     salary: "",
//     experience: "",
//     aadharNumber: "",
//     remarks: "",
//   });

//   const categoryOptions = [
//     { value: "HR", label: "HR" },
    
//     { value: "Frontend Developer", label: "Frontend Developer" },
//     { value: "Backend Developer", label: "Backend Developer" },
//     { value: "MERN Developer", label: "MERN Developer" },
//     { value: "Full Stack Developer", label: "Full Stack Developer" },
//     { value: "UI/UX Designer", label: "UI/UX Designer" },
//     { value: "DevOps Engineer", label: "DevOps Engineer" },
//     { value: "Project Manager", label: "Project Manager" },
//     { value: "Business Analyst", label: "Business Analyst" },
//     { value: "Digital Marketer", label: "Digital Marketer" },
//     { value: "Content Writer", label: "Content Writer" },
//     { value: "Sales Executive", label: "Sales Executive" },
//     { value: "Support Engineer", label: "Support Engineer" },
//     { value: "Intern", label: "Intern" },
//     { value: "Other", label: "Other" },
//   ];

//   const getStaff = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/allstaff");
//       setStaffList(res.data.staff || res.data.data || res.data || []);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStaff();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       staffId: "",
//       email: "",
//       number: "",
//       role: "staff",
//       password: "",
//       dateOfBirth: "",
//       gender: "",
//       maritalStatus: "",
//       city: "",
//       state: "",
//       pincode: "",
//       github: "",
//       address: "",
//       category: "",
//       designation: "",
//       joiningDate: "",
//       salary: "",
//       experience: "",
//       aadharNumber: "",
//       remarks: "",
//     });
//     setIsEditMode(false);
//     setEditingId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setFormLoading(true);
//       if (isEditMode && editingId) {
//         await axios.put(`/api/updatestaff/${editingId}`, formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Staff updated successfully!',
//           timer: 2000,
//           showConfirmButton: false
//         });
//       } else {
//         await axios.post("/api/createstaff", formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'Staff created successfully!',
//           timer: 2000,
//           showConfirmButton: false
//         });
//       }
//       setIsModalOpen(false);
//       resetForm();
//       getStaff();
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.response?.data?.message || (isEditMode ? "Failed to update staff" : "Failed to create staff"),
//       });
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleEdit = (staff) => {
//     setIsEditMode(true);
//     setEditingId(staff._id);
//     setFormData({
//       name: staff.name || "",
//       staffId: staff.staffId || "",
//       email: staff.email || "",
//       number: staff.number || "",
//       role: staff.role || "staff",
//       password: "",
//       dateOfBirth: staff.dateOfBirth || "",
//       gender: staff.gender || "",
//       maritalStatus: staff.maritalStatus || "",
//       city: staff.city || "",
//       state: staff.state || "",
//       pincode: staff.pincode || "",
//       emergencyContact: staff.emergencyContact || "",
//       address: staff.address || "",
//       category: staff.category || "",
//       designation: staff.designation || "",
//       joiningDate: staff.joiningDate ? staff.joiningDate.split('T')[0] : "",
//       salary: staff.salary || "",
//       experience: staff.experience || "",
//       aadharNumber: staff.aadharNumber || "",
//       remarks: staff.remarks || "",
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     });
//     if (!result.isConfirmed) return;

//     try {
//       setDeleteLoading(true);
//       await axios.delete(`/api/deletestaff/${id}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Deleted!',
//         text: 'Staff member has been deleted.',
//         timer: 2000,
//         showConfirmButton: false
//       });
//       getStaff();
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || "Failed to delete staff",
//       });
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleViewDetails = (staff) => {
//     setSelectedStaff(staff);
//     setIsDetailsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
//       <div className="bg-white rounded-2xl shadow-md p-5">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
//               <Users size={26} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
//               <p className="text-gray-500 text-sm">View all registered staff members</p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               resetForm();
//               setIsModalOpen(true);
//             }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <Plus size={20} /> Add New Staff
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="animate-spin text-blue-600" size={36} />
//           </div>
//         ) : staffList.length === 0 ? (
//           <div className="text-center py-16 text-gray-500">No staff found</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-gray-700">
//                   <th className="p-3">Sr No.</th>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Staff ID</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Phone</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffList.map((staff, index) => (
//                   <tr
//                     key={staff._id}
//                     className="border-b hover:bg-gray-50 transition cursor-pointer"
//                     onClick={() => handleViewDetails(staff)}
//                   >
//                     <td className="p-3">{index + 1}</td>
//                     <td className="p-3 font-semibold text-gray-800">{staff.name || "N/A"}</td>
//                     <td className="p-3 text-gray-600">{staff.staffId || "N/A"}</td>
//                     <td className="p-3">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Mail size={16} /> {staff.email || "N/A"}
//                       </div>
//                     </td>
//                     <td className="p-3">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Phone size={16} /> {staff.number || staff.mobile || "N/A"}
//                       </div>
//                     </td>
//                     <td className="p-3">
//                       <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
//                         {staff.role || "staff"}
//                       </span>
//                     </td>
//                     <td className="p-3" onClick={(e) => e.stopPropagation()}>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(staff)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                           title="Edit"
//                         >
//                           <Edit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(staff._id)}
//                           disabled={deleteLoading}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
//                           title="Delete"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Modal - your original modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-transparent" onClick={() => setIsModalOpen(false)}></div>
//           <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto z-10">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-20">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Users size={24} className="text-blue-600" />
//                 {isEditMode ? "Edit Staff" : "Add New Staff"}
//               </h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-6">
//                 {/* Personal Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Personal Information</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
//                       <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter full name" />
//                     </div>
//                     {/* <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Staff ID</label>
//                       <input type="text" name="staffId" value={formData.staffId} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter staff ID" />
//                     </div> */}
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
//                       <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
//                       <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
//                       <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                         <option value="">Select Status</option>
//                         <option value="Single">Single</option>
//                         <option value="Married">Married</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
//                       <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter city" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
//                       <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter state" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
//                       <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter pincode" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Contact Information</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
//                       <div className="relative">
//                         <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
//                         <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="staff@example.com" />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
//                       <div className="relative">
//                         <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
//                         <input type="tel" name="number" value={formData.number} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 9876543210" />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">github</label>
//                       <input type="tel" name="github" value={formData.github} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="add github id " />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
//                       <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter address" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Professional Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Professional Information</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
//                       <CustomSelect
//                         options={categoryOptions}
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         name="category"
//                         required
//                         placeholder="Select Category"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
//                       <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Software Developer" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
//                       <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
//                       <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter salary amount" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (Years)</label>
//                       <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Years of experience" step="0.5" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Government IDs */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Government IDs</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number</label>
//                       <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Aadhar number" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password - only in create mode */}
//                 {!isEditMode && (
//                   <div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
//                         <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter password" />
//                         <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Additional Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Additional Information</h3>
//                   <textarea name="remarks" value={formData.remarks} onChange={handleInputChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter remarks or notes about staff" />
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-8 pt-4 border-t">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
//                 <button type="submit" disabled={formLoading} className="flex-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium py-2.5">
//                   {formLoading ? <><Loader2 size={18} className="animate-spin" /> {isEditMode ? "Updating..." : "Creating..."}</> : <><Plus size={18} /> {isEditMode ? "Update Staff" : "Create Staff"}</>}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Details Popup Modal */}
//       {isDetailsModalOpen && selectedStaff && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-gray-100 bg-transparent" onClick={() => setIsDetailsModalOpen(false)}></div>
//           <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-20">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Users size={24} className="text-blue-600" />
//                 Staff Details
//               </h2>
//               <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Full Name</p>
//                   <p className="font-semibold">{selectedStaff.name || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Staff ID</p>
//                   <p className="font-semibold">{selectedStaff.staffId || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-semibold">{selectedStaff.email || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-semibold">{selectedStaff.number || selectedStaff.mobile || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Role</p>
//                   <p className="font-semibold">{selectedStaff.role || "staff"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Category</p>
//                   <p className="font-semibold">{selectedStaff.category || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Designation</p>
//                   <p className="font-semibold">{selectedStaff.designation || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Joining Date</p>
//                   <p className="font-semibold">{selectedStaff.joiningDate ? new Date(selectedStaff.joiningDate).toLocaleDateString() : "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Salary</p>
//                   <p className="font-semibold">{selectedStaff.salary ? `₹${selectedStaff.salary}` : "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Experience</p>
//                   <p className="font-semibold">{selectedStaff.experience ? `${selectedStaff.experience} years` : "N/A"}</p>
//                 </div>
//                 <div className="col-span-2">
//                   <p className="text-sm text-gray-500">Address</p>
//                   <p className="font-semibold">{selectedStaff.address || "N/A"}</p>
//                 </div>
//               </div>

//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects Allotted</h3>
//                 {selectedStaff.projects && selectedStaff.projects.length > 0 ? (
//                   <ul className="list-disc list-inside space-y-1">
//                     {selectedStaff.projects.map((project, idx) => (
//                       <li key={idx} className="text-gray-700">{project.name || project}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500 italic">No projects allotted yet.</p>
//                 )}
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t flex justify-end">
//               <button onClick={() => setIsDetailsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminStaff;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Users, Mail, Phone, Loader2, Plus, X, ChevronDown, Edit, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';

// Custom dropdown component (unchanged)
const CustomSelect = ({ options, value, onChange, name, required, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder || "Select Category"}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none sticky top-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  value === opt.value ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => {
                  onChange({ target: { name, value: opt.value } });
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const AdminStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // ✅ Added 'github' to initial state (was missing)
  const [formData, setFormData] = useState({
    name: "",
    staffId: "",
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
    github: "", // Added
  });

  const categoryOptions = [
    { value: "HR", label: "HR" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "MERN Developer", label: "MERN Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Digital Marketer", label: "Digital Marketer" },
    { value: "Content Writer", label: "Content Writer" },
    { value: "Sales Executive", label: "Sales Executive" },
    { value: "Support Engineer", label: "Support Engineer" },
    { value: "Intern", label: "Intern" },
    { value: "Other", label: "Other" },
  ];

  const getStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/allstaff");
      // ✅ More robust response handling
      const data = res.data?.staff || res.data?.data || res.data || [];
      setStaffList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching staff:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load staff list',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      staffId: "",
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
      github: "", // ✅ included
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      let payload = { ...formData };

      // ✅ If editing and password is empty, remove it from payload to avoid overwriting
      if (isEditMode && !payload.password) {
        delete payload.password;
      }

      if (isEditMode && editingId) {
        await axios.put(`/api/updatestaff/${editingId}`, payload);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Staff updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await axios.post("/api/createstaff", payload);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Staff created successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setIsModalOpen(false);
      resetForm();
      getStaff();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || (isEditMode ? "Failed to update staff" : "Failed to create staff"),
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setIsEditMode(true);
    setEditingId(staff._id);
    setFormData({
      name: staff.name || "",
      staffId: staff.staffId || "",
      email: staff.email || "",
      number: staff.number || "",
      role: staff.role || "staff",
      password: "", // Password left empty on edit (will be excluded if not changed)
      dateOfBirth: staff.dateOfBirth || "",
      gender: staff.gender || "",
      maritalStatus: staff.maritalStatus || "",
      city: staff.city || "",
      state: staff.state || "",
      pincode: staff.pincode || "",
      emergencyContact: staff.emergencyContact || "",
      address: staff.address || "",
      category: staff.category || "",
      designation: staff.designation || "",
      joiningDate: staff.joiningDate ? staff.joiningDate.split('T')[0] : "",
      salary: staff.salary || "",
      experience: staff.experience || "",
      aadharNumber: staff.aadharNumber || "",
      remarks: staff.remarks || "",
      github: staff.github || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/deletestaff/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Staff member has been deleted.',
        timer: 2000,
        showConfirmButton: false
      });
      getStaff();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || "Failed to delete staff",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <Users size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
              <p className="text-gray-500 text-sm">View all registered staff members</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} /> Add New Staff
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : staffList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No staff found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-3">Sr No.</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Staff ID</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr
                    key={staff._id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleViewDetails(staff)}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold text-gray-800">{staff.name || "N/A"}</td>
                    <td className="p-3 text-gray-600">{staff.staffId || "N/A"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} /> {staff.email || "N/A"}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} /> {staff.number || staff.mobile || "N/A"}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        {staff.role || "staff"}
                      </span>
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          disabled={deleteLoading}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal (your original modal with fixes) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto z-10">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-20">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users size={24} className="text-blue-600" />
                {isEditMode ? "Edit Staff" : "Add New Staff"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
                      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter city" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter state" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter pincode" />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="staff@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input type="tel" name="number" value={formData.number} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                      <input type="text" name="github" value={formData.github} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="add github id" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter address" />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Professional Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                      <CustomSelect
                        options={categoryOptions}
                        value={formData.category}
                        onChange={handleInputChange}
                        name="category"
                        required
                        placeholder="Select Category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                      <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Software Developer" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
                      <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                      <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter salary amount" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (Years)</label>
                      <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Years of experience" step="0.5" />
                    </div>
                  </div>
                </div>

                {/* Government IDs */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Government IDs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number</label>
                      <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Aadhar number" />
                    </div>
                  </div>
                </div>

                {/* Password - only in create mode (or optionally allow change) */}
                {!isEditMode && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter password" />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Optionally, you can show a password field in edit mode to allow changing password */}
                {isEditMode && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password (leave blank to keep current)</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter new password" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Additional Information</h3>
                  <textarea name="remarks" value={formData.remarks} onChange={handleInputChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter remarks or notes about staff" />
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium py-2.5">
                  {formLoading ? <><Loader2 size={18} className="animate-spin" /> {isEditMode ? "Updating..." : "Creating..."}</> : <><Plus size={18} /> {isEditMode ? "Update Staff" : "Create Staff"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Popup Modal (unchanged) */}
      {isDetailsModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsDetailsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-20">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users size={24} className="text-blue-600" />
                Staff Details
              </h2>
              <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{selectedStaff.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Staff ID</p>
                  <p className="font-semibold">{selectedStaff.staffId || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Github</p>
                  <p className="font-semibold">{selectedStaff.github || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{selectedStaff.number || selectedStaff.mobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">{selectedStaff.role || "staff"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{selectedStaff.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-semibold">{selectedStaff.designation || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <p className="font-semibold">{selectedStaff.joiningDate ? new Date(selectedStaff.joiningDate).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-semibold">{selectedStaff.salary ? `₹${selectedStaff.salary}` : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold">{selectedStaff.experience ? `${selectedStaff.experience} years` : "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{selectedStaff.address || "N/A"}</p>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects Allotted</h3>
                {selectedStaff.projects && selectedStaff.projects.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedStaff.projects.map((project, idx) => (
                      <li key={idx} className="text-gray-700">{project.name || project}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No projects allotted yet.</p>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button onClick={() => setIsDetailsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;