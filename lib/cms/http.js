import { NextResponse } from "next/server";
import { CmsValidationError } from "./schema";

export const MAX_JSON_BODY_BYTES = 2 * 1024 * 1024;

export class CmsRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "CmsRequestError";
    this.status = status;
  }
}

export async function readJsonBody(request, maxBytes = MAX_JSON_BODY_BYTES) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxBytes) throw new CmsRequestError("Request body is too large", 413);

  let raw;
  try {
    raw = await request.text();
  } catch {
    throw new CmsRequestError("Unable to read request body", 400);
  }
  if (Buffer.byteLength(raw, "utf8") > maxBytes) throw new CmsRequestError("Request body is too large", 413);
  if (!raw.trim()) throw new CmsRequestError("Request body is required", 400);

  try {
    return JSON.parse(raw);
  } catch {
    throw new CmsRequestError("Request body must be valid JSON", 400);
  }
}

function forwardedValue(request, name) {
  return request.headers.get(name)?.split(",")[0]?.trim();
}

export function expectedRequestOrigin(request) {
  const requestUrl = new URL(request.url);
  const protocol = forwardedValue(request, "x-forwarded-proto") || requestUrl.protocol.replace(":", "");
  const host = forwardedValue(request, "x-forwarded-host") || request.headers.get("host") || requestUrl.host;
  return `${protocol}://${host}`;
}

export function isSameOrigin(request) {
  const origin = request.headers.get("origin") || request.headers.get("referer");
  if (!origin || origin === "null") return false;
  try {
    return new URL(origin).origin === expectedRequestOrigin(request);
  } catch {
    return false;
  }
}

export function jsonError(error) {
  if (error instanceof CmsRequestError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof CmsValidationError || error?.code === "CMS_CONTENT_INVALID") {
    return NextResponse.json({ error: error.message || "Invalid content" }, { status: 400 });
  }
  if (error?.code === "CMS_CONTENT_TOO_LARGE") {
    return NextResponse.json({ error: "Content is too large" }, { status: 413 });
  }
  if (error?.code === "CMS_WRITE_FAILED") {
    return NextResponse.json({ error: "Unable to save content" }, { status: 500 });
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export function unauthorized() {
  return NextResponse.json({ error: "Authentication required" }, { status: 401 });
}

export function forbiddenOrigin() {
  return NextResponse.json({ error: "Request origin is not allowed" }, { status: 403 });
}

export function methodNotAllowed(allow) {
  return new NextResponse(null, { status: 405, headers: { Allow: allow } });
}
