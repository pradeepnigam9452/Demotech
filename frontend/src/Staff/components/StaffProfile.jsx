


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   User,
//   Mail,
//   Phone,
//   BadgeCheck,
//   MapPin,
//   Calendar,
//   Briefcase,
//   Loader2,
//   Github,
//   Hash,
//   Building2,
//   Heart,
//   Home,
//   X,
//   ShieldCheck,
// } from "lucide-react";

// const StaffProfile = () => {
//   const [staff, setStaff] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showImageModal, setShowImageModal] = useState(false);

//   // ==============================
//   // Get Staff Profile
//   // ==============================

//   const getStaffDetails = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("staffToken");

//       if (!token) {
//         setError("Staff token not found. Please login again.");
//         return;
//       }

//       const res = await axios.get("/api/staff/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStaff(res.data.data);
//     } catch (error) {
//       console.error("Error fetching staff details:", error);

//       setError(
//         error.response?.data?.message ||
//           "Unable to fetch staff profile details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStaffDetails();
//   }, []);

//   // ==============================
//   // Format Date
//   // ==============================

//   const formatDate = (date) => {
//     if (!date) return "Not added";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // ==============================
//   // Loading
//   // ==============================

//   if (loading) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-9 w-9 animate-spin text-blue-600" />

//           <p className="text-sm font-medium text-gray-500">
//             Loading staff profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ==============================
//   // Error
//   // ==============================

//   if (error) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center bg-gray-50 p-4">
//         <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
//           <p className="font-semibold text-red-500">{error}</p>

//           <button
//             onClick={getStaffDetails}
//             className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ==============================
//   // Staff Not Found
//   // ==============================

//   if (!staff) {
//     return (
//       <div className="mt-10 text-center font-semibold text-red-500">
//         Staff details not found.
//       </div>
//     );
//   }

//   // ==============================
//   // Personal Details
//   // ==============================

//   const personalDetails = [
//     {
//       label: "Full Name",
//       value: staff.name,
//       icon: User,
//     },
//     {
//       label: "Staff ID",
//       value: staff.staffId,
//       icon: Hash,
//     },
//     {
//       label: "Email Address",
//       value: staff.email,
//       icon: Mail,
//     },
//     {
//       label: "Phone Number",
//       value: staff.number,
//       icon: Phone,
//     },
//     {
//       label: "Gender",
//       value: staff.gender,
//       icon: User,
//     },
//     {
//       label: "Date of Birth",
//       value: formatDate(staff.dateOfBirth),
//       icon: Calendar,
//     },
//     {
//       label: "Marital Status",
//       value: staff.maritalStatus,
//       icon: Heart,
//     },
//   ];

//   // ==============================
//   // Professional Details
//   // ==============================

//   const professionalDetails = [
//     {
//       label: "Category",
//       value: staff.category,
//       icon: Building2,
//     },
//     {
//       label: "Designation",
//       value: staff.designation,
//       icon: Briefcase,
//     },
//     {
//       label: "Joining Date",
//       value: formatDate(staff.joiningDate),
//       icon: Calendar,
//     },
   
//     {
//       label: "Role",
//       value: staff.role,
//       icon: ShieldCheck,
//     },
//     {
//       label: "GitHub Profile",
//       value: staff.github,
//       icon: Github,
//       type: "link",
//     },
//   ];

//   // ==============================
//   // Address Details
//   // ==============================

//   const addressDetails = [
//     {
//       label: "Address",
//       value: staff.address,
//       icon: Home,
//     },
//     {
//       label: "City",
//       value: staff.city,
//       icon: MapPin,
//     },
//     {
//       label: "State",
//       value: staff.state,
//       icon: MapPin,
//     },
//     {
//       label: "Pincode",
//       value: staff.pincode,
//       icon: MapPin,
//     },
//   ];

//   // ==============================
//   // Details Section Component
//   // ==============================

//   const DetailsSection = ({ title, description, items }) => {
//     return (
//       <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-gray-900">{title}</h3>

