"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { getAuthToken } from "@/store/authStore";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAuthToken();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  useEffect(() => {
    if (token) {
      setCurrentUser();
    }
  }, [token, setCurrentUser]);

  return <>{children}</>;
}
