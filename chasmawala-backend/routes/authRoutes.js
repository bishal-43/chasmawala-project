const express = require("express");
const { loginUser, getUserProfile, signupUser, checkAuth } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

console.log("✅ authRoutes.js is initialized");

// 🔹 Authentication Routes
router.post("/signup", signupUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect(), getUserProfile); // Get User Profile (Protected)
router.get("/check-auth", protect(), checkAuth);

router.get("/admin/dashboard", protect("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome Admin 👑" });
});

// 🔹 Alternative Route (Optional for Frontend Compatibility)
router.post("/account/login", loginUser); // Duplicate login for frontend compatibility

console.log("✅ authRoutes.js fully loaded");

module.exports = router;
