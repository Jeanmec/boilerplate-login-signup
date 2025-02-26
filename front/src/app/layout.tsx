import { ToastService } from "@/lib/toastService";
import { ToastProvider } from "@/providers/ToastRedirectionContext";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ToastProvider>
            <ToastService />
            {children}
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
