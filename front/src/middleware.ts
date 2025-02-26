import { NextResponse, type NextRequest } from "next/server";
import { emailVerificationMiddleware } from "./middleware/emailVerification";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    const response = await emailVerificationMiddleware(request);
    if (response instanceof NextResponse) {
      return response;
    }
  }

  return NextResponse.next();
}

export function redirectTo(url: string, request: NextRequest) {
  return NextResponse.redirect(new URL(url, request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
