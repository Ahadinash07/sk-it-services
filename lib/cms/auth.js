import crypto from "node:crypto";

export const SESSION_COOKIE = "cms_admin_session";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

function configuredPassword() {
  return process.env.CMS_ADMIN_PASSWORD || "";
}

function configuredSecret() {
  return process.env.CMS_SESSION_SECRET || "";
}

export function isAuthConfigured() {
  return Boolean(configuredPassword() && configuredSecret());
}

function safeEqual(left, right) {
  const leftDigest = crypto.createHash("sha256").update(String(left)).digest();
  const rightDigest = crypto.createHash("sha256").update(String(right)).digest();
  return crypto.timingSafeEqual(leftDigest, rightDigest);
}

export function verifyAdminPassword(password) {
  if (!isAuthConfigured() || typeof password !== "string") return false;
  return safeEqual(password, configuredPassword());
}

function encode(value) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function sign(encodedPayload) {
  return crypto.createHmac("sha256", configuredSecret()).update(encodedPayload).digest("base64url");
}

export function createSessionToken(now = Date.now()) {
  if (!isAuthConfigured()) throw new Error("CMS authentication is not configured");
  const issuedAt = Math.floor(now / 1000);
  const payload = {
    sub: "admin",
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
    jti: crypto.randomBytes(12).toString("hex"),
  };
  const encodedPayload = encode(payload);
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

function cookieValue(request) {
  const directCookie = request?.cookies?.get?.(SESSION_COOKIE);
  if (directCookie?.value) return directCookie.value;

  const header = request?.headers?.get?.("cookie") || "";
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const name = part.slice(0, separator).trim();
    if (name === SESSION_COOKIE) {
      try {
        return decodeURIComponent(part.slice(separator + 1).trim());
      } catch {
        return "";
      }
    }
  }
  return "";
}

export function getSession(request, now = Date.now()) {
  if (!isAuthConfigured()) return null;
  const token = cookieValue(request);
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const encodedPayload = token.slice(0, separator);
  const providedSignature = token.slice(separator + 1);
  const expectedSignature = sign(encodedPayload);
  if (!safeEqual(providedSignature, expectedSignature)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  const nowSeconds = Math.floor(now / 1000);
  if (payload?.sub !== "admin" || !Number.isInteger(payload.iat) || !Number.isInteger(payload.exp)) return null;
  if (payload.exp <= nowSeconds || payload.iat > nowSeconds + 60) return null;
  return payload;
}

export function isAuthenticated(request) {
  return Boolean(getSession(request));
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function clearSessionCookieOptions() {
  return {
    ...sessionCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  };
}
