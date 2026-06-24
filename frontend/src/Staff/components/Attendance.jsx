
// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   CalendarCheck,
//   Clock,
//   CheckCircle,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";

// const Attendance = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [leaves, setLeaves] = useState([]);
//   const [remarks, setRemarks] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("staffToken");

//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const today = formatLocalDate(new Date());

//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   const getAttendance = async () => {
//     try {
//       const res = await axios.get("/api/staff/me/attendance", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAttendance(res.data.data || []);
//     } catch (error) {
//       console.log("Attendance fetch error:", error);
//       setMessage(error.response?.data?.message || "Failed to load attendance");
//     }
//   };

//   const getLeaves = async () => {
//     try {
//       const res = await axios.get("/api/staff/me/leave", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setLeaves(res.data.data || []);
//     } catch (error) {
//       console.log("Leave fetch error:", error);
//     }
//   };

//   const loadData = async () => {
//     try {
//       setFetching(true);
//       await Promise.all([getAttendance(), getLeaves()]);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const markAttendance = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       const res = await axios.post(
//         "/api/staff/me/attendance",
//         { remarks },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message);
//       setRemarks("");
//       await getAttendance();
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const currentMonthAttendance = useMemo(() => {
//     return attendance.filter((item) => {
//       const date = new Date(item.date);
//       return (
//         date.getMonth() === currentMonth &&
//         date.getFullYear() === currentYear
//       );
//     });
//   }, [attendance, currentMonth, currentYear]);

//   const presentDateSet = useMemo(() => {
//     return new Set(
//       attendance
//         .filter((item) => item.status === "Present")
//         .map((item) => item.date)
//     );
//   }, [attendance]);

//   const leaveDateSet = useMemo(() => {
//     const dates = new Set();

//     leaves.forEach((leave) => {
//       if (leave.status !== "Approved") return;

//       const current = new Date(leave.fromDate);
//       const end = new Date(leave.toDate);

//       while (current <= end) {
//         dates.add(formatLocalDate(current));
//         current.setDate(current.getDate() + 1);
//       }
//     });

//     return dates;
//   }, [leaves]);

//   const todayMarked = presentDateSet.has(today);

//   const presentDays = currentMonthAttendance.filter(
//     (item) => item.status === "Present"
//   ).length;

//   const leaveDays = useMemo(() => {
//     let count = 0;

//     leaveDateSet.forEach((dateString) => {
//       const date = new Date(dateString);

//       if (
//         date.getMonth() === currentMonth &&
//         date.getFullYear() === currentYear
//       ) {
//         count++;
//       }
//     });

//     return count;
//   }, [leaveDateSet, currentMonth, currentYear]);

//   const totalWorkingDays = useMemo(() => {
//     let workingDays = 0;

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentYear, currentMonth, day);

//       if (date.getDay() !== 0) {
//         workingDays++;
//       }
//     }

//     return workingDays;
//   }, [currentMonth, currentYear, daysInMonth]);

//   const isPresentDate = (day) => {
//     const dateString = formatLocalDate(
//       new Date(currentYear, currentMonth, day)
//     );

//     return presentDateSet.has(dateString);
//   };

//   const isLeaveDate = (day) => {
//     const dateString = formatLocalDate(
//       new Date(currentYear, currentMonth, day)
//     );

//     return leaveDateSet.has(dateString);
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-[400px] flex justify-center items-center">
//         <Loader2 className="w-9 h-9 animate-spin text-blue-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//             <CalendarCheck className="w-6 h-6 text-blue-500" />
//             Attendance Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Mark your daily attendance and view monthly attendance summary.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-4 gap-5 mb-8">
//           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//             <p className="text-gray-500 text-sm">Present Days</p>
//             <h2 className="text-3xl font-bold text-emerald-600">
//               {presentDays}
//             </h2>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//             <p className="text-gray-500 text-sm">Leave Days</p>
//             <h2 className="text-3xl font-bold text-yellow-600">
//               {leaveDays}
//             </h2>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//             <p className="text-gray-500 text-sm">Total Working Days</p>
//             <h2 className="text-3xl font-bold text-blue-600">
//               {totalWorkingDays}
//             </h2>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//             <p className="text-gray-500 text-sm">Attendance %</p>
//             <h2 className="text-3xl font-bold text-indigo-600">
//               {totalWorkingDays
//                 ? Math.round((presentDays / totalWorkingDays) * 100)
//                 : 0}
//               %
//             </h2>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
//             <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
//               <Clock className="w-7 h-7 text-blue-600" />
//             </div>

//             <h2 className="text-xl font-bold text-gray-800">
//               Mark Today's Attendance
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Date: {new Date().toLocaleDateString("en-IN")}
//             </p>

//             <textarea
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               placeholder="Add remarks (optional)"
//               disabled={todayMarked}
//               className="w-full mt-4 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none disabled:bg-gray-50 text-gray-700"
//               rows="4"
//             />

//             <button
//               onClick={markAttendance}
//               disabled={loading || todayMarked}
//               className="w-full mt-5 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2 border border-blue-200"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Marking...
//                 </>
//               ) : todayMarked ? (
//                 <>
//                   <CheckCircle className="w-5 h-5" />
//                   Already Marked
//                 </>
//               ) : (
//                 <>
//                   <CalendarCheck className="w-5 h-5" />
//                   Mark Attendance
//                 </>
//               )}
//             </button>

//             {message && (
//               <div className="mt-4 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl text-sm flex gap-2">
//                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
//                 {message}
//               </div>
//             )}
//           </div>

//           <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-5">
//               Monthly Attendance Calendar
//             </h2>

//             <div className="grid grid-cols-7 gap-3">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div
//                   key={day}
//                   className="text-center text-sm font-medium text-gray-400"
//                 >
//                   {day}
//                 </div>
//               ))}

//               {Array.from({
//                 length: new Date(currentYear, currentMonth, 1).getDay(),
//               }).map((_, index) => (
//                 <div key={`empty-${index}`}></div>
//               ))}

//               {Array.from({ length: daysInMonth }).map((_, index) => {
//                 const day = index + 1;
//                 const present = isPresentDate(day);
//                 const leave = isLeaveDate(day);
//                 const isSunday =
//                   new Date(currentYear, currentMonth, day).getDay() === 0;

//                 return (
//                   <div
//                     key={day}
//                     className={`h-14 rounded-xl flex items-center justify-center font-semibold border
//                       ${
//                         present
//                           ? "bg-green-100 text-green-700 border-green-200"
//                           : leave
//                           ? "bg-yellow-100 text-yellow-700 border-yellow-300"
//                           : isSunday
//                           ? "bg-red-50 text-red-500 border-red-200"
//                           : "bg-gray-50 text-gray-600 border-gray-200"
//                       }`}
//                   >
//                     {day}
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex flex-wrap gap-5 mt-6 text-sm">
//               <span className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-green-100 border border-green-200 rounded"></span>
//                 Present
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></span>
//                 Leave
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-red-50 border border-red-200 rounded"></span>
//                 Sunday
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></span>
//                 Not Marked
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-800">
//               Attendance History
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Check In
//                   </th>
//                   <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Remarks
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {attendance.length > 0 ? (
//                   attendance.map((item) => (
//                     <tr key={item._id}>
//                       <td className="p-4 text-gray-700">
//                         {new Date(item.date).toLocaleDateString("en-IN")}
//                       </td>

//                       <td className="p-4">
//                         <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold border border-green-200">
//                           {item.status}
//                         </span>
//                       </td>

//                       <td className="p-4 text-gray-700">
//                         {item.checkIn
//                           ? new Date(item.checkIn).toLocaleTimeString("en-IN", {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               second: "2-digit",
//                               hour12: true,
//                             })
//                           : "-"}
//                       </td>

//                       <td className="p-4 text-gray-700">
//                         {item.remarks || "-"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center py-8 text-gray-500">
//                       No attendance records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Attendance;


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  // Calendar month/year state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem("staffToken");

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = formatLocalDate(new Date());

  const getAttendance = async () => {
    try {
      const res = await axios.get("/api/staff/me/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data.data || []);
    } catch (error) {
      console.log("Attendance fetch error:", error);
      setMessage(error.response?.data?.message || "Failed to load attendance");
    }
  };

  const getLeaves = async () => {
    try {
      const res = await axios.get("/api/staff/me/leave", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data.data || []);
    } catch (error) {
      console.log("Leave fetch error:", error);
    }
  };

  const loadData = async () => {
    try {
      setFetching(true);
      await Promise.all([getAttendance(), getLeaves()]);
    } finally {
      setFetching(false);
    }
  };

  const markAttendance = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(
        "/api/staff/me/attendance",
        { remarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setRemarks("");
      await getAttendance();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ── Data for current month ──
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const presentDateSet = useMemo(() => {
    return new Set(
      attendance
        .filter((item) => item.status === "Present")
        .map((item) => item.date)
    );
  }, [attendance]);

  const leaveDateSet = useMemo(() => {
    const dates = new Set();
    leaves.forEach((leave) => {
      if (leave.status !== "Approved") return;
      const current = new Date(leave.fromDate);
      const end = new Date(leave.toDate);
      while (current <= end) {
        dates.add(formatLocalDate(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [leaves]);

  const isPresentDate = (day) => {
    const dateString = formatLocalDate(new Date(currentYear, currentMonth, day));
    return presentDateSet.has(dateString);
  };

  const isLeaveDate = (day) => {
    const dateString = formatLocalDate(new Date(currentYear, currentMonth, day));
    return leaveDateSet.has(dateString);
  };

  const isSunday = (day) => {
    return new Date(currentYear, currentMonth, day).getDay() === 0;
  };

  // Stats for current month
  const currentMonthAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
  }, [attendance, currentMonth, currentYear]);

  const presentDays = currentMonthAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  const leaveDays = useMemo(() => {
    let count = 0;
    leaveDateSet.forEach((dateString) => {
      const date = new Date(dateString);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        count++;
      }
    });
    return count;
  }, [leaveDateSet, currentMonth, currentYear]);

  const totalWorkingDays = useMemo(() => {
    let workingDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      if (!isSunday(day)) workingDays++;
    }
    return workingDays;
  }, [currentMonth, currentYear, daysInMonth]);

  const absentDays = totalWorkingDays - presentDays - leaveDays;

  // ── Month navigation ──
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // ── Render ──
  if (fetching) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <Loader2 className="w-9 h-9 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <CalendarCheck className="w-6 h-6 text-blue-500" />
            Attendance Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Mark your daily attendance and view monthly summary.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Present Days</p>
            <h2 className="text-3xl font-bold text-emerald-600">{presentDays}</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Leave Days</p>
            <h2 className="text-3xl font-bold text-yellow-600">{leaveDays}</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Absent Days</p>
            <h2 className="text-3xl font-bold text-red-500">{absentDays}</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Attendance %</p>
            <h2 className="text-3xl font-bold text-indigo-600">
              {totalWorkingDays ? Math.round((presentDays / totalWorkingDays) * 100) : 0}%
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mark Attendance Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Mark Today's Attendance</h2>
            <p className="text-sm text-gray-500 mt-1">
              Date: {new Date().toLocaleDateString("en-IN")}
            </p>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks (optional)"
              disabled={presentDateSet.has(today)}
              className="w-full mt-4 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none disabled:bg-gray-50 text-gray-700"
              rows="4"
            />
            <button
              onClick={markAttendance}
              disabled={loading || presentDateSet.has(today)}
              className="w-full mt-5 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2 border border-blue-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Marking...
                </>
              ) : presentDateSet.has(today) ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Already Marked
                </>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5" />
                  Mark Attendance
                </>
              )}
            </button>
            {message && (
              <div className="mt-4 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl text-sm flex gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {message}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Monthly Attendance Calendar</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevMonth}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-lg font-semibold text-gray-700">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}

              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`}></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const present = isPresentDate(day);
                const leave = isLeaveDate(day);
                const sunday = isSunday(day);
                const absent = !present && !leave && !sunday;

                let bg = "bg-gray-50";
                let border = "border-gray-200";
                let text = "text-gray-600";
                let letter = "";

                if (present) {
                  bg = "bg-green-100";
                  border = "border-green-200";
                  text = "text-green-700";
                  letter = "P";
                } else if (leave) {
                  bg = "bg-yellow-100";
                  border = "border-yellow-300";
                  text = "text-yellow-700";
                  letter = "L";
                } else if (sunday) {
                  bg = "bg-red-50";
                  border = "border-red-200";
                  text = "text-red-500";
                  letter = "S";
                } else if (absent) {
                  bg = "bg-gray-50";
                  border = "border-gray-200";
                  text = "text-gray-600";
                  letter = "A";
                }

                return (
                  <div
                    key={day}
                    className={`h-14 rounded-xl flex flex-col items-center justify-center font-semibold border ${bg} ${border}`}
                  >
                    <span className="text-sm">{day}</span>
                    <span className={`text-xs font-bold ${text}`}>{letter}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-5 mt-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 border border-green-200 rounded"></span>
                Present (P)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></span>
                Leave (L)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></span>
                Absent (A)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-50 border border-red-200 rounded"></span>
                Sunday (S)
              </span>
            </div>
          </div>
        </div>

        {/* Attendance History Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Attendance History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id}>
                      <td className="p-4 text-gray-700">{new Date(item.date).toLocaleDateString("en-IN")}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold border border-green-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        {item.checkIn
                          ? new Date(item.checkIn).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })
                          : "-"}
                      </td>
                      <td className="p-4 text-gray-700">{item.remarks || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">No attendance records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;