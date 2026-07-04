
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";

import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  MapPin,
} from "lucide-react";

const Attendance = () => {
  // =========================================================
  // STATES
  // =========================================================

  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);

  // Camera refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Calendar
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem("staffToken");

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = formatLocalDate(new Date());

  // =========================================================
  // GET ATTENDANCE
  // =========================================================

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

  // =========================================================
  // GET LEAVES
  // =========================================================

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

  // =========================================================
  // LOAD DATA
  // =========================================================

  const loadData = async () => {
    try {
      setFetching(true);
      await Promise.all([getAttendance(), getLeaves()]);
    } finally {
      setFetching(false);
    }
  };

  // =========================================================
  // OPEN CAMERA
  // =========================================================

  const openCamera = async () => {
    try {
      setMessage("");
      setCameraLoading(true);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMessage("Camera is not supported by this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setShowCamera(true);
    } catch (error) {
      console.error("Camera error:", error);
      if (error.name === "NotAllowedError") {
        setMessage("Camera permission denied. Please allow camera permission.");
      } else if (error.name === "NotFoundError") {
        setMessage("No camera found on this device.");
      } else {
        setMessage("Unable to open camera.");
      }
    } finally {
      setCameraLoading(false);
    }
  };

  // =========================================================
  // ATTACH CAMERA STREAM TO VIDEO
  // =========================================================

  useEffect(() => {
    if (showCamera && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [showCamera]);

  // =========================================================
  // CLOSE CAMERA
  // =========================================================

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  // =========================================================
  // GET CURRENT LOCATION
  // =========================================================

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );
    });
  };

  // =========================================================
  // CAPTURE SELFIE
  // =========================================================

  const captureSelfie = async () => {
    const video = videoRef.current;
    if (!video) throw new Error("Camera is not ready.");
    if (!video.videoWidth || !video.videoHeight) {
      throw new Error("Camera is still loading. Please try again.");
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((fileBlob) => {
        if (fileBlob) resolve(fileBlob);
        else reject(new Error("Failed to capture selfie."));
      }, "image/jpeg", 0.9);
    });
    return blob;
  };

  // =========================================================
  // CAPTURE SELFIE + LOCATION + MARK ATTENDANCE
  // =========================================================

  const captureAndMarkAttendance = async () => {
    try {
      setCaptureLoading(true);
      setMessage("Capturing selfie...");
      const selfieBlob = await captureSelfie();
      setMessage("Selfie captured. Getting current location...");
      const location = await getCurrentLocation();
      const formData = new FormData();
      formData.append("selfie", selfieBlob, `selfie-${Date.now()}.jpg`);
      formData.append("latitude", String(location.latitude));
      formData.append("longitude", String(location.longitude));
      formData.append("accuracy", String(location.accuracy));
      formData.append("remarks", remarks);
      setMessage("Location captured. Marking attendance...");
      const res = await axios.post("/api/staff/me/attendance", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setRemarks("");
      closeCamera();
      await getAttendance();
    } catch (error) {
      console.error("Attendance error:", error);
      if (error.code === 1) {
        setMessage("Location permission denied. Please allow location access.");
      } else if (error.code === 2) {
        setMessage("Current location is unavailable.");
      } else if (error.code === 3) {
        setMessage("Location request timed out. Please try again.");
      } else {
        setMessage(
          error.response?.data?.message || error.message || "Unable to mark attendance."
        );
      }
    } finally {
      setCaptureLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadData();
  }, []);

  // =========================================================
  // CAMERA CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // =========================================================
  // CALENDAR DATA
  // =========================================================

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // =========================================================
  // PRESENT DATE SET
  // =========================================================

  const presentDateSet = useMemo(() => {
    return new Set(
      attendance.filter((item) => item.status === "Present").map((item) => item.date)
    );
  }, [attendance]);

  // =========================================================
  // LEAVE DATE SET
  // =========================================================

  const leaveDateSet = useMemo(() => {
    const dates = new Set();
    leaves.forEach((leave) => {
      if (leave.status !== "Approved") return;
      const current = new Date(leave.fromDate);
      const end = new Date(leave.toDate || leave.fromDate);
      while (current <= end) {
        dates.add(formatLocalDate(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [leaves]);

  // =========================================================
  // CALENDAR HELPERS
  // =========================================================

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

  // =========================================================
  // CURRENT MONTH ATTENDANCE
  // =========================================================

  const currentMonthAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const [year, month] = item.date.slice(0, 10).split("-").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    });
  }, [attendance, currentMonth, currentYear]);

  const presentDays = currentMonthAttendance.filter((item) => item.status === "Present")
    .length;

  // =========================================================
  // LEAVE DAYS
  // =========================================================

  const leaveDays = useMemo(() => {
    let count = 0;
    leaveDateSet.forEach((dateString) => {
      const [year, month] = dateString.split("-").map(Number);
      if (month - 1 === currentMonth && year === currentYear) count++;
    });
    return count;
  }, [leaveDateSet, currentMonth, currentYear]);

  // =========================================================
  // TOTAL WORKING DAYS
  // =========================================================

  const totalWorkingDays = useMemo(() => {
    let workingDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      if (!isSunday(day)) workingDays++;
    }
    return workingDays;
  }, [currentMonth, currentYear, daysInMonth]);

  const absentDays = Math.max(totalWorkingDays - presentDays - leaveDays, 0);

  // =========================================================
  // MONTH NAVIGATION
  // =========================================================

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

  // =========================================================
  // PAGE LOADER
  // =========================================================

  if (fetching) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <Loader2 className="w-9 h-9 animate-spin text-blue-500" />
      </div>
    );
  }

  // =========================================================
  // UI – UPDATED DESIGN
  // =========================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================================================= */}
        {/* HEADER – Glassmorphism */}
        {/* ================================================= */}
        <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-4">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-2xl text-white">
              <CalendarCheck className="w-7 h-7" />
            </span>
            Attendance Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-2 ml-1">
            Take your selfie and capture current location to mark attendance.
          </p>
        </div>

        {/* ================================================= */}
        {/* STATS CARDS – Gradients */}
        {/* ================================================= */}
     {/* Stats Cards - Light Colors */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  {/* Present */}
  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-green-700">Present</p>
      <CheckCircle className="w-6 h-6 text-green-600" />
    </div>
    <p className="text-3xl font-bold text-green-800 mt-2">{presentDays}</p>
  </div>

  {/* Leave */}
  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-amber-700">Leave</p>
      <CalendarCheck className="w-6 h-6 text-amber-600" />
    </div>
    <p className="text-3xl font-bold text-amber-800 mt-2">{leaveDays}</p>
  </div>

  {/* Absent */}
  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-rose-700">Absent</p>
      <AlertCircle className="w-6 h-6 text-rose-600" />
    </div>
    <p className="text-3xl font-bold text-rose-800 mt-2">{absentDays}</p>
  </div>

  {/* Attendance % */}
  <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-indigo-700">Attendance %</p>
      <Clock className="w-6 h-6 text-indigo-600" />
    </div>
    <p className="text-3xl font-bold text-indigo-800 mt-2">
      {totalWorkingDays ? Math.round((presentDays / totalWorkingDays) * 100) : 0}%
    </p>
  </div>
</div>

        {/* ================================================= */}
        {/* MAIN GRID: Mark Attendance + Calendar */}
        {/* ================================================= */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mark Attendance Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/70 p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Today's Attendance</h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks (optional)"
              disabled={presentDateSet.has(today)}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none disabled:bg-gray-50 text-gray-700 text-sm"
              rows="3"
            />

            <button
              onClick={openCamera}
              disabled={cameraLoading || presentDateSet.has(today)}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-200"
            >
              {cameraLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Opening Camera...
                </>
              ) : presentDateSet.has(today) ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Already Marked
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Mark Attendance
                </>
              )}
            </button>

            {!presentDateSet.has(today) && (
              <div className="mt-5 space-y-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-500" />
                  Take selfie
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Capture location
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Submit attendance
                </div>
              </div>
            )}

            {message && (
              <div className="mt-4 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl text-sm flex gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </div>

          {/* Calendar Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-gray-200/70 p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Monthly Calendar</h2>
              <div className="flex items-center gap-2">
                <button onClick={goToPrevMonth} className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-lg font-semibold text-gray-700 min-w-[160px] text-center">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button onClick={goToNextMonth} className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}

              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const present = isPresentDate(day);
                const leave = isLeaveDate(day);
                const sunday = isSunday(day);
                const absent = !present && !leave && !sunday;

                let bg = 'bg-gray-50';
                let textColor = 'text-gray-600';
                let label = '';

                if (present) {
                  bg = 'bg-emerald-100';
                  textColor = 'text-emerald-700';
                  label = 'P';
                } else if (leave) {
                  bg = 'bg-amber-100';
                  textColor = 'text-amber-700';
                  label = 'L';
                } else if (sunday) {
                  bg = 'bg-rose-100';
                  textColor = 'text-rose-600';
                  label = 'S';
                } else if (absent) {
                  bg = 'bg-gray-50';
                  textColor = 'text-gray-400';
                  label = 'A';
                }

                return (
                  <div
                    key={day}
                    className={`h-14 rounded-xl flex flex-col items-center justify-center font-medium ${bg} transition hover:scale-105`}
                  >
                    <span className="text-sm">{day}</span>
                    {label && <span className={`text-[10px] font-bold ${textColor}`}>{label}</span>}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-emerald-100 rounded-full" /> Present (P)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-100 rounded-full" /> Leave (L)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-gray-50 border border-gray-200 rounded-full" /> Absent (A)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-rose-100 rounded-full" /> Sunday (S)
              </span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* ATTENDANCE HISTORY TABLE */}
        {/* ================================================= */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/70 border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Attendance History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Selfie</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {item.checkIn ? new Date(item.checkIn).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '-'}
                      </td>
                      <td className="px-5 py-4">
                        {item.selfie ? (
                          <img
                            src={`/uploads/selfies/${item.selfie.split(/[\\/]/).pop()}`}
                            alt="selfie"
                            className="w-12 h-12 rounded-xl object-cover border-2 border-gray-200 hover:scale-105 transition"
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-5 py-4">
  {item.location?.coordinates?.length === 2 ? (
    <a
      href={`https://www.google.com/maps?q=${item.location.coordinates[1]},${item.location.coordinates[0]}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
    >
      <MapPin className="w-4 h-4" />

      {item.location?.name || "Current Location"}
    </a>
  ) : (
    <span className="text-gray-400 text-sm">
      Not available
    </span>
  )}
</td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* CAMERA MODAL – Glassmorphism */}
      {/* ================================================= */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-200/50">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  Take Selfie
                </h2>
                <p className="text-xs text-gray-500">Keep your face in the frame</p>
              </div>
              <button
                onClick={closeCamera}
                disabled={captureLoading}
                className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="relative bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-[3/4] sm:aspect-video object-cover scale-x-[-1]"
              />
              {/* Face Guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-52 md:w-44 md:h-56 border-2 border-white/70 rounded-full shadow-lg" />
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/50 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location will be captured after selfie
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <button
                onClick={captureAndMarkAttendance}
                disabled={captureLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 disabled:opacity-60 transition"
              >
                {captureLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Take Selfie & Submit
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                Your selfie and location will be saved with today's attendance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;