import { TypeCurrentAccount } from "@/types/me.t";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "@/services/user.service";

interface UserStore {
  user: TypeCurrentAccount | null;
  setCurrentUser: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setCurrentUser: async () => {
        try {
          const user = await userService.getCurrentUser();

          if (user && "name" in user && "email" in user) {
            set({ user });
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
      logout: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
);
