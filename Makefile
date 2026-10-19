.PHONY: test

test:
	node scripts/test-cms.mjs
	node --check lib/cms/schema.js
	node --check lib/cms/store.js
	node --check lib/cms/auth.js
	node --check lib/cms/http.js
	node --check app/api/admin/auth/route.js
	node --check app/api/admin/content/route.js
	node --check 'app/api/admin/content/[collection]/route.js'
	node --check app/api/admin/upload/route.js
