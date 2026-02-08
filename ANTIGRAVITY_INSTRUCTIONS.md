# Antigravity Instruction Prompt: Dual Stitch Execution

**Role:**
You are a Senior Autonomous Developer specializing in the "Stitch Stack" (Stitch MCP + `stitch-loop` skill).

**Objective:**
Execute two parallel development streams to build the "Sikumnik" platform. You must use the `stitch-loop` skill to iteratively generate and refine the web application.

**Context:**
"Sikumnik" is a "Sanctuary of Knowledge" for students, translating academic chaos into organized, relatable "street" language (Tel Aviv style). All content must be in **Hebrew** and **RTL**.
Refer to `README.md` for the full project vision.

---

## Execution Plan (Dual Track)

You are to execute the following two tracks. You can switch between them or run them sequentially, but both must be advanced.

### 🏛️ Track 1: The Existing Project ("Sikumnik")
**Goal:** Refine the existing codebase/project to match the new "Academic to Street" philosophy.

**Instructions:**
1.  **Locate Project:** Search for an existing `stitch.json` or list projects to find "Sikumnik".
2.  **Initialize Loop:** Create a `next-prompt.md` file with the **Refinement Prompt** (see below).
3.  **Run Skill:** Execute the `stitch-loop` skill to apply the changes.

**Baton Prompt (for `next-prompt.md`):**
```markdown
---
page: landing_refinement
---
**Role:** Product Manager & Cultural Translator.
**Objective:** Refine the existing Landing Page to embody the "Sikumnik" vibe.
**Details:**
-   **Language:** #Hebrew #RTL.
-   **Concept:** "Sanctuary of Knowledge."
-   **Action:** Transform the current design. Use the `README.md` principles (Simplicity, Analogies).
-   **Design:** Full creative authority. Make it dark, modern, and accessible.
```

---

### 🏗️ Track 2: The New Build ("Sikumnik 2.0")
**Goal:** Build a clean slate version from scratch to compare approaches.

**Instructions:**
1.  **Create Project:** Use `stitch_create_project` to make a new project named "Sikumnik V2".
2.  **Initialize Loop:** Create a different baton file (e.g., `next-prompt-v2.md`) or overwrite `next-prompt.md` after Track 1 is stable.
3.  **Run Skill:** Execute the `stitch-loop` skill to generate the initial structure.

**Baton Prompt (for `next-prompt.md`):**
```markdown
---
page: index
---
**Role:** Lead Architect.
**Objective:** Initialize "Sikumnik V2" from scratch.
**Details:**
-   **Language:** #Hebrew #RTL.
-   **Structure:** Landing Page + Navigation (Courses, Chapters).
-   **Content:** Use `README.md` as the source of truth for the "Why" and "How."
-   **Design:** Modern, clean, "Temple of Information."
```

---

## 🛠️ Critical Rules for the Agent
1.  **Use the `stitch-loop` Skill:** Do not just write code manually. Use the skill found in `SKILLS/stitch-loop/SKILL.md`.
2.  **Read the README:** The `README.md` file contains the soul of the project. Read it before generating anything.
3.  **Hebrew & RTL:** Ensure EVERY prompt you send to Stitch explicitly demands Hebrew content and Right-to-Left layout.
