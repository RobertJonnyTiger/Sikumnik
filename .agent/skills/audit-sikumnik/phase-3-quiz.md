# Phase 3 — Course Logic & Quiz Behavior

## 3.1 — Answer-Before-Reasoning Rule

**The reasoning/explanation must NEVER appear before the user submits an answer.**

Find every component that renders reasoning, explanation, or feedback. For each:

1. What state variable gates visibility?
2. What is the initial value of that variable?
3. Is there any code path where reasoning renders on first load?

Initial render with reasoning visible = 🔴 BLOCKER.

Also check: after page refresh following a correct answer, does the reasoning correctly reappear (persisted state) or vanish (lost state)? Lost state = 🟡 WARNING.

## 3.2 — Multiple Choice State Machine

Trace the full lifecycle for a multiple choice question:

```
unselected → selected → submitted → result shown
```

Verify each transition:
- Can the user change their selection before submitting? (should be yes)
- After submission, is re-selection blocked? (should be yes)
- Are correct/incorrect styles mutually exclusive? (both showing at once = 🔴 BLOCKER)
- Does an unanswered submission attempt do something sensible?

## 3.3 — Course Locking

```bash
grep -r "locked\|isLocked\|lock" src/ app/ --include="*.tsx" --include="*.ts" -l
```

For each locked course/chapter:
- Visual state: grayed out? ✓/✗
- UI guard: button/link disabled? ✓/✗
- Route guard: direct URL blocked? ✓/✗ (UI-only = 🔴 BLOCKER)

Confirm "תנהגות ארגונית" is correctly unlocked and navigable end-to-end.