//           <p className="mt-1 text-sm text-gray-500">{description}</p>
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {items.map((item, index) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={index}
//                 className="group rounded-xl border border-gray-100 bg-gray-50 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-white hover:shadow-md"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition group-hover:bg-blue-600">
//                     <Icon className="h-5 w-5 text-blue-600 transition group-hover:text-white" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//                       {item.label}
//                     </p>

//                     {item.type === "link" && item.value ? (
//                       <a
//                         href={item.value}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="mt-1 block break-all font-medium text-blue-600 hover:underline"
//                       >
//                         {item.value}
//                       </a>
//                     ) : (
//                       <p className="mt-1 break-words font-medium text-gray-800">
//                         {item.value || "Not added"}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 p-3 sm:p-5 md:p-8">
//         <div className="mx-auto max-w-7xl">
//           {/* ===========================
//               Profile Header
//           ============================ */}

// <div className="mb-6 overflow-hidden rounded-3xl">
//   {/* Profile Content */}
//   <div className="relative px-2 pb-3 md:px-4 md:pb-4">
//     <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      
//       {/* Profile Image */}
//       <div
//         onClick={() =>
//           staff.profileImage && setShowImageModal(true)
//         }
//         className={`flex h-[160px] w-[150px] shrink-0 items-center justify-center overflow-hidden border border-gray-200 ${
//           staff.profileImage
//             ? "cursor-pointer hover:ring-2 hover:ring-blue-100"
//             : ""
//         } transition`}
//       >
//         {staff.profileImage ? (
//           <img
//             src={staff.profileImage}
//             alt={staff.name || "Staff"}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <User className="h-6 w-6 text-gray-400" />
//         )}
//       </div>

//       {/* Staff Info */}
//       <div className="flex-1">
//         <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
//           {staff.name}
//         </h1>

//         <p className="mt-1 text-sm text-gray-500">
//           {staff.category || "Staff Member"} • {staff.staffId}
//         </p>
//       </div>

//       {/* Status */}
//       <span
//         className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${
//           staff.status === "Active"
//             ? "border-green-200 bg-green-50 text-green-700"
//             : "border-red-200 bg-red-50 text-red-600"
//         }`}
//       >
//         <span
//           className={`h-2 w-2 rounded-full ${
//             staff.status === "Active"
//               ? "bg-green-500"
//               : "bg-red-500"
//           }`}
//         />

//         {staff.status || "Unknown"}
//       </span>
//     </div>
//   </div>
// </div>
//           {/* ===========================
//               Details
//           ============================ */}

//           <div className="space-y-6">
//             <DetailsSection
//               title="Personal Information"
//               description="Basic and contact information of the staff member."
//               items={personalDetails}
//             />

//             <DetailsSection
//               title="Professional Information"
//               description="Employment and professional profile details."
//               items={professionalDetails}
//             />

//             <DetailsSection
//               title="Address Information"
//               description="Current residential and location details."
//               items={addressDetails}
//             />

           
//           </div>
//         </div>
//       </div>

//       {/* ===========================
//           Image Modal
//       ============================ */}

//       {showImageModal && staff.profileImage && (
//         <div
//           onClick={() => setShowImageModal(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="relative max-h-[90vh] max-w-3xl"
//           >
//             <button
//               onClick={() => setShowImageModal(false)}
//               className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-100"
//             >
//               <X className="h-5 w-5 text-gray-800" />
//             </button>

//             <img
//               src={staff.profileImage}
//               alt={staff.name}
//               className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StaffProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  BadgeCheck,
  MapPin,
  Calendar,
  Briefcase,
  Loader2,
  Github,
  Hash,
  Building2,
  Heart,
  Home,
  X,
  ShieldCheck,
} from "lucide-react";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  // ==============================
  // Get Staff Profile
  // ==============================

  const getStaffDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("staffToken");

      if (!token) {
        setError("Staff token not found. Please login again.");
        return;
      }

      const res = await axios.get("/api/staff/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStaff(res.data.data);
    } catch (error) {
      console.error("Error fetching staff details:", error);

      setError(
        error.response?.data?.message ||
          "Unable to fetch staff profile details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffDetails();
  }, []);

  // ==============================
  // Format Date
  // ==============================

  const formatDate = (date) => {
    if (!date) return "Not added";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-gray-500">
            Loading staff profile...
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // Error
  // ==============================

  if (error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <p className="font-semibold text-red-500">{error}</p>
          <button
            onClick={getStaffDetails}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // Staff Not Found
  // ==============================

  if (!staff) {
    return (
      <div className="mt-10 text-center font-semibold text-red-500">
        Staff details not found.
      </div>
    );
  }

  // ==============================
  // Personal Details
  // ==============================

  const personalDetails = [
    {
      label: "Full Name",
      value: staff.name,
      icon: User,
    },
    {
      label: "Staff ID",
      value: staff.staffId,
      icon: Hash,
    },
    {
      label: "Email Address",
      value: staff.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: staff.number,
      icon: Phone,
    },
    {
      label: "Gender",
      value: staff.gender,
      icon: User,
    },
    {
      label: "Date of Birth",
      value: formatDate(staff.dateOfBirth),
      icon: Calendar,
    },
    {
      label: "Marital Status",
      value: staff.maritalStatus,
      icon: Heart,
    },
  ];

  // ==============================
  // Professional Details
  // ==============================

  const professionalDetails = [
    {
      label: "Category",
      value: staff.category,
      icon: Building2,
    },
    {
      label: "Designation",
      value: staff.designation,
      icon: Briefcase,
    },
    {
      label: "Joining Date",
      value: formatDate(staff.joiningDate),
      icon: Calendar,
    },
    {
      label: "Role",
      value: staff.role,
      icon: ShieldCheck,
    },
    {
      label: "GitHub Profile",
      value: staff.github,
      icon: Github,
      type: "link",
    },
  ];

  // ==============================
  // Address Details
  // ==============================

  const addressDetails = [
    {
      label: "Address",
      value: staff.address,
      icon: Home,
    },
    {
      label: "City",
      value: staff.city,
      icon: MapPin,
    },
    {
      label: "State",
      value: staff.state,
      icon: MapPin,
    },
    {
      label: "Pincode",
      value: staff.pincode,
      icon: MapPin,
    },
  ];

  // ==============================
  // Details Section Component (Redesigned)
  // ==============================

  const DetailsSection = ({ title, description, items }) => {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-gray-50/80 hover:bg-white border border-gray-200/60 hover:border-indigo-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {item.label}
                    </p>

                    {item.type === "link" && item.value ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all font-medium text-blue-600 hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words font-medium text-gray-800">
                        {item.value || "Not added"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* ===========================
              Profile Header – Redesigned
          ============================ */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image */}
              <div
                onClick={() =>
                  staff.profileImage && setShowImageModal(true)
                }
                className={`relative shrink-0 w-32 h-32 rounded-2xl overflow-hidden border-2 border-indigo-200 ${
                  staff.profileImage
                    ? "cursor-pointer hover:ring-4 hover:ring-blue-100 transition"
                    : "bg-indigo-50 flex items-center justify-center"
                }`}
              >
                {staff.profileImage ? (
                  <img
                    src={staff.profileImage}
                    alt={staff.name || "Staff"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-indigo-300" />
                )}
              </div>

              {/* Staff Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                  {staff.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span>{staff.category || "Staff Member"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{staff.staffId}</span>
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${
                  staff.status === "Active"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    staff.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {staff.status || "Unknown"}
              </span>
            </div>
          </div>

          {/* ===========================
              Details Sections
          ============================ */}
          <DetailsSection
            title="Personal Information"
            description="Basic and contact information of the staff member."
            items={personalDetails}
          />

          <DetailsSection
            title="Professional Information"
            description="Employment and professional profile details."
            items={professionalDetails}
          />

          <DetailsSection
            title="Address Information"
            description="Current residential and location details."
            items={addressDetails}
          />

          {/* Footer (optional) */}
          <div className="text-center text-xs text-gray-400 pt-4">
            © {new Date().getFullYear()} — Staff Profile
          </div>
        </div>
      </div>

      {/* ===========================
          Image Modal – Light Theme
      ============================ */}
      {showImageModal && staff.profileImage && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-3xl"
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
            >
              <X className="h-5 w-5 text-gray-800" />
            </button>

            <img
              src={staff.profileImage}
              alt={staff.name}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StaffProfile;