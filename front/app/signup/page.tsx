"use client";
import { useState } from "react";
import { postRequest } from "@/lib/request";
import { setAuthToken } from "@/lib/authStorage";
import { notify } from "@/lib/toastService";
import SignUpForm from "./SignUpForm";
import VerifyEmail from "./VerifyMail";
import { useToastRedirection } from "@/lib/ToastRedirectionContext";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [mailVerificationProcess, setMailVerificationProcess] = useState(false);
  const { setToastRedirection } = useToastRedirection();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      notify.error("All fields are required.");
      return;
    }

    const res = await postRequest("/auth/signup", { name, email, password });
    if (res.token) {
      setAuthToken(res.token);
      setMailVerificationProcess(true);

      if (res.message) {
        notify.info(res.message);
      }
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      notify.error("Code is required.");
      return;
    }

    const res = await postRequest("/auth/verify-email", { code });

    if (res.message) {
      setToastRedirection(res.message, "success", "/login");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      {mailVerificationProcess ? (
        <VerifyEmail
          {...{
            code,
            setCode,
            handleVerifyEmail,
          }}
        />
      ) : (
        <SignUpForm
          {...{
            name,
            email,
            password,
            setName,
            setEmail,
            setPassword,
            handleSignUp,
          }}
        />
      )}
    </div>
  );
}
