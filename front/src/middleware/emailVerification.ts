import { NextRequest, NextResponse } from "next/server";
import { TypeCurrentAccount } from "../types/me.t";
import { redirectTo } from "../middleware";
import { userService } from "@/services/user.service";

export async function emailVerificationMiddleware(
  request: NextRequest
): Promise<TypeCurrentAccount | NextResponse | undefined> {
  const token = request.cookies.get("auth_token");

  if (!token || typeof token.value !== "string") {
    return redirectTo("/login", request);
  }

  try {
    const response = await userService.getCurrentUser(token.value);

    if (response === null) {
      return redirectTo("/login", request);
    }
    if (response?.emailValidated === false) {
      return redirectTo("/signup/email-verification", request);
    }

    return response;
  } catch {
    return redirectTo("/login", request);
  }
}
