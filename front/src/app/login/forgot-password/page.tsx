"use client";

import { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      {!codeSended ? (
        <ForgotPasswordForm setEmail={setEmail} />
      ) : (
        <ResetPasswordForm email={email} />
      )}
    </>
  );
}
