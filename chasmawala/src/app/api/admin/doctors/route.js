import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Doctor from "@/models/doctorModel";
import { verifyToken } from "@/lib/verifyToken";
import { v2 as cloudinary } from 'cloudinary'; // We will create this file next
import streamifier from "streamifier";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// GET function remains the same
export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find();
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Fetch doctors error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// --- Helper function to upload image buffer to Cloudinary ---
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    // Use streamifier to create a read stream from the buffer
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// --- POST function is now updated ---
export async function POST(req) {
  try {
    await connectDB();
    
    // 1. Authenticate the user
    const token = req.cookies.get("admin-token")?.value;
    const user = await verifyToken(token);

    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse FormData instead of JSON
    const formData = await req.formData();

    // 3. Extract text fields
    const name = formData.get("name");
    const slug = formData.get("slug");
    const specialization = formData.get("specialization");
    const credentials = formData.get("credentials");
    const bio = formData.get("bio");

    // 4. Extract and handle the image file
    const image = formData.get("image");
    
    let imageUrl = null;
    let imagePublicId = null; // We save this to delete the image from Cloudinary later if needed

    if (image && typeof image.arrayBuffer === 'function') {
      try {
        // Convert image to buffer
        const buffer = Buffer.from(await image.arrayBuffer());
        
        // Upload buffer to Cloudinary
        const uploadResult = await uploadToCloudinary(buffer, "doctors"); // "doctors" is the folder name in Cloudinary

        if (!uploadResult || !uploadResult.secure_url) {
          throw new Error("Cloudinary upload failed");
        }

        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;

      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
      }
    }

    // 5. Create new doctor data object
    const newDoctorData = {
      name,
      slug,
      specialization,
      credentials,
      bio,
      image: imageUrl,
      imagePublicId: imagePublicId,
    };

    // 6. Save to database
    const doctor = await Doctor.create(newDoctorData);

    return NextResponse.json(doctor, { status: 201 });

  } catch (error) {
    console.error("Add doctor error:", error);
    // Handle specific errors, e.g., duplicate key
    if (error.code === 11000) {
        return NextResponse.json({ message: "A doctor with this name or slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
