import { verifyToken } from "@/utils/verifyToken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await dbConnect();

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const superadmin = await User.findById(decoded.id).select("-password");
    res.status(200).json({ superadmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
