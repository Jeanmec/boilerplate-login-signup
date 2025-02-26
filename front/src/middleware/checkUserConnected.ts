import { NextRequest, NextResponse } from "next/server";
import { TypeCurrentAccount } from "../types/me.t";
import { redirectTo } from "../middleware";
import { userService } from "@/services/user.service";

export async function checkUserConnectedMiddleware(
  request: NextRequest
): Promise<TypeCurrentAccount | NextResponse | undefined> {
  const token = request.cookies.get("auth_token");

  if (token) {
    try {
      const response = await userService.getCurrentUser(token.value);

      if (response) {
        return redirectTo("/", request);
      }
    } catch {
      return redirectTo("/login", request);
    }
  }
}
