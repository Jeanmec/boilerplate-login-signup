"use client";

import { removeAuthToken } from "@/lib/authStorage";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = () => {
    removeAuthToken();
    router.push("/login");
  };

  return (
    <button onClick={handleSignOut} className="btn btn-error">
      Log out
    </button>
  );
}
