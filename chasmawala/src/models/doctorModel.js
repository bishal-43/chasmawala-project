import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user who wrote the review
        required: true,
    },
    name: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

const doctorSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    credentials: String,
    specialization: String,
    image: String,
    imagePublicId: {
        type: String,
        default: null,
    },
    // ✅ ADDED: Email and Phone for the contact modal
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    // ✅ ADDED: Fields for the DoctorCard UI
    isOnline: { type: Boolean, default: false },
    expertise: [String], // Replaces 'services' to match component, or you can change component
    stats: {
        experience: String,
        rating: { type: Number, default: 0 }, // Added default
        reviews: { type: Number, default: 0 }, // Added default
    },
    bio: String,
    qualifications: [
        { degree: String, institution: String },
    ],
    // ✅ RENAMED: 'services' to 'expertise' to match your component
    // services: [String], 
    clinic: {
        name: String,
        address: String,
        hours: String,
    },
    reviews: [reviewSchema],
});

doctorSchema.methods.updateRating = async function () {
    if (this.reviews.length > 0) {
        const avgRating =
            this.reviews.reduce((acc, item) => item.rating + acc, 0) /
            this.reviews.length;

        // ✅ FIX: Ensure rating is rounded to 1 decimal place
        this.stats.rating = Math.round(avgRating * 10) / 10;
        this.stats.reviews = this.reviews.length;
    } else {
        this.stats.rating = 0;
        this.stats.reviews = 0;
    }

    await this.save();
};

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
