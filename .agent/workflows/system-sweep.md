---
description: "The official protocol for refactoring and standardizing a component into the 'Prime State'."
---

# The System Sweep Protocol (`/system-sweep`)

Use this workflow when auditing, refactoring, or rebuilding a component to meet the "Antigravity" Gold Standard.

## 1. 🔍 The Audit (Architect Mode)
**Agent**: `@architect`
**Command**: `view_file [component_path]`

1.  **Analyze Dependencies**: Does it import from `_legacy`, `../legacy`, or unrelated folders?
2.  **Check Props**: Are props strictly typed? (No `any`).
3.  **Check Styling**: Is it using Tailwind utility classes exclusively? (No `style={{...}}`).
4.  **Check Client/Server**: Does it have `"use client"` if it uses hooks?

## 2. 🛠️ The Forge (Frontend Specialist Mode)
**Agent**: `@frontend-specialist`
**Skills**: `react-components`, `tailwind-design-system`

1.  **Isolate**: If it's a legacy component, create a NEW version in `src/components/core/molecules/[Name].tsx`.
2.  **Standardize**:
    - Use `lucide-react` for icons.
    - Use `framer-motion` for interactions.
    - Apply "Glassmorphism" tokens (`backdrop-blur-md`, `bg-white/10`).
3.  **Refactor**:
    - Extract logic to hooks if > 50 lines of logic.
    - Ensure accessibility (ARIA labels).

## 3. 🔌 The Integration (Builder Mode)
**Agent**: `@builder`

1.  **Update Template**: Modify `MasterChapterTemplate` to import the NEW component.
2.  **Update Export**: Ensure it's exported from `src/components/core/index.ts` (if applicable).
3.  **Deprecate Old**: Rename the old file to `[Name].legacy.tsx` or move to `_legacy/`.

## 4. ✅ The Verification (Auditor Mode)
**Agent**: `@auditor`
**Skills**: `playwright`

1.  **Build**: Run `npm run build` to ensure no extensive breaking changes.
2.  **Visual Check**: Verify the component renders in the browser.
3.  **Responsiveness**: Check mobile view (375px width).

---
*Execute this loop for every component in the system.*
