// app/api/doctors/[slug]/route.js

import { NextResponse } from "next/server";
import Doctor from "@/models/doctorModel";
import { connectDB } from "@/config/db";

export async function GET(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const doctor = await Doctor.findOne({ slug });

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Doctor fetch error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
