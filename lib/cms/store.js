import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {
  cloneContent,
  getDefaultContent,
  MAX_CONTENT_BYTES,
  mergeContentDefaults,
  validateContent,
} from "./schema.js";

const writeQueues = new Map();

export class CmsStoreError extends Error {
  constructor(message, code = "CMS_STORE_ERROR") {
    super(message);
    this.name = "CmsStoreError";
    this.code = code;
  }
}

export function getContentFilePath() {
  const configuredPath = process.env.CMS_DATA_FILE?.trim();
  return configuredPath || path.join(process.cwd(), "storage", "content.json");
}

function serializedContent(content) {
  validateContent(content);
  const serialized = `${JSON.stringify(content, null, 2)}\n`;
  const bytes = Buffer.byteLength(serialized, "utf8");
  if (bytes > MAX_CONTENT_BYTES) {
    throw new CmsStoreError(`Content exceeds the ${MAX_CONTENT_BYTES}-byte limit`, "CMS_CONTENT_TOO_LARGE");
  }
  return serialized;
}

async function atomicWrite(filePath, content) {
  const serialized = serializedContent(content);
  const directory = path.dirname(filePath);
  const temporaryPath = path.join(
    directory,
    `.${path.basename(filePath)}.${process.pid}.${crypto.randomBytes(8).toString("hex")}.tmp`,
  );

  await fs.mkdir(directory, { recursive: true });
  let handle;
  try {
    handle = await fs.open(temporaryPath, "wx", 0o600);
    await handle.writeFile(serialized, "utf8");
    await handle.sync();
    await handle.close();
    handle = undefined;
    await fs.rename(temporaryPath, filePath);
  } catch (error) {
    if (handle) await handle.close().catch(() => {});
    await fs.rm(temporaryPath, { force: true }).catch(() => {});
    throw new CmsStoreError("Unable to persist CMS content", "CMS_WRITE_FAILED");
  }
}

function enqueue(filePath, operation) {
  const previous = writeQueues.get(filePath) || Promise.resolve();
  const current = previous.catch(() => {}).then(operation);
  writeQueues.set(filePath, current);
  current.finally(() => {
    if (writeQueues.get(filePath) === current) writeQueues.delete(filePath);
  }).catch(() => {});
  return current;
}

async function readFileContent(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  if (Buffer.byteLength(raw, "utf8") > MAX_CONTENT_BYTES) {
    throw new CmsStoreError("Stored CMS content exceeds the size limit", "CMS_CONTENT_TOO_LARGE");
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new CmsStoreError("Stored CMS content is not valid JSON", "CMS_CONTENT_INVALID");
  }
  try {
    parsed = mergeContentDefaults(parsed);
    validateContent(parsed);
  } catch (error) {
    throw new CmsStoreError(error.message, "CMS_CONTENT_INVALID");
  }
  return cloneContent(parsed);
}

export async function readContent({ persistDefaults = true } = {}) {
  const filePath = getContentFilePath();
  try {
    return await readFileContent(filePath);
  } catch (error) {
    if (error?.code === "ENOENT") {
      const defaults = getDefaultContent();
      if (persistDefaults) {
        // A read should remain safe even when the configured volume is temporarily
        // unavailable; a later write can surface the persistence failure explicitly.
        await writeContent(defaults).catch(() => {});
      }
      return defaults;
    }
    if (error?.code === "CMS_CONTENT_INVALID" || error?.code === "CMS_CONTENT_TOO_LARGE") {
      // Never overwrite a malformed file automatically: the in-memory defaults keep
      // the public runtime safe while preserving the file for an operator to inspect.
      return getDefaultContent();
    }
    throw error;
  }
}

export function writeContent(content) {
  const filePath = getContentFilePath();
  const safeContent = cloneContent(content);
  return enqueue(filePath, () => atomicWrite(filePath, safeContent)).then(() => cloneContent(safeContent));
}

export function updateContent(updater) {
  const filePath = getContentFilePath();
  return enqueue(filePath, async () => {
    const current = await readContent({ persistDefaults: false });
    const next = await updater(cloneContent(current));
    const safeNext = cloneContent(next);
    await atomicWrite(filePath, safeNext);
    return cloneContent(safeNext);
  });
}
