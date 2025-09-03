// src/lib/validators/password.js

import { z } from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});