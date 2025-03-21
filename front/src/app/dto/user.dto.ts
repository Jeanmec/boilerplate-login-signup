import { z } from "zod";

export const emailDto = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");

export const passwordDto = z
  .string()
  .min(6, "Password must be at least 8 characters");

export const nameDto = z.string().min(1, "Name is required");

export const emailVerificationCodeDto = z
  .string()
  .min(8, "Code must be at least 8 characters")
  .max(8, "Code must be at most 8 characters");
