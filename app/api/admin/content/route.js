import { NextResponse } from "next/server";
import { COLLECTION_NAMES, CONTENT_SCHEMA, cloneContent, validateContent } from "@/lib/cms/schema";
import {
  forbiddenOrigin,
  isSameOrigin,
  jsonError,
  methodNotAllowed,
  readJsonBody,
} from "@/lib/cms/http";
import { readContent, updateContent } from "@/lib/cms/store";

export const runtime = "nodejs";

function unwrapContent(body) {
  if (body && typeof body === "object" && !Array.isArray(body) && Object.hasOwn(body, "content")) {
    return body.content;
  }
  return body;
}

function mergeObjects(current, patch) {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) return patch;
  const result = { ...current };
  for (const [key, value] of Object.entries(patch)) {
    const currentValue = result[key];
    if (value && typeof value === "object" && !Array.isArray(value) && currentValue && typeof currentValue === "object" && !Array.isArray(currentValue)) {
      result[key] = mergeObjects(currentValue, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function responseContent(content) {
  return NextResponse.json({ content, schema: CONTENT_SCHEMA, collections: COLLECTION_NAMES });
}

export async function GET(request) {
  try {
    return responseContent(await readContent());
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  try {
    const body = unwrapContent(await readJsonBody(request));
    validateContent(body);
    return responseContent(await updateContent(() => cloneContent(body)));
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  try {
    const patch = unwrapContent(await readJsonBody(request));
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      return NextResponse.json({ error: "Content patch must be an object" }, { status: 400 });
    }
    const updated = await updateContent((current) => mergeObjects(current, patch));
    return responseContent(updated);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST() {
  return methodNotAllowed("GET, PUT, PATCH");
}

export async function DELETE() {
  return methodNotAllowed("GET, PUT, PATCH");
}
