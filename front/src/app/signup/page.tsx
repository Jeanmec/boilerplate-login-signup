"use client";
import { useState } from "react";
import { setAuthToken } from "@/store/authStore";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import Link from "next/link";
import { userService } from "@/services/user.service";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToastRedirection } = useToastRedirection();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await userService.signUp(name, email, password);

    if (response && response.token) {
      setAuthToken(response.token);

      if (response.message) {
        setToastRedirection(
          response.message,
          "info",
          "/signup/email-verification"
        );
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Sign up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered"
            autoComplete="username"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
            autoComplete="email"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
            autoComplete="new-password"
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Sign up
        </button>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="underline text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
