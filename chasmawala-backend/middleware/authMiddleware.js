/*const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require("cookie-parser");



exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user based on the decoded ID
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (req.user?.role !== expectedRole) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error("🔥 Auth Middleware Error:", error);

    // Handling specific expired token error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Generic error handling
    res.status(401).json({ message: "Unauthorized" });
  }
};*/



const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require("cookie-parser");

//  Protect middleware that accepts an expected role
exports.protect = (expectedRole) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies["token"] || req.cookies["admin-token"];

      console.log("Token received:", token);

      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user and attach to request
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 🔐 Check role if expectedRole is provided
      if (expectedRole && user.role !== expectedRole) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }

      req.user = user; // attach user to request
      next();
    } catch (error) {
      console.error("🔥 Auth Middleware Error:", error);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
