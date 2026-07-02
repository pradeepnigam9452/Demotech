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

// ==============================
// Routes  
// ==============================

const adminRouter = require("./routes/AdminRouter");
const projectRouter = require("./routes/projectRouter");
const clientProjectRouter = require("./routes/clientProjectRouter");
const quotationRouter = require("./routes/quotationRouter");
const enquiryRouter = require("./routes/EnquiryRouter");
const staffRouter = require("./routes/StaffRouter");
const taskRouter = require("./routes/taskRouter");
const attendanceRouter = require("./routes/AttendanceRouter");
const dailyProgressRouter = require("./routes/dailyProgressRouter");
const leaveRouter = require("./routes/leaveRouter");
const careerRouter = require("./routes/careerRouter");
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
  })
);
// ==============================
// Body Parsers
// ==============================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Files
// ==============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ==============================
// API Routes
// ==============================

app.use("/api/admin", adminRouter);
app.use("/api/projects", projectRouter);
app.use("/api/client-projects", clientProjectRouter);
app.use("/api/quotations", quotationRouter);

app.use("/api", enquiryRouter);
app.use("/api", staffRouter);
app.use("/api", taskRouter);
app.use("/api", attendanceRouter);
app.use("/api", dailyProgressRouter);
app.use("/api", leaveRouter);
app.use("/api/careers", careerRouter);

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

