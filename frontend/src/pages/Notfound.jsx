import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-400 text-lg">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's get you back on track.
        </p>

        {/* Illustration */}
        <div className="flex justify-center my-10">
          <div className="w-36 h-36 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Search size={70} className="text-blue-400" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-gray-500 text-white rounded-xl transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-500">
          © 2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;