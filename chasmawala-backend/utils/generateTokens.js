const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
  const token = jwt.sign({ id:user._id, role:user.role}, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: "localhost",
    path: "/",
  });
};

module.exports = generateToken;
