import {
  emailDto,
  passwordDto,
  nameDto,
  emailVerificationCodeDto,
} from "@/app/dto/user.dto";
import { z } from "zod";

export const loginSchema = z.object({
  email: emailDto,
  password: passwordDto,
});

export const forgotPasswordSchema = z.object({
  email: emailDto,
});

export const resetPasswordSchema = z.object({
  email: emailDto,
  code: emailVerificationCodeDto,
  password: passwordDto,
});

export const signUpSchema = z.object({
  name: nameDto,
  email: emailDto,
  password: passwordDto,
});

export const emailVerificationCodeSchema = z.object({
  code: emailVerificationCodeDto,
});

export type LoginDto = z.infer<typeof loginSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
export type EmailVerificationCodeDto = z.infer<
  typeof emailVerificationCodeSchema
>;
