
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
} from "lucide-react";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const getStaffDetails = async () => {
    try {
      const token = localStorage.getItem("staffToken");
      const res = await axios.get("/api/staff/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaff(res.data.data);
    } catch (error) {
      console.log("Error fetching staff details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffDetails();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not added";
    return new Date(date).toLocaleDateString("en-IN");
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Staff details not found
      </div>
    );
  }

  const details = [
    { label: "Name", value: staff.name, icon: User },
    { label: "Staff ID", value: staff.staffId, icon: BadgeCheck },
    { label: "Email", value: staff.email, icon: Mail },
    { label: "github", value: staff.github, icon: Mail },

    { label: "Phone", value: staff.number, icon: Phone },
    { label: "Category", value: staff.category, icon: Briefcase },
    { label: "Gender", value: staff.gender, icon: User },
    { label: "Date of Birth", value: formatDate(staff.dateOfBirth), icon: Calendar },
    { label: "Marital Status", value: staff.maritalStatus, icon: User },
    { label: "Address", value: staff.address, icon: MapPin },
    { label: "City", value: staff.city, icon: MapPin },
    { label: "State", value: staff.state, icon: MapPin },
    { label: "Pincode", value: staff.pincode, icon: MapPin },
    { label: "Joining Date", value: formatDate(staff.joiningDate), icon: Calendar },
    { label: "Experience", value: staff.experience || "Not added", icon: Briefcase },
    { label: "Role", value: staff.role, icon: BadgeCheck },
  
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* User summary */}
            <div className="flex items-center gap-5 mb-8">
           

                  <div
  onClick={() => user.profileImage && setShowImageModal(true)}
  className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden border border-indigo-200 cursor-pointer hover:ring-4 hover:ring-indigo-100 transition"
>
  {staff.profileImage ? (
    <img
      src={staff.profileImage}
      alt={staff.name || "Staff"}
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    <User className="w-8 h-8" />
  )}
</div>

                  <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {staff.name}
                </h2>
                <p className="text-gray-500">
                  {staff.category || "Staff"} • {staff.staffId}
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-200">
                  {staff.status}
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-1">
              {details.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-xl p-1 w-50 hover:shadow-sm "
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium break-words">
                      {item.value || "Not added"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            {/* <div className="mt-8 text-xs text-gray-400 border-t border-gray-100 pt-4">
              Last updated: {formatDate(staff.updatedAt)}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;  

