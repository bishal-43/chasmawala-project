// src/app/api/superadmin/doctors/route.js
import {connectDB} from "@/config/db";
import Doctor from "@/models/doctorModel";
import { NextResponse } from "next/server";

// ✅ Get all doctors
export async function GET() {
  await connectDB();
  const doctors = await Doctor.find();
  return NextResponse.json(doctors);
}

// ✅ Add a new doctor
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // prevent duplicate email
  const existing = await Doctor.findOne({ email: body.email });
  if (existing) {
    return NextResponse.json({ message: "Doctor with this email already exists." }, { status: 400 });
  }

  const doctor = await Doctor.create(body);
  return NextResponse.json({ message: "Doctor added successfully", doctor });
}

// ✅ Delete a doctor (optional)
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ message: "Doctor ID required" }, { status: 400 });

  await Doctor.findByIdAndDelete(id);
  return NextResponse.json({ message: "Doctor deleted successfully" });
}
