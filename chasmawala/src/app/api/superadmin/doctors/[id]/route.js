import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import Doctor from "@/models/doctorModel";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (needed for deleting images)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// === GET: Get a single doctor by ID ===
const getDoctorHandler = async (req, context, user) => {
  // 'user' is passed from middleware
  try {
    // ✅ THE FIX (v2): Get 'id' directly from the URL
    const id = req.nextUrl.pathname.split('/').pop();

    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json(doctor);

  } catch (error) {
    console.error(`Error fetching doctor: ${error.message}`);
    if (error.kind === 'ObjectId') {
        return NextResponse.json({ message: "Invalid Doctor ID format" }, { status: 400 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// === PUT: Update a single doctor by ID ===
const updateDoctorHandler = async (req, context, user) => {
  try {
    // ✅ THE FIX (v2): Get 'id' directly from the URL
    const id = req.nextUrl.pathname.split('/').pop();
    const body = await req.json();

    // Note: This route expects JSON, not FormData.
    // This is for updating text fields.
    // A separate route would be needed for changing the image file.

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedDoctor) {
      return NextResponse.json({ message: "Doctor not found for update" }, { status: 404 });
    }
    return NextResponse.json(updatedDoctor);

  } catch (error) {
    console.error(`Error updating doctor: ${error.message}`);
    if (error.code === 11000) {
        return NextResponse.json({ message: "Update failed: A doctor with this email or slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// === DELETE: Delete a single doctor by ID ===
const deleteDoctorHandler = async (req, context, user) => {
  try {
    // ✅ THE FIX (v2): Get 'id' directly from the URL
    const id = req.nextUrl.pathname.split('/').pop();

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    // --- Delete Image from Cloudinary ---
    // This is important to prevent orphaned files
    if (doctor.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(doctor.imagePublicId);
        console.log(`Successfully deleted image ${doctor.imagePublicId} from Cloudinary.`);
      } catch (cloudinaryError) {
        // Log the error, but don't stop the DB delete
        console.error("Cloudinary delete error:", cloudinaryError.message);
      }
    }
    // --- End of Cloudinary Delete ---

    // Delete the doctor from the database
    await Doctor.findByIdAndDelete(id);

    return NextResponse.json({ message: "Doctor deleted successfully" });

  } catch (error) {
    console.error(`Error deleting doctor: ${error.message}`);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};


// Export the wrapped handlers
export const GET = withSuperadminAuth(getDoctorHandler);
export const PUT = withSuperadminAuth(updateDoctorHandler);
export const DELETE = withSuperadminAuth(deleteDoctorHandler);

 