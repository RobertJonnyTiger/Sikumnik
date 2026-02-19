# Phase 7 — Test Suite

## 7.1 — Run Playwright

```bash
npx playwright test
```

Report pass/fail for every test. Any failing test = 🔴 BLOCKER before deployment.

If results exist in `test-results/`, read and summarize them.

## 7.2 — Coverage Assessment

```bash
find tests/ -name "*.spec.*" -o -name "*.test.*" | sort
```

For each test file, note what it covers. Then check for gaps:

| Critical path | Tested? |
|---|---|
| Sidebar navigation to each course | ✓/✗ |
| Next/Previous chapter buttons | ✓/✗ |
| First chapter (no Previous) | ✓/✗ |
| Last chapter (no Next) | ✓/✗ |
| Answer before reasoning hidden | ✓/✗ |
| Answer submitted, reasoning shown | ✓/✗ |
| Locked course blocked via direct URL | ✓/✗ |
| AI chat sends and receives | ✓/✗ |

Any untested critical path = 🔵 SUGGESTION (note it for the next session).
