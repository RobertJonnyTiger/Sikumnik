# Phase 6 — Vercel Deployment Readiness

## 6.1 — Hardcoded URLs

```bash
grep -r "localhost\|127\.0\.0\.1\|http://" src/ app/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v "//.*localhost"
```

Any match in non-test, non-comment code = 🔴 BLOCKER.

## 6.2 — next.config Check

Read `next.config.ts`. Flag:
- Any `output: 'standalone'` — fine, but note it
- Any dev-only configuration reaching production
- Any hardcoded domain or URL

## 6.3 — Vercel Compatibility

```bash
grep -r "require('fs')\|require(\"fs\")\|import.*from 'fs'" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
```

`fs` module in client components = 🔴 BLOCKER (Vercel serverless has no filesystem).

Confirm API routes are under `app/api/` following App Router conventions. No custom `server.js`.

## 6.4 — Bundle Size

After `npm run build`, report the three largest JS chunks. Any chunk over 500kb = 🟡 WARNING. Suggest lazy loading with `dynamic(() => import(...))`.

## 6.5 — Console Logs & TODOs

```bash
grep -rn "console\.log\|console\.warn" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
grep -rn "TODO\|FIXME\|HACK" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
```

Console logs in production = 🔵 SUGGESTION (remove before shipping).
TODOs/FIXMEs = 🔵 SUGGESTION (review each one — is any actually a blocker?).
