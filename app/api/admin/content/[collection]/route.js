import { NextResponse } from "next/server";
import {
  forbiddenOrigin,
  isSameOrigin,
  jsonError,
  methodNotAllowed,
  readJsonBody,
} from "@/lib/cms/http";
import {
  COLLECTION_SCHEMAS,
  cloneContent,
  validateCollection,
} from "@/lib/cms/schema";
import { readContent, updateContent } from "@/lib/cms/store";

export const runtime = "nodejs";

async function collectionName(context) {
  const params = await context?.params;
  const rawName = params?.collection;
  if (typeof rawName !== "string") return "";
  try {
    return decodeURIComponent(rawName);
  } catch {
    return "";
  }
}

function requireCollection(name) {
  return COLLECTION_SCHEMAS[name]
    ? null
    : NextResponse.json({ error: `Unknown content collection: ${name}` }, { status: 404 });
}

function dataFromBody(body, preferredKey = "data") {
  if (body && typeof body === "object" && !Array.isArray(body)) {
    if (Object.hasOwn(body, preferredKey)) return body[preferredKey];
    if (Object.hasOwn(body, "data")) return body.data;
    if (Object.hasOwn(body, "item")) return body.item;
  }
  return body;
}

function collectionResponse(name, data) {
  return NextResponse.json({ collection: name, data });
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

function itemIndex(items, searchParams) {
  const requestedIndex = searchParams.get("index");
  if (requestedIndex !== null && /^\d+$/.test(requestedIndex)) {
    const index = Number(requestedIndex);
    return index < items.length ? index : -1;
  }
  const requestedId = searchParams.get("id");
  if (requestedId !== null) {
    return items.findIndex((item) => item && typeof item === "object" && String(item.id) === requestedId);
  }
  return -1;
}

export async function GET(request, context) {
  const name = await collectionName(context);
  const invalid = requireCollection(name);
  if (invalid) return invalid;
  try {
    const content = await readContent();
    return collectionResponse(name, cloneContent(content[name]));
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request, context) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const name = await collectionName(context);
  const invalid = requireCollection(name);
  if (invalid) return invalid;
  try {
    const replacement = dataFromBody(await readJsonBody(request));
    validateCollection(name, replacement);
    const content = await updateContent((current) => ({ ...current, [name]: cloneContent(replacement) }));
    return collectionResponse(name, content[name]);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request, context) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const name = await collectionName(context);
  const invalid = requireCollection(name);
  if (invalid) return invalid;
  try {
    const body = await readJsonBody(request);
    const searchParams = new URL(request.url).searchParams;
    const content = await updateContent((current) => {
      const existing = current[name];
      if (Array.isArray(existing)) {
        const index = itemIndex(existing, searchParams);
        if (index === -1) {
          if (Array.isArray(body) || Array.isArray(body?.data)) return { ...current, [name]: dataFromBody(body) };
          throw new Error("Array PATCH requests require an id or index query parameter");
        }
        const itemPatch = dataFromBody(body, "item");
        const nextItems = [...existing];
        nextItems[index] = itemPatch && typeof itemPatch === "object" && !Array.isArray(itemPatch) && existing[index] && typeof existing[index] === "object"
          ? mergeObjects(existing[index], itemPatch)
          : itemPatch;
        validateCollection(name, nextItems);
        return { ...current, [name]: nextItems };
      }
      const patch = dataFromBody(body);
      const nextCollection = mergeObjects(existing, patch);
      validateCollection(name, nextCollection);
      return { ...current, [name]: nextCollection };
    });
    return collectionResponse(name, content[name]);
  } catch (error) {
    if (error?.message === "Array PATCH requests require an id or index query parameter") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return jsonError(error);
  }
}

export async function POST(request, context) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const name = await collectionName(context);
  const invalid = requireCollection(name);
  if (invalid) return invalid;
  try {
    const body = dataFromBody(await readJsonBody(request), "item");
    const content = await updateContent((current) => {
      if (!Array.isArray(current[name])) {
        throw new Error("POST is only supported for array collections");
      }
      const nextItems = [...current[name], cloneContent(body)];
      validateCollection(name, nextItems);
      return { ...current, [name]: nextItems };
    });
    return NextResponse.json({ collection: name, item: body, data: content[name] }, { status: 201 });
  } catch (error) {
    if (error?.message === "POST is only supported for array collections") {
      return NextResponse.json({ error: error.message }, { status: 405 });
    }
    return jsonError(error);
  }
}

export async function DELETE(request, context) {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  const name = await collectionName(context);
  const invalid = requireCollection(name);
  if (invalid) return invalid;
  try {
    const searchParams = new URL(request.url).searchParams;
    const content = await updateContent((current) => {
      if (Array.isArray(current[name])) {
        const index = itemIndex(current[name], searchParams);
        if (index === -1) throw new Error("DELETE requests require a valid id or index query parameter");
        const nextItems = current[name].filter((_, itemIndexValue) => itemIndexValue !== index);
        validateCollection(name, nextItems);
        return { ...current, [name]: nextItems };
      }
      const key = searchParams.get("key");
      if (!key) throw new Error("Object DELETE requests require a key query parameter");
      const nextCollection = { ...current[name] };
      delete nextCollection[key];
      validateCollection(name, nextCollection);
      return { ...current, [name]: nextCollection };
    });
    return collectionResponse(name, content[name]);
  } catch (error) {
    if (error?.message?.includes("requests require")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return jsonError(error);
  }
}

export async function HEAD() {
  return methodNotAllowed("GET, PUT, PATCH, POST, DELETE");
}
