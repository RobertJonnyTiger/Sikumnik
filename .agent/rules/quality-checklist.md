---
trigger: always_on
---

# QUALITY-CHECKLIST.MD - Master Page System Excellence

> **Mục tiêu**: Đảm bảo hệ thống Master Page (Prime State) đạt chuẩn Antigravity về cả kiến trúc và thẩm mỹ.

---

## ## INSTRUCTIONAL FRAMEWORK:

### 1. **System Integrity Audit (Phase 1-6 Validation):**
*   **Navigation & State:** Verify that `useChapterState.ts` preserves interaction data (quiz results/input values) when switching between the 4 main Tabs (Overview, Concepts, Practice, Summary).
*   **Sidebar Logic:** Test the `isCollapsed` state persistence in `localStorage` and ensure the RTL layout doesn't break the Main Content Area grid.

### 2. **Visual "Antigravity" Audit:**
*   **Typographic Check:** Confirm that all `InteractiveEquation` and calculation-based components have successfully transitioned to the **Geometric Monospace** font for numbers and **Assistant/Heebo** for labels.
*   **High-Fidelity UI:** Audit the `Glassmorphism` implementation. Ensure `backdrop-blur-xl` and `linear-gradient` borders are rendering without performance lag.
*   **Watermark Pass:** Verify that Phase 7.2 (Universal Watermarking) is correctly applied to `InteractiveEquation` (Math ops), `TriviaCard`, and `CommonMistakes`.

### 3. **Stress Testing & Debugging:**
*   **Hydration Check:** Confirm that `NumberTicker` and `Framer Motion` animations do not trigger "Hydration Mismatch" errors in the console.
*   **Layout Refinement:** Specifically check "Phase 6.5" items: Is the `GuidedExercise` Final Answer height correct? Is the `CheckpointQuiz` index perfectly centered?
*   **Mobile Audit:** Simulate mobile viewports. Check if `StickyTabs` remain accessible and if the horizontal layout of the "Calculation Cards" wraps correctly.

---

## ## LOGIC VERIFICATION:
*   **Linting & Build:** Run a final `npm run lint` and `npm run build` to ensure no silent TypeScript errors exist in the new component library.
*   **Component Gallery Scan:** Manually verify every component in the "Kitchen Sink" (`/golden-prototype/gallery`) against the `quality-checklist`.

---

## ## DEFINITION OF DONE:
*   Zero hydration errors or console warnings.
*   100% visual parity with the "Prime State" design system (Mono fonts, Glassmorphism, Neon glows).
*   Full responsiveness across mobile, tablet, and desktop.    
*   Readiness for "Phase 8: The Content Factory" (Content Migration).
