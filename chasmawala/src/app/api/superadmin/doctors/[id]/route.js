import { NextResponse } from "next/server";
import Doctor from "@/models/doctorModel";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth"; // ✅ Use the HOF

//
// --------------------- GET /api/superadmin/doctors/[id] ---------------------
//
// ✅ Wrap the handler with your auth function
export const GET = withSuperadminAuth(async (req, { params }) => {
  try {
    const doctor = await Doctor.findById(params.id);
    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json(doctor, { status: 200 });
  } catch (err) {
    console.error("GET Doctor Error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
});

//
// --------------------- PUT /api/superadmin/doctors/[id] ---------------------
//
export const PUT = withSuperadminAuth(async (req, { params }) => {
  try {
    const body = await req.json();
    const updated = await Doctor.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updated) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Doctor updated successfully", doctor: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT Doctor Error:", err);
    return NextResponse.json(
      { message: "Failed to update doctor", error: err.message },
      { status: 500 }
    );
  }
});

//
// --------------------- DELETE /api/superadmin/doctors/[id] ---------------------
//
export const DELETE = withSuperadminAuth(async (req, { params }) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Doctor deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Doctor Error:", err);
    return NextResponse.json(
      { message: "Failed to delete doctor", error: err.message },
      { status: 500 }
    );
  }
});
