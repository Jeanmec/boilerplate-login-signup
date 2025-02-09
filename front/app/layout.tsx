// app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ToastService } from "@/lib/toastService";
import { ToastProvider } from "@/lib/ToastRedirectionContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <ToastService />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
