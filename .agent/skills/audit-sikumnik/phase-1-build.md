# Phase 1 — Build Integrity

## 1.1 — Production Build

```bash
npm run build
```

Capture full output. Every error = 🔴 BLOCKER. Large bundle warnings = 🟡 WARNING.

## 1.2 — TypeScript

```bash
npx tsc --noEmit
```

Every type error = 🔴 BLOCKER. Pay specific attention to:
- Components under `src/components/ui/`
- API route files under `app/api/`
- Quiz/question components
- Navigation components

## 1.3 — Lint

```bash
npm run lint
```

Uses `eslint.config.mjs`. All errors = 🟡 WARNING minimum. `no-unused-vars` in component files suggests dead/incomplete features — flag each instance.
