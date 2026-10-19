import { NextResponse } from "next/server";
import {
  clearSessionCookieOptions,
  createSessionToken,
  isAuthConfigured,
  isAuthenticated,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/cms/auth";
import {
  forbiddenOrigin,
  isSameOrigin,
  jsonError,
  readJsonBody,
} from "@/lib/cms/http";

export const runtime = "nodejs";

export async function GET(request) {
  return NextResponse.json({
    configured: isAuthConfigured(),
    authenticated: isAuthenticated(request),
  });
}

export async function POST(request) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "Admin authentication is not configured" }, { status: 503 });
  }

  try {
    const body = await readJsonBody(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be an object" }, { status: 400 });
    }
    if (!verifyAdminPassword(body.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions());
    return response;
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(SESSION_COOKIE, "", clearSessionCookieOptions());
  return response;
}
