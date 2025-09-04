import { verifyAdminToken } from "@/utils/verifyToken";
import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";


export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await connectDB();

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyAdminToken(token);

    if (!decoded || decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const superadmin = await User.findById(decoded.id).select("-password");
    res.status(200).json({ superadmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
