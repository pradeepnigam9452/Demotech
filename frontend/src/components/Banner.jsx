

import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Sample data for the chart (requests over 7 days)
  const chartData = [1200, 1900, 1500, 2200, 2800, 2500, 3200];
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;
  const padding = 10;
  const chartHeight = 80;
  const chartWidth = 250;

  // Generate the path for the line
  const points = chartData.map((value, index) => ({
    x: (index / (chartData.length - 1)) * chartWidth,
    y: chartHeight - ((value - minValue) / range) * (chartHeight - padding) - padding / 2,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  // Area under the line (gradient fill)
  const areaPath = `
    M ${points[0].x.toFixed(1)} ${chartHeight}
    ${linePath}
    L ${points[points.length - 1].x.toFixed(1)} ${chartHeight}
    Z
  `;

  return (
    <section className="relative min-h-screen py-16 md:py-20 lg:py-24 overflow-hidden bg-white text-gray-900">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full filter blur-3xl opacity-10"
        style={{ background: "#378af9" }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-[10%] w-[600px] h-[600px] rounded-full filter blur-3xl opacity-5"
        style={{ background: "#378af9" }}
        animate={{ scale: [1, 0.95, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-20 lg:pt-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - spans 3 */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
                Build Your Digital Future
                <br />
                <span className="text-[#378af9]">With Demoteck</span> Technology LLP
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                We build Business Software
              </p>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-600 leading-relaxed">
                We build scalable web applications, mobile apps, and digital
                products that help businesses grow faster and smarter.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a href="/contact">
                <button className="inline-flex h-10 items-center justify-center rounded-full bg-[#378af9] px-6 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#2a6fc7] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#378af9] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  Start Project <span className="ml-1">→</span>
                </button>
              </a>
              <a href="/services">
                <button className="inline-flex h-10 items-center justify-center rounded-full border-2 border-gray-300 bg-transparent px-6 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  View services
                </button>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#378af9]">50+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#378af9]">50+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#378af9]">99%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Satisfaction</div>
              </div>
            </motion.div>
          </div>

          {/* Right column - analytics card with graph */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-2xl p-5 md:p-7 bg-gradient-to-br from-white via-white to-blue-50/30 shadow-2xl shadow-blue-100/50 border border-blue-100/60 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-200/40 hover:scale-[1.01]">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-sm">📊</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Analytics Overview
                  </span>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium border border-emerald-200 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live
                </span>
              </div>

              {/* Deployments */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-[#378af9] px-3 py-1.5 rounded-full border border-blue-200 shadow-sm flex items-center gap-1.5">
                  <span>⚡</span> Deployments
                </span>
                <span className="text-[11px] bg-gray-50 px-3 py-1.5 rounded-full text-gray-700 border border-gray-200 shadow-sm flex items-center gap-1.5">
                  <span className="text-gray-400">▸</span> App-v2.0-Production
                </span>
                <span className="text-[11px] bg-gray-50 px-3 py-1.5 rounded-full text-gray-700 border border-gray-200 shadow-sm flex items-center gap-1.5">
                  <span className="text-gray-400">▸</span> API-Gateway-Active
                </span>
              </div>

              {/* ===== GRAPH SECTION (NEW) ===== */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Requests (last 7 days)
                  </span>
                  <span className="text-[9px] text-gray-400">peak: {maxValue}</span>
                </div>
                <div className="bg-white/50 rounded-xl p-2 border border-gray-100/50 shadow-inner">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Horizontal grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={chartHeight - (y / 100) * chartHeight + 10}
                        x2={chartWidth}
                        y2={chartHeight - (y / 100) * chartHeight + 10}
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                    ))}

                    {/* Area under the line */}
                    <path d={areaPath} fill="url(#gradient)" opacity="0.3" />

                    {/* Main line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#378af9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill="#378af9"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    ))}

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#378af9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#378af9" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Total requests */}
              <div className="mt-2 pt-4 border-t border-gray-200/70 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                  <span className="text-blue-400">📈</span> Total requests
                </span>
                
              </div>

              {/* Subtle progress bar */}
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}