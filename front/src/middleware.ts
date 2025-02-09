import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("test");

  return NextResponse.next();
}

// Here is the matcher config.
// Set an array of paths that are able to invoke middleware.
// Also accepts wildcard paths.
export const config = {
  matcher: ["/login", "/account"],
};
