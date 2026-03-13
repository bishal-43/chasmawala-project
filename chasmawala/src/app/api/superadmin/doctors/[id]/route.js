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

async function uploadToCloudinary(file) {
  // 1. Convert the File/Blob to an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  
  // 2. Convert ArrayBuffer to Buffer for Node.js
  const buffer = Buffer.from(arrayBuffer);

  // 3. Upload to Cloudinary using a Promise
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder: "chasmawala_doctors", // Organizes your images
        resource_type: "auto" 
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          reject(error);
        } else {
          resolve({url: result.secure_url, publicId: result.public_id}); // This is the final https:// URL
        }
      }
    ).end(buffer);
  });
}

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

    const currentDoctor = await Doctor.findById(id);

    if (!currentDoctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const updateData = {};

    for (const [key, value] of formData.entries()) {
      // Handle the image separately later
      if (key === "image") continue;

      try {
        // If the value looks like a JSON string (for qualifications, expertise, clinic, stats)
        // try to parse it. If it fails, use the raw value.
        updateData[key] = (typeof value === 'string' && (value.startsWith('{') || value.startsWith('[')))
          ? JSON.parse(value)
          : value;
      } catch {
        updateData[key] = value;
      }
    }

    const imageFile = formData.get("image");

    // If it's a File object (user uploaded a new one)
    if (imageFile && typeof imageFile !== "string" && imageFile.name) {
      const { url, publicId } = await uploadToCloudinary(imageFile); 
      updateData.image = url;
      updateData.imagePublicId = publicId;

      // DELETE OLD IMAGE (Cleanup)
      if (currentDoctor.imagePublicId) {
        await cloudinary.uploader.destroy(currentDoctor.imagePublicId).catch(err => 
          console.error("Failed to delete old image:", err)
        );
      }
      
    }
    // If it's a string, it's just the existing URL, so we don't need to do anything
    // unless you want to explicitly set it:
    else if (typeof imageFile === "string") {
      updateData.image = imageFile;
    }

    delete updateData._id;

    // Note: This route expects JSON, not FormData.
    // This is for updating text fields.
    // A separate route would be needed for changing the image file.

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, {
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

