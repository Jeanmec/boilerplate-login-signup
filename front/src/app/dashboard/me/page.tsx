"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRequest } from "@/lib/request";
import { TypeCurrentAccount } from "@/app/types/me.t";

export default function Me() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getRequest<TypeCurrentAccount>("/users/me");
        if (user) {
          setName(user.name);
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <h1>Welcome, {name}</h1>
          <p>Email: {email}</p>
          <div>
            <button className="btn btn-error">Logout</button>
          </div>
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
