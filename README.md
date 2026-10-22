# SK IT Services

Next.js + Tailwind landing page with a runtime JSON CMS. The public site reads the current content document on every request, so a CMS save is published immediately without rebuilding the app.

## Local setup

Use the pinned Node version (`.nvmrc`) and install from the lockfile:

```sh
npm ci
cp .env.example .env.local
```

The admin panel opens at `/admin/login` behind an admin password. Set the credentials in the environment before running:

```env
CMS_ADMIN_PASSWORD=change-me-admin-password
CMS_SESSION_SECRET=change-me-session-secret
# Optional persistent path. Defaults to storage/content.json.
# CMS_DATA_FILE=storage/content.json
```

Run the app:

```sh
npm run dev
# public site: http://localhost:3000
# CMS login: http://localhost:3000/admin/login
# CMS editor: http://localhost:3000/admin
```

The first request creates `storage/content.json` from the editable defaults. The file is intentionally ignored by git so production content and credentials never become source-controlled files. Set `CMS_DATA_FILE` when the Hostinger filesystem uses a different persistent path.

## CMS workflow

1. Open `/admin/login` and sign in with the admin password set in `CMS_ADMIN_PASSWORD`.
2. Select a section from the left navigation. The sections are grouped as Website, Your content, and Settings.
3. Edit the labelled input fields. Headings, paragraphs, button labels, links, icons, points, FAQs, reviews, business details, footer, legal copy, quote options, SEO metadata, and tracking settings are shown as readable fields instead of a JSON document.
4. Use **Add** or **Remove item** for collection entries such as services, products, reviews, FAQs, navigation links, statistics, and process steps.
5. Image fields include a live preview. Type an existing image path or use **Choose a new picture** to upload a JPEG, PNG, WebP, or GIF (up to 5 MB).
6. Click **Save changes**, then use **View website** to check the public page. No `npm run build` is required after a content save.

The admin routes are protected by an admin login (session cookie, 8-hour expiry). The write APIs also require a same-origin request. If the CMS is public on the internet, protect `/admin` and `/api/admin/*` with Hostinger Basic Auth, an IP allowlist, or a reverse proxy before launch.

## Editable collections

The admin panel includes:

- Landing page settings and every section's copy/images/buttons
- Navigation, service trust strips, product trust strips, footer groups and copyright
- Services, products, custom PC types/steps/points/brands, reasons, process steps
- Review stats, reviews, FAQ categories/questions, inquiry types and quote-step options
- Business contact details and WhatsApp/phone links
- SEO title, description, keywords, canonical URL, Open Graph fields and robots
- Google Tag Manager ID, analytics/pixel IDs, and optional custom head/body scripts
- Privacy policy content and update date

The JSON API is used by the direct-access admin UI:

```text
POST   /api/admin/auth
GET    /api/admin/auth
DELETE /api/admin/auth
GET    /api/admin/content
PUT    /api/admin/content
PATCH  /api/admin/content
GET|PUT|PATCH|POST|DELETE /api/admin/content/:collection
POST   /api/admin/upload       # multipart field: file, max 5 MB
```

## Checks and production run

```sh
make test
npm run build
npm start
```

`make test` runs the offline CMS schema, migration, authentication, atomic JSON persistence, and syntax checks. `npm run build` verifies the Next.js application and all routes.

## Hostinger deployment

This no-rebuild CMS requires a Hostinger plan that runs a persistent Node.js process (`npm start`) with a writable filesystem. It cannot work on static-only hosting or an immutable/serverless deployment because a JSON file cannot persist there.

1. Build the project with `npm ci` and `npm run build` on the deployment machine or in CI.
2. Upload the project/runtime bundle and start it with `npm start` (normally behind Hostinger's Node process/reverse proxy).
3. Keep `storage/content.json` and `public/uploads/` on persistent storage across ZIP uploads/restarts. If a new ZIP would overwrite them, configure `CMS_DATA_FILE` outside the release directory and preserve `public/uploads` separately.
4. Protect the public admin routes with Hostinger Basic Auth, an IP allowlist, or a reverse proxy.
5. Keep backups of the JSON file and uploads before replacing a deployment.

Docker is also included for reproducible builds:

```sh
docker build -t sk-it-services .
docker run --rm -p 3000:3000 \
  -v "$(pwd)/storage:/app/storage" \
  -v "$(pwd)/public/uploads:/app/public/uploads" \
  sk-it-services
```

## Project structure

- `app/page.js` — request-time public landing page
- `app/admin/page.js`, `components/AdminClient.js`, and `components/AdminFieldEditor.js` — CMS dashboard and readable field editor
- `app/api/admin/` — authenticated content, CRUD, auth, and upload APIs
- `lib/cms/` — default schema, validation, auth, atomic JSON storage, and request helpers
- `storage/content.json` — runtime CMS document (created on first request; not committed)
- `public/images/` — bundled original images
- `public/uploads/` — CMS-uploaded images (runtime files; not committed)
