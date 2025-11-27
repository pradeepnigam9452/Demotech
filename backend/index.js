const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();
const app = express();
const AdminRouter = require("./routes/AdminRouter");
const projectRoutes = require("./routes/projectRoutes");
const clientProjectRoutes = require('./routes/clientProjectRoutes');
const quotationRoutes = require('./routes/quotationRouter');

const PORT = process.env.PORT || 5000;
const path = require("path");
// app.use(cors());
app.use("/uploads/projects", express.static(path.join(__dirname, "uploads/projects")));

app.use(express.json());
app.use("/api/admin", AdminRouter);
app.use("/api/projects", projectRoutes);
app.use('/api/client-projects', clientProjectRoutes);
app.use('/api/quotations', quotationRoutes);

// app.use(cors({
//   origin: "http://localhost:5173", // Your frontend URL
//   credentials: true,
// }));



// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
