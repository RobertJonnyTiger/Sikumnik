# Agent Rules

## BROWSER SUBAGENT — HARD RULES

The "Browser Subagent" = any tool or bash command that opens a browser,
takes screenshots, or runs Playwright.

1. Invoke ONCE per task — only after code is written, never repeatedly
2. ONE specific goal — no vague "check the page" requests
3. STOP after result — do not invoke again unless it explicitly failed
4. Report errors, NO retry — if any browser/capture error occurs, report to user
5. Max 2 screenshots — if 2 screenshots with no code change between them, STOP

## LOOP KILL SWITCH
If you find yourself writing the same browser command more than once
in the same task — STOP. You are in a loop. Report to the user instead.
```

---

**FILE 2: A reusable snippet you paste into every browser goal**
This controls the **browser subagent directly** — paste it at the end of every goal you give it:
```
---
HARD LIMIT FOR THIS TASK:
- Take exactly 1 screenshot
- Then immediately write your final report in this format:
  "DONE ✅ / FAILED ❌ — [one sentence of what you saw]"
- After writing DONE or FAILED — stop completely
- No more scrolling, navigating, or screenshots after that line
---

## NOTEBOOKLM MCP RULES

1. Query ONCE per topic — send one well-formed question, accept the answer
2. NEVER query the same topic twice — if the answer is incomplete, use what you got
   and fill the rest with your own knowledge of the subject
3. Max 3 NotebookLM queries per task total — after that, stop querying and proceed
4. If NotebookLM returns a short or vague answer — that's fine, supplement it
   with your own knowledge. You are an AI trained on this material already.
5. Never retry a failed or incomplete query — move forward with what you have

## IMPORTANT
You already know Blake & Mouton, Fiedler, Adizes, and Hersey & Blanchard.
You do not need NotebookLM to define standard B.Sc Organizational Behavior models.
Use NotebookLM ONLY for course-specific content like exam questions, 
professor's specific framing, or unique examples from the slides.