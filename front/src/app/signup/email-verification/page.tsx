"use client";

import SignOutButton from "@/app/components/LogOutButton";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import { notify } from "@/lib/toastService";
import { useState } from "react";
import { userService } from "@/services/user.service";

export default function EmailVerification() {
  const [code, setCode] = useState("");
  const { setToastRedirection } = useToastRedirection();
  const [newCode, setNewCode] = useState(false);

  const handleVerificationEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await userService.verifyEmail(code);

    if (response?.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  const handleNewCode = async () => {
    const response = await userService.getSignupVerificationCode();
    if (response?.message) {
      notify.info(response.message);
      setNewCode(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Verify your email</h1>
      <form
        onSubmit={handleVerificationEmail}
        className="flex flex-col gap-4 w-80"
      >
        <label className="flex flex-col gap-1">
          <span>Code</span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input-bordered"
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Verify
        </button>
      </form>
      <div className="flex gap-4">
        {!newCode ? (
          <button className="btn btn-warning" onClick={handleNewCode}>
            Get a new code
          </button>
        ) : null}
        <SignOutButton />
      </div>
    </div>
  );
}
