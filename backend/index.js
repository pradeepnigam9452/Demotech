
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const app = express();
// Routes
const AdminRouter = require("./routes/AdminRouter");
const projectRoutes = require("./routes/projectRoutes");
const clientProjectRoutes = require("./routes/clientProjectRoutes");
const quotationRoutes = require("./routes/quotationRouter");
const EnquiryRouter = require("./routes/EnquiryRouter")
const StaffRouter = require('./routes/StaffRouter')
const TaskRouter = require('./routes/taskRoutes')
const attendanceRoutes = require('./routes/AttendanceRoutes')
const dailyProgressRoutes = require("./routes/dailyProgressRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT || 5011;


// ==============================
// Security Middleware 
// ==============================
app.use(helmet());

// ==============================
// Request Logging
// ==============================
app.use(morgan("dev"));

// ==============================
// Compression
// ==============================
app.use(compression());

// ==============================
// Cookie Parser
// ==============================
app.use(cookieParser());

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin: "*",
  }),
);

// ==============================
// Body Parsers
// ==============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// ==============================
// Static Files
// ==============================

// app.use(
//   "/uploads/projects",
//   express.static(path.join(__dirname, "uploads/projects")),
// );


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ==============================
// API Routes
// ==============================




app.use("/api/admin", AdminRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/client-projects", clientProjectRoutes);
app.use("/api/quotations", quotationRoutes);
app.use('/api/',EnquiryRouter)
app.use("/api", taskRoutes);
app.use('/api/',StaffRouter)
app.use("/api", attendanceRoutes);
app.use("/api", dailyProgressRoutes);
app.use("/api", leaveRoutes);

// ==============================
// Health Check Route 
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// MongoDB Connection & Server Start
// ==============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });
