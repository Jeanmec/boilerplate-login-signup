"use client";

import SignOutButton from "@/app/components/signOutButton";
import { TypeBasicRequest } from "@/app/types/request.t";
import { getRequest, postRequest } from "@/lib/request";
import { useToastRedirection } from "@/lib/ToastRedirectionContext";
import { notify } from "@/lib/toastService";
import { useState } from "react";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const { setToastRedirection } = useToastRedirection();
  const [newCode, setNewCode] = useState(false);

  const handleVerificationEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await postRequest<{ code: string }, TypeBasicRequest>(
      "/auth/verify-email",
      {
        code,
      }
    );

    if (response && response.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  const handleNewCode = async () => {
    const response = await getRequest<TypeBasicRequest>(
      "/auth/signup-verification-code"
    );

    if (response && response.message) {
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
