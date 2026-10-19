import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getDefaultContent, mergeContentDefaults, validateContent } from "../lib/cms/schema.js";
import { createSessionToken, getSession } from "../lib/cms/auth.js";
import { readContent, writeContent } from "../lib/cms/store.js";

const defaults = getDefaultContent();
validateContent(defaults);
assert.equal(defaults.schemaVersion, 1);
assert.ok(defaults.landing.hero.title);
assert.ok(defaults.seo.title);
assert.ok(defaults.tracking);

const migrated = mergeContentDefaults({ schemaVersion: 1, business: defaults.business });
assert.equal(migrated.landing.header.logo, "/logo.png");
assert.equal(migrated.business.name, defaults.business.name);

process.env.CMS_ADMIN_PASSWORD = "test-password";
process.env.CMS_SESSION_SECRET = "test-session-secret";
const token = createSessionToken(Date.now());
const request = { cookies: { get: (name) => name === "cms_admin_session" ? { value: token } : undefined }, headers: new Map() };
assert.equal(getSession(request)?.sub, "admin");

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sk-it-cms-test-"));
process.env.CMS_DATA_FILE = path.join(tempDir, "content.json");
const edited = getDefaultContent();
edited.landing.hero.title = "Runtime test title";
await writeContent(edited);
const saved = await readContent({ persistDefaults: false });
assert.equal(saved.landing.hero.title, "Runtime test title");
await fs.rm(tempDir, { recursive: true, force: true });

console.log("CMS schema, auth, migration, and atomic JSON persistence checks passed.");
