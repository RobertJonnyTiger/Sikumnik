# 📘 THE SIKUMNIK CONTENT CREATION PROTOCOL
*Version: 1.0.0 | Status: Active | Scope: Course Architecture & Pedagogy*

This document serves as the **Master Constitution** for transforming raw, chaotic university materials into the premium, tightly structured "Sikumnik Experience." Every AI agent, content writer, and educator operating within this project must strictly enforce these laws.

---

## 🎯 1. THE TEACHING PHILOSOPHY (The "Sikumnik Method")

Academic material is inherently dry, theoretical, and exhausting. Our product's primary value proposition is **Cognitive Optimization**—saving the student time by increasing retention velocity.

### The 4 Pillars of Sikumnik Pedagogy:
1. **The "Why" First (Relevance):** Never start a chapter with a definition. Start with a real-world problem that makes the definition necessary. If teaching "Price Elasticity," don't start with the formula; start with why Apple can charge $1,200 for an iPhone but a farmer can't charge $5 for an apple.
2. **Translate to "Street Smart" (דוגרי):** Academic rigor is mandatory for exams, but comprehension happens in natural language. Every complex formal definition must be immediately followed by a "Dugri" translation.
3. **The "80/20" Exam Filter:** We teach for mastery *of the exam*. If a historical footnote or academic debate has never appeared on a syllabus or past final exam, **it is banned from the primary chapter flow**.
4. **Active Validation over Passive Reading:** A student should never read more than 3 continuous paragraphs without being forced to interact, calculate, or answer a question.

---

## 🏭 2. THE MATERIAL INGESTION PIPELINE

Do not manually write chapters from memory. We use an "Assembly Line" ingestion process to guarantee zero hallucination and 100% syllabus alignment.

### Step 2.1: The Raw Gathering
*   **Location:** `input_materials/{course_name}/`
*   **Assets Needed:** PDF Syllabi, PowerPoint lectures, Professor's summary sheets, and *critically*, the last 3 years of Final Exams.

### Step 2.2: The "NotebookLM Brain"
*   **Action:** Upload the entire `input_materials` folder for a specific course into a dedicated Google NotebookLM project.
*   **Purpose:** NotebookLM becomes the "Source of Truth." When drafting, we query NotebookLM to synthesize the exact scope of a topic.

### Step 2.3: The Syllabus Extraction
*   Ask NotebookLM: *"Based on the syllabus and past exams, extract the 5 absolute most important learning objectives for Chapter X."* These 5 objectives dictate the chapter outline.

---

## 📐 3. CHAPTER ARCHITECTURE & RHYTHM (THE EXACT SCHEMA)

A Sikumnik JSON Chapter is not an essay; it is a **choregraphed sequence of UI blocks**. You have exactly 20 strictly typed `ContentBlock` components to build the experience.

### The Opening (The Hook)
*   `alert` *(variant: prerequisite)*: If they must know a previous formula, state it here.
*   `hook`: A visually distinct, gradient-backed component posing a real-world paradox or dilemma to wake up the student's brain.
*   *Threshold:* The opening should take no more than 60 seconds to read.

### The Core Delivery (Theory + "Dugri")
Structured as tightly coupled "Triplets" or sequences:
1.  **The Delivery:** An `explanation`, `analogy`, or `example` block (max 3 short paragraphs).
2.  **The Formalization:** A `definition` (academic) or a `formula` (isolated, pure LaTeX).
3.  **The Translation:** A `street-smart` or `real-world-example` block summarizing the theory in casual, relatable language.

### Supporting Blocks & Visuals
*   `image`: For diagrams and visual aids over text.
*   `list`: For bulleted enumerations of properties or features.
*   `interactive` / Custom UI: For domain-specific interactive models (e.g., `maslow-pyramid`, `attribution-flowchart`, `diagnostic-case-study`, `situational-leadership-guide`).
*   `deep-dive`: For historical footnotes or nice-to-have "interesting facts" that should be hidden from the critical reading path inside an accordion.

### The Checkpoints (Cognitive Relief & Validation)
Every time a heavy theoretical concept is concluded, you must break the text wall:
*   `alert` *(variant: tip)*: Provide a shortcut or an examiner's "trap" often seen on tests.
*   `checkpoint`: A 1-to-2 question interactive block. The student must actively recall the concept immediately.

### The Action (Math & Logic)
If the chapter involves calculations (Economics, Accounting):
*   Use `guided-exercise`.
*   Follow the exact phases: `i-do` (Professor shows), `we-do` (Step-by-step logic), `you-do` (The calculation).

### The Capstone (Final Exam)
*   `exam-questions`: Every single chapter **must** end with a multi-question exam block. These questions should mirror the difficulty of the actual university final exams found in NotebookLM.

---

## ⚖️ 4. SCOPE THRESHOLDS: WHEN IS IT "ENOUGH"?

One of the hardest product decisions is knowing when to stop writing. Use these strict thresholds:

### The "5/5 Capstone Rule"
**When is the content enough?** 
A chapter is perfectly scoped if an intelligent student who knew absolutely nothing 20 minutes ago can score 5/5 on the final `exam-questions`, using *only* the mechanics taught in the chapter. If they have to guess, or Google a term, your content failed.

### The "Scroll Fatigue" Limit (When to Split)
*   **JSON Block Limit:** A chapter should ideally contain between **10 to 18 major UI blocks**.
*   **Reading Time Limit:** The estimated completion time for reading and interacting should be **15 to 25 minutes**.
*   **Action:** If a topic requires 25+ blocks (e.g., "Market Structures: Monopoly, Oligopoly, Perfect Competition"), **do not build a mega-chapter**. You must split it into granular sub-chapters (Chapter 5a: Perfect Competition, Chapter 5b: Monopoly).

### The "Nice-to-Have" Purge
*   If an explanation block contains the phrase *"It is interesting to note that..."* or *"Historically..."*, delete it. Shift it into a `deep-dive` accordion component so the student can optionally click it, hiding it from the critical reading path.

---

## 🔍 5. THE FINAL QA AUDIT

Before publishing a `chapter-X.json` file to production, run this mental audit:

1.  **The "Wall of Text" Check:** Are there more than 3 `explanation` blocks in a row without visual interruption (an image, a tip, a quiz)? If yes, break it up.
2.  **The LaTeX Check:** Are all mathematical formulas isolated in `formula` or correctly delimited with `$$` for KaTeX rendering? No inline math that breaks line-heights.
3.  **The "Dugri" Check:** Is every complex academic `definition` paired with a human-readable `street-smart` translation?
4.  **The Sad Path:** Are the wrong answers in the `exam-questions` components providing actionable feedback (`explanation`), or just saying "Wrong"? Every mistake is a teaching opportunity.
