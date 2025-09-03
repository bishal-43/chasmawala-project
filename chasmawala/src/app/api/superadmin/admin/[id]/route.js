// src/app/api/superadmin/admin/[id]/route.js

import { NextResponse } from "next/server";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import User from "@/models/userModel";

const deleteAdminHandler = async (req, {params}, decodedToken) => {
  const { id } = await params;

  // 1. Prevent self-deletion
  if (decodedToken.id === id) {
    return NextResponse.json({ error: "You cannot delete your own account." }, { status: 403 }); // 403 Forbidden is more specific
  }

  // 2. Perform find and delete in a single, atomic operation
  const deletedAdmin = await User.findOneAndDelete({
    _id: id,
    role: "admin", // Ensures we only delete users who are admins
  });

  // 3. Check if an admin was actually found and deleted
  if (!deletedAdmin) {
    return NextResponse.json({ error: "Admin not found or user is not an admin." }, { status: 404 });
  }

  return NextResponse.json({ message: "Admin deleted successfully." });
};

// Export the handler wrapped in our authentication middleware
export const DELETE = withSuperadminAuth(deleteAdminHandler);