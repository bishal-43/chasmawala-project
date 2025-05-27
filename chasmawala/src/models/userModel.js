// /models/User.js (Single model for both regular users and admins)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    
    role: {
      type: String,
      enum: ["customer", "admin", "superadmin"],
      default: "customer",
      required: true,
    },
  },
  { timestamps: true }
);

// Exporting the model, using the same collection for both admin and user
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
