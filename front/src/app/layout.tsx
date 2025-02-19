import { ToastService } from "@/lib/toastService";
import { ToastProvider } from "@/app/providers/ToastRedirectionContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ToastService />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
