"use client";
import Link from "next/link";
import SignOutButton from "@/app/components/LogOutButton";
import { useUserStore } from "@/store/userStore";

export default function Me() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      {!user ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <SignOutButton />
          <div className="flex gap-4">
            <Link href="/" className="btn btn-outline btn-info">
              Go to home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
