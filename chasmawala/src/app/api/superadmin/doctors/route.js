import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import Doctor from "@/models/doctorModel";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier";
import { connectDB } from "@/config/db"; // Import connectDB for the public GET route

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper function to upload image buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
          {
      folder: folder,
      resource_type: "auto"
    },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};


// === ADD A NEW DOCTOR (PROTECTED) ===
// This is the main logic for the POST request.
// The 'user' object is passed in from the middleware.
const addDoctorHandler = async (req, context, user) => {
  console.log(`Authenticated superadmin ${user.email} is adding a doctor.`);

  try {
    // 1. Parse FormData (Middleware already connected DB)
    const formData = await req.formData();

    // 2. Extract text fields
    const name = formData.get("name");
    const email = formData.get("email");
    const slug = formData.get("slug");
    const specialization = formData.get("specialization");
    const phone = formData.get("phone");
    const credentials = formData.get("credentials");
    const bio = formData.get("bio");
    const isOnline = formData.get("isOnline") === 'true';

    // Parse JSON fields
    const stats = JSON.parse(formData.get("stats") || "{}");
    const clinic = JSON.parse(formData.get("clinic") || "{}");
    const qualifications = JSON.parse(formData.get("qualifications") || "[]");
    const expertise = JSON.parse(formData.get("expertise") || "[]");

    // 3. Validate required fields
    if (!name || !email || !slug || !specialization) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 4. Handle the image file
    const image = formData.get("image");
    let imageUrl = null;
    let imagePublicId = null;

    if (image && typeof image.arrayBuffer === 'function') {
      try {
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadResult = await uploadToCloudinary(buffer, "doctors");

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

    // 5. Create new doctor data
    const newDoctorData = {
      name, email, slug, specialization, phone, credentials, bio, isOnline,
      stats: { ...stats, rating: 0, reviews: 0 },
      clinic,
      qualifications,
      expertise,
      image: imageUrl,
      imagePublicId: imagePublicId,
    };

    // 6. Save to database
    const doctor = await Doctor.create(newDoctorData);

    return NextResponse.json(doctor, { status: 201 });

  } catch (error) {
    console.error("Add doctor error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json({ message: `A doctor with this ${field} already exists.` }, { status: 409 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// === GET ALL DOCTORS (PUBLIC) ===
// This route is public (not wrapped in middleware)
// so it must connect to the DB itself.
export async function GET() {
  //Immersive content has been omitted.
  try {
    // Connect to DB since this is not wrapped by auth middleware
    await connectDB();
    const doctors = await Doctor.find();
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Fetch doctors error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// === EXPORT THE HANDLERS ===
// The POST route is wrapped with the Superadmin authentication middleware
// The GET route is exported directly, making it public.
export const POST = withSuperadminAuth(addDoctorHandler);

