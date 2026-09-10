

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Briefcase,
  CheckCircle,
} from 'lucide-react';

const StaffHome = ({ setActiveView }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    staffId: '',
    role: '',
    email: '',
    designation: '',
    department: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('staffToken');
    if (!token) {
      navigate('/demotech/staff/login');
      return;
    }

    const staffData = localStorage.getItem('staff');
    if (staffData) {
      try {
        const parsed = JSON.parse(staffData);
        setUser({
          name: parsed.name || '',
          staffId: parsed.staffId || '',
          role: parsed.role || '',
          email: parsed.email || '',
          designation: parsed.designation || 'Staff',
          department: parsed.department || 'Department',
          profileImage: parsed.profileImage,
        });
      } catch (e) {
        console.error('Error parsing staff data', e);
      }
    } else {
      const name = localStorage.getItem('staffName') || '';
      const staffId = localStorage.getItem('staffId') || '';
      const role = localStorage.getItem('staffRole') || '';
      setUser((prev) => ({ ...prev, name, staffId, role }));
    }
  }, [navigate]);

  // Stats – count removed, now only label + description + icon
  const stats = [
    {
      label: 'Active Projects',
      icon: FolderOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      view: 'Projects',
      description: 'View all your active projects',
    },
    {
      label: 'Total Tasks',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      view: 'StaffTasks',
      description: 'View all tasks',
    },
  ];

  const quickActions = [
    {
      name: 'Mark Attendance',
      icon: Clock,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      view: 'Attendance',
      description: 'Mark your daily attendance',
    },
    {
      name: 'Apply Leave',
      icon: Calendar,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      view: 'Leave',
      description: 'Request for leave',
    },
  ];

  const handleNavigate = (view) => {
    if (setActiveView) {
      setActiveView(view);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 p-1 md:p-2">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ---- Welcome Section (Glassmorphism) ---- */}
        <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden border-2 border-indigo-200">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name || 'Staff'}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                  Welcome back, {user.name || 'Staff'}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>Staff ID: {user.staffId || 'N/A'}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Email: {user.email || 'N/A'}</span>
                  {user.role && (
                    <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200">
                      <CheckCircle className="w-3 h-3" />
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1 bg-white/60 px-3 py-1.5 rounded-full border border-gray-200/60">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>

        {/* ---- Stats Grid (Compact Cards – no count) ---- */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(stat.view)}
              className="group bg-white rounded-2xl border border-gray-200/80 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
                <div
                  className={`${stat.color} p-2.5 rounded-xl border group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium flex items-center gap-1">
                  Click to view <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Quick Actions (Pastel Buttons) ---- */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(action.view)}
                className="group bg-gray-50 hover:bg-white border border-gray-200/60 hover:border-indigo-300 rounded-xl p-5 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform border`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mt-3">
                  {action.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ---- Footer ---- */}
        <div className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} — Staff Dashboard
        </div>
      </div>
    </div>
  );
};

export default StaffHome;