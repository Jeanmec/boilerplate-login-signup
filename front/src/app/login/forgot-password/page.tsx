"use client";

import { postRequest } from "@/lib/request";
import { notify } from "@/lib/toastService";
import { useState } from "react";
import { useToastRedirection } from "@/app/providers/ToastRedirectionContext";
import { TypeBasicRequest } from "@/app/types/request.t";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ForgotPassword() {
  const [codeSended, setCodeSended] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToastRedirection } = useToastRedirection();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      notify.error("Email is required.");
      return;
    }

    const response = await postRequest<{ email: string }, TypeBasicRequest>(
      "/auth/forgot-password",
      { email }
    );

    if (response && response.message) {
      notify.info(response.message);
      setCodeSended(true);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !password) {
      notify.error("All fields are required.");
      return;
    }

    const response = await postRequest<
      { email: string; password: string; code: string },
      TypeBasicRequest
    >("/auth/reset-password", {
      email,
      password,
      code,
    });

    if (response && response.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  return (
    <>
      {!codeSended ? (
        <ForgotPasswordForm {...{ email, setEmail, handleForgotPassword }} />
      ) : (
        <ResetPasswordForm
          {...{
            email,
            code,
            setCode,
            password,
            setPassword,
            handleResetPassword,
          }}
        />
      )}
    </>
  );
}
