# Phase 0 — Secrets & Environment Audit

**Run this first. Always. A leaked key is an instant production incident.**

## 0.1 — Git History Check

```bash
git log --all --full-history -- .env.local
git log --all --full-history -- .env
```

Non-empty output = 🔴 BLOCKER. Stop the audit. Rotate the keys immediately.

## 0.2 — .gitignore Check

Read `.gitignore`. Confirm these are listed:
- `.env.local`
- `.env`
- `.env*.local`

Missing → 🔴 BLOCKER.

## 0.3 — Hardcoded Key Search

```bash
grep -r "AIza" . --include="*.ts" --include="*.tsx" --include="*.js" --exclude-dir=node_modules
grep -r "sk-proj" . --include="*.ts" --include="*.tsx" --include="*.js" --exclude-dir=node_modules
```

Any match outside `.env*` files → 🔴 BLOCKER.

## 0.4 — NEXT_PUBLIC_ Key Exposure

```bash
grep -r "NEXT_PUBLIC_GOOGLE" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules
```

`GOOGLE_GENERATIVE_AI_API_KEY` must NOT be prefixed `NEXT_PUBLIC_`. That exposes it to the browser → 🔴 BLOCKER.

## 0.5 — .env.example

Does `.env.example` exist with placeholder values (not real keys)? If missing → 🟡 WARNING.

## 0.6 — Variable Coverage

List every `process.env.*` reference in the codebase. Confirm each exists in `.env.local`. Any missing → 🔴 BLOCKER.
