"use client";
import { createContext, useContext, ReactNode } from "react";
import { notify } from "../lib/toastService";
import { useRouter } from "next/navigation";

type toastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
  setToastRedirection: (message: string, type: toastType, path: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastRedirection = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const setToastRedirection = (
    message: string,
    type: toastType = "success",
    path: string
  ) => {
    notify[type](message);
    router.push(path);
  };

  return (
    <ToastContext.Provider value={{ setToastRedirection }}>
      {children}
    </ToastContext.Provider>
  );
};
