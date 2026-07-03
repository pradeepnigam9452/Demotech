

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../../assets/logo.png";

// const StaffLogin = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ staffId: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.staffId || !form.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/staff/login", form);
//       const { token, data } = response.data;

//       localStorage.setItem("staffToken", token);
//       localStorage.setItem("staff", JSON.stringify(data));
//       localStorage.setItem("staffName", data.name);
//       localStorage.setItem("staffId", data.staffId);
//       localStorage.setItem("staffRole", data.role);
//       console.log("Login successful:", data);
       

//       navigate("/binarylogix/staffdashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       const msg =
//         error.response?.data?.message || "Invalid credentials. Please try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Eye icon SVG
//   const EyeIcon = ({ open }) => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2}
//       stroke="currentColor"
//       className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
//     >
//       {open ? (
//         <>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//         </>
//       ) : (
//         <>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65" />
//         </>
//       )}
//     </svg>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/80 via-gray-100/70 to-gray-200/60 px-4 py-8">
//       <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white/30 animate-fade-in-up">
//         {/* Left Panel - Branding (hidden on small screens) */}
//         <div className="hidden md:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-indigo-700/80 via-blue-800/70 to-purple-900/60 backdrop-blur-sm">
//           <div>
//             <div className="bg-white rounded-2xl p-2 mb-6 flex items-center justify-center shadow-lg border border-white/20">
//               <img
//                 src={logo}
//                 alt="Binarylogix"
//                 onClick={() => navigate("/")}
//                 className="w-full max-h-14 object-contain cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-4xl font-bold leading-tight text-white">
//               STAFF LOGIN
//             </h3>
//           </div>

//           <div className="grid grid-cols-3 gap-3 text-center">
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
//               <p className="text-2xl font-bold">24/7</p>
//               <p className="text-xs text-blue-100">Access</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
//               <p className="text-2xl font-bold">100%</p>
//               <p className="text-xs text-blue-100">Secure</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
//               <p className="text-2xl font-bold">Fast</p>
//               <p className="text-xs text-blue-100">Portal</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Login Form */}
//         <div className="p-8 md:p-12 bg-white/50 backdrop-blur-md">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
//             <p className="text-sm text-slate-500 mt-1">
//               Sign in to your staff account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {error && (
//               <div
//                 role="alert"
//                 className="bg-red-50/90 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 backdrop-blur-sm"
//               >
//                 <span className="text-lg">⚠️</span>
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Staff ID */}
//             <div>
//               <label htmlFor="staffId" className="block text-sm font-semibold text-slate-700 mb-2">
//                 Staff ID
//               </label>
//               <input
//                 id="staffId"
//                 name="staffId"
//                 type="text"
//                 placeholder="e.g. BLX001"
//                 value={form.staffId}
//                 onChange={handleInputChange}
//                 className="w-full rounded-xl border border-slate-300/50 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm placeholder:text-slate-400"
//                 required
//                 aria-invalid={!!error}
//                 aria-describedby={error ? "login-error" : undefined}
//               />
//               <p className="text-xs text-slate-400 mt-1.5">
//                 Use your staff ID, for example BLX001
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter password"
//                   value={form.password}
//                   onChange={handleInputChange}
//                   className="w-full rounded-xl border border-slate-300/50 px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm placeholder:text-slate-400"
//                   required
//                   aria-invalid={!!error}
//                   aria-describedby={error ? "login-error" : undefined}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   <EyeIcon open={showPassword} />
//                 </button>
//               </div>
//             </div>

//             {/* Options */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
//                 <input type="checkbox" className="accent-blue-600 w-4 h-4" />
//                 Remember me
//               </label>
//               <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">
//                 Forgot Password?
//               </span>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Logging in...
//                 </>
//               ) : (
//                 "Login to Dashboard"
//               )}
//             </button>
//           </form>

//           <p className="text-center text-xs text-slate-400 mt-8">
//             Protected Staff Access • Binarylogix
//           </p>
//         </div>
//       </div>

//       {/* Optional: add a subtle animation keyframes (if using Tailwind, include in your CSS) */}
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StaffLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ staffId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    if (error) setError(""); // clear error on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.staffId || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/staff/login", form);
      const { token, data } = response.data;

      localStorage.setItem("staffToken", token);
      localStorage.setItem("staff", JSON.stringify(data));
      localStorage.setItem("staffName", data.name);
      localStorage.setItem("staffId", data.staffId);
      localStorage.setItem("staffRole", data.role);

      navigate("/binarylogix/staffdashboard");
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message || "Invalid credentials. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Heroicons – Eye (open)
  const EyeOpenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  // Heroicons – Eye (closed / slash)
  const EyeClosedIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/80 via-gray-100/70 to-gray-200/60 px-4 py-8">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white/30 animate-fade-in-up">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-indigo-700/80 via-blue-800/70 to-purple-900/60 backdrop-blur-sm">
          <div>
            <div className="bg-white rounded-2xl p-2 mb-6 flex items-center justify-center shadow-lg border border-white/20">
              <img
                src={logo}
                alt="Binarylogix"
                onClick={() => navigate("/")}
                className="w-full max-h-14 object-contain cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-4xl font-bold leading-tight text-white">
              STAFF LOGIN
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-blue-100">Access</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-blue-100">Secure</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-2xl font-bold">Fast</p>
              <p className="text-xs text-blue-100">Portal</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="p-8 md:p-12 bg-white/50 backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your staff account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="bg-red-50/90 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 backdrop-blur-sm"
              >
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Staff ID */}
            <div>
              <label htmlFor="staffId" className="block text-sm font-semibold text-slate-700 mb-2">
                Staff ID
              </label>
              <input
                id="staffId"
                name="staffId"
                type="text"
                placeholder="e.g. BLX001"
                value={form.staffId}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300/50 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm placeholder:text-slate-400"
                required
                aria-invalid={!!error}
                aria-describedby={error ? "login-error" : undefined}
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Use your staff ID, for example BLX001
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300/50 px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm placeholder:text-slate-400"
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Remember me
              </label>
              <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">
                Forgot Password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Protected Staff Access • Binarylogix
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StaffLogin;