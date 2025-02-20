import { NextRequest, NextResponse } from "next/server";
import { TypeCurrentAccount } from "@/app/types/me.t";
import { redirectTo } from "../middleware";

export async function checkUserConnectedMiddleware(
  request: NextRequest
): Promise<TypeCurrentAccount | NextResponse | undefined> {
  const token = request.cookies.get("auth_token");

  if (token) {
    return redirectTo("/dashboard/me", request);
  }
}
