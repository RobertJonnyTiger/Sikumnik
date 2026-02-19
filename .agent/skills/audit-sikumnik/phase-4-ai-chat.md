# Phase 4 — AI Chat Bubble (Google Generative AI)

## 4.1 — Model Version

```bash
grep -r "gemini" src/ app/ --include="*.ts" --include="*.tsx" | grep -v node_modules
```

Must reference `gemini-2.5` (or current configured model). Any reference to `gemini-1.5` → 🟡 WARNING (stale model string).

## 4.2 — Key Location

Find the API route or server action calling Google Generative AI. Confirm:
- Key read from `process.env.GOOGLE_GENERATIVE_AI_API_KEY`
- NOT from any `NEXT_PUBLIC_*` variable
- File is under `app/api/` (server-side) NOT in a client component

Client-side key usage = 🔴 BLOCKER.

## 4.3 — Error Handling

Does the API call have a `try/catch`?

| Failure case | What the UI shows | Acceptable? |
|---|---|---|
| Network error | ? | Must show something |
| API quota exceeded | ? | Must show something |
| Malformed response | ? | Must not crash page |

Silent failure or page crash = 🔴 BLOCKER. Blank state with no message = 🟡 WARNING.

## 4.4 — UX During Generation

- Loading indicator while generating? If no → 🟡 WARNING
- Send button disabled during generation? If no → 🟡 WARNING (double-send risk)
- Can the user send an empty message? If yes → 🟡 WARNING
