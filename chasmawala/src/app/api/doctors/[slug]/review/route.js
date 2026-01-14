// app/api/doctors/[slug]/review/route.js

import { NextResponse } from "next/server";
import Doctor from "@/models/doctorModel";
import { connectDB } from "@/config/db";
import { verifyTokenAndGetUser } from "@/lib/auth";

export async function POST(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const { rating, comment } = await req.json();

    // 🧩 Verify user authentication
    const token =
      req.cookies.get("auth-token")?.value ||
      req.headers.get("authorization")?.split(" ")[1];

    if(!token){
      return NextResponse.json({ message: "Unauthorized,Please login to review" }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const doctor = await Doctor.findOne({ slug });
    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    // Check if user already reviewed
    const alreadyReviewed = doctor.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );
    if (alreadyReviewed) {
      return NextResponse.json(
        { message: "You have already reviewed this doctor" },
        { status: 400 }
      );
    }

    // Create new review
    const review = {
      user: user._id,
      name: user.name,
      rating: Number(rating),
      comment,
    };

    doctor.reviews.push(review);
    await doctor.updateRating(); // Automatically updates avg rating and total reviews

    return NextResponse.json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
