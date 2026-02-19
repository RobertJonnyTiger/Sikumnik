# Phase 2 — Navigation & Route Completeness

**Known problem area. Be exhaustive. Do not summarize — prove it.**

## 2.1 — Build the Route Map

```bash
find app/ -name "page.tsx" | sort
```

Map every file to its URL route. This is your ground truth of what exists.

## 2.2 — Build the Link Map

Search every place a route is referenced:

```bash
grep -r "href=" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
grep -r "router.push" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
grep -r "Link to=" src/ app/ --include="*.tsx" --include="*.ts" | grep -v node_modules
```

Also search Hebrew navigation text:
```bash
grep -r "הפרק הבא\|הפרק הקודם\|Next Chapter\|Previous Chapter" src/ app/ --include="*.tsx" -l
```

## 2.3 — Cross-Reference

Compare route map vs link map:

- Route exists, never linked → 🟡 WARNING (orphan page — is it intentional?)
- Link exists, no route → 🔴 BLOCKER (broken link)

## 2.4 — Chapter Button Edge Cases

Find the Next/Previous Chapter component. Trace the logic:

| Case | Expected | Verify |
|------|----------|--------|
| First chapter | Previous hidden or disabled | ✓/✗ |
| Last chapter | Next hidden or disabled | ✓/✗ |
| Locked chapter | Not reachable via direct URL | ✓/✗ |
| Mid-navigation | Sidebar updates to match current page | ✓/✗ |

For locked chapters specifically: hiding a button is not enough. Confirm there is a route-level guard that blocks direct URL access. UI-only locking = 🔴 BLOCKER.

## 2.5 — Sidebar Sync

When the user navigates via Next/Previous buttons (not sidebar), does the sidebar active state update? Trace the state management. If sidebar can get out of sync with the URL → 🟡 WARNING.
