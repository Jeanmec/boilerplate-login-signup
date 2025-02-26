import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .min(8, "Code must be at least 8 characters")
    .max(8, "Code must be at most 8 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
