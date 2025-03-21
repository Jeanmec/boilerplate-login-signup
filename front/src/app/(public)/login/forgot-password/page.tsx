"use client";
import { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { notify } from "@/lib/toastService";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import { userService } from "@/services/user.service";
import { ResetPasswordDto } from "@/validation/auth.validation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [codeSended, setCodeSended] = useState(false);
  const { setToastRedirection } = useToastRedirection();

  const handleForgotPassword = async (email: string) => {
    setEmail(email);

    const response = await userService.forgotPassword(email);

    if (response?.message) {
      notify.info(response.message);
      setCodeSended(true);
    }
  };

  const handleResetPassword = async (data: ResetPasswordDto) => {
    const { email, code, password } = data;

    const response = await userService.resetPassword(email, code, password);

    if (response?.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  return (
    <>
      {!codeSended ? (
        <ForgotPasswordForm onSubmit={handleForgotPassword} />
      ) : (
        <ResetPasswordForm email={email} onSubmit={handleResetPassword} />
      )}
    </>
  );
}
