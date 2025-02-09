"use client";
import { useState } from "react";
import Link from "next/link";
import { postRequest } from "@/lib/request";
import { notify } from "@/lib/toastService";
import { setAuthToken } from "@/lib/authStorage";
import { useToastRedirection } from "@/lib/ToastRedirectionContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToastRedirection } = useToastRedirection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      notify.error("Please fill all fields");
      return;
    }

    const response = await postRequest("/auth/login", { email, password });
    if (response && response.token) {
      setAuthToken(response.token);
      if (response.message) {
        setToastRedirection(response.message, "success", "/");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <div>
          <label className="flex flex-col gap-1">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </label>
          <Link href="/reset-password" className="underline text-blue-500 mt-2">
            Forgot password ?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Login
        </button>
        <div className="flex gap-2">
          <span>No account ?</span>
          <Link href="/signup" className="underline text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
