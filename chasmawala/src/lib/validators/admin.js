// src/lib/validators/admin.js

import { z } from "zod";

// This schema defines the expected shape and validation rules for creating an admin.
export const addAdminSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});