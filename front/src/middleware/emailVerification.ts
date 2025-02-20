import { NextRequest, NextResponse } from "next/server";
import { getRequest } from "@/lib/request";
import { TypeCurrentAccount } from "@/app/types/me.t";
import { redirectTo } from "../middleware";

export async function emailVerificationMiddleware(
  request: NextRequest
): Promise<TypeCurrentAccount | NextResponse | undefined> {
  const token = request.cookies.get("auth_token");

  if (!token) {
    return redirectTo("/login", request);
  }

  try {
    const response = await getRequest<TypeCurrentAccount>(
      "/users/me",
      token.value
    );

    if (response?.emailValidated === false) {
      return redirectTo("/signup/email-verification", request);
    }
    return response;
  } catch {
    return redirectTo("/login", request);
  }
}
