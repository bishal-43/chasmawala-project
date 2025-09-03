import jwt from "jsonwebtoken";

export async function verifyAdminToken(req) {
  try {
    const token = req.cookies.get("auth-token")?.value;

    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === "admin" || decoded.role === "superadmin";
  } catch (err) {
    return false;
  }
}
