import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { forbiddenOrigin, isSameOrigin, jsonError } from "@/lib/cms/http";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MAX_MULTIPART_REQUEST_BYTES = MAX_UPLOAD_BYTES + 256 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const runtime = "nodejs";

function safeBaseName(originalName) {
  const withoutExtension = String(originalName || "image").replace(/\.[^/.]+$/, "");
  const normalized = withoutExtension.normalize("NFKD").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return (normalized || "image").slice(0, 48);
}

async function atomicUpload(filePath, bytes) {
  const directory = path.dirname(filePath);
  const temporaryPath = path.join(directory, `.${path.basename(filePath)}.${crypto.randomBytes(8).toString("hex")}.tmp`);
  let handle;
  try {
    await fs.mkdir(directory, { recursive: true });
    handle = await fs.open(temporaryPath, "wx", 0o644);
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = undefined;
    await fs.rename(temporaryPath, filePath);
  } catch (error) {
    if (handle) await handle.close().catch(() => {});
    await fs.rm(temporaryPath, { force: true }).catch(() => {});
    throw error;
  }
}

export async function POST(request) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_MULTIPART_REQUEST_BYTES) {
    return NextResponse.json({ error: "Upload is too large" }, { status: 413 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file.arrayBuffer !== "function" || typeof file.size !== "number") {
      return NextResponse.json({ error: "A file field is required" }, { status: 400 });
    }
    const mimeType = String(file.type || "").toLowerCase();
    if (!IMAGE_TYPES[mimeType]) {
      return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are allowed" }, { status: 415 });
    }
    if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Image must be between 1 byte and 5 MB" }, { status: 413 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length !== file.size || bytes.length > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Image is too large" }, { status: 413 });
    }

    const extension = IMAGE_TYPES[mimeType];
    const filename = `${safeBaseName(file.name)}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extension}`;
    const destination = path.join(process.cwd(), "public", "uploads", filename);
    await atomicUpload(destination, bytes);

    return NextResponse.json({
      file: {
        name: filename,
        url: `/uploads/${filename}`,
        type: mimeType,
        size: bytes.length,
      },
    }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
