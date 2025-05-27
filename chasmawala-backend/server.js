const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const authRoutes = require("./routes/authRoutes");

// ✅ Load Environment Variables
dotenv.config();

// ✅ Initialize Express App
const app = express();

// ✅ Middleware (Security & Logging)
app.use(helmet()); // 🔹 Secure HTTP Headers
app.use(xssClean()); // 🔹 Prevent XSS Attacks
app.use(express.json()); // 🔹 Parse JSON Requests
app.use(cookieParser()); // 🔹 Parse Cookies
app.use(morgan("dev")); // 🔹 Logger for Development
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // 🔹 Frontend URL
  methods: ["GET", "POST"],
  credentials: true, // 🔹 Allow Cookies & Auth Headers
}));

// ✅ Rate Limiting (Prevent DDoS Attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max requests per IP
  message: { error: "Too many requests from this IP, please try again later." }
});
app.use(limiter);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if MongoDB fails
  });

// ✅ API Route Logging
app.use((req, res, next) => {
  console.log(`🚀 Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ Chasmawala Backend is running");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
