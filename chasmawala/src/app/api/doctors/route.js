import { NextResponse } from "next/server";
import Doctor from "@/models/doctorModel";
import { connectDB } from "@/config/db";

export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find({});
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Doctors fetch error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
