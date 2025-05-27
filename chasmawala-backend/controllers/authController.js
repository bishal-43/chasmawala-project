const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ Signup User
exports.signupUser = async (req, res) => {
  try {
    
    console.log("🔥 Incoming Signup Request:", req.body); // ✅ Check what's received
    const { name, email, password, role } = req.body;

    if (!name || !email || !password ) {
      console.log("🚨 Missing Fields:", { name, email, password});
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const allowedRoles = ['customer', 'admin','superadmin'];
    const userRole = allowedRoles.includes(role) ? role : 'customer'; // fallback to customer

    const newUser = new User({ name, email, password,role: userRole});
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't Exist!, Signup first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id,  role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Store token in HTTP-only secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable in production
      sameSite: "Lax", // Allows authentication across subdomains
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    res.status(200).json({ 
      message: "Login successful", 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("🔥 Profile Fetch Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Check Authentication (Used by Navbar)
exports.checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("🔥 Auth Check Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Logout User
exports.logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("🔥 Logout Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
