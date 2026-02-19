# Phase 5 — Hebrew RTL Rendering

## 5.1 — Root Direction (Critical)

```bash
grep -n "dir=" app/layout.tsx
grep -n "lang=" app/layout.tsx
```

Must find: `<html lang="he" dir="rtl">`

`dir="rtl"` missing = 🔴 BLOCKER. The entire layout will be broken.
`lang="he"` missing = 🟡 WARNING.

## 5.2 — RTL Library Detection

```bash
grep -r "next-intl\|react-i18next\|@formatjs\|rtl" package.json
```

If no RTL library found, the site handles RTL manually. Flag as 🔵 SUGGESTION to evaluate a proper i18n solution before scaling.

## 5.3 — Markdown Rendering

Find where AI chat responses render (likely a markdown component). Check:

```bash
grep -r "dangerouslySetInnerHTML\|ReactMarkdown\|marked\|remark" src/ app/ --include="*.tsx" -l
```

For each markdown renderer:
- Does `**bold**` render as `<strong>` or appear as raw `**text**`? Raw asterisks = 🔴 BLOCKER.
- Is the renderer configured with `dir="rtl"` or inheriting it from root?
- Does mixed Hebrew + English text (bidi) render readably?

## 5.4 — Tailwind RTL Class Audit

These classes break RTL layouts. Find and flag each:

```bash
grep -r "text-left\b" src/ --include="*.tsx" | grep -v node_modules
grep -r "\bml-\|\bpl-\|\bleft-0\b\|\bleft-\[" src/ --include="*.tsx" | grep -v node_modules
```

Each instance = 🟡 WARNING. RTL-safe alternatives: `text-start`, `ms-`, `ps-`, `start-0`.
