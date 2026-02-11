---
description: Full protocol for building or rebuilding a Sikumnik chapter — from research to verified deployment
---

# /chapter-rehaul — Execution Protocol

## Skills & Files
`brainstorming` → Phase 0 | `ui-ux-pro-max` → design | `verification-before-completion` → QA | `dispatching-parallel-agents` → delegation
**Structure**: `src/types/{course}.ts` (contracts) | `globals.css` @theme (tokens)

> **Multi-Course**: This protocol applies to ALL courses (accounting, math, micro/macro-economics, probability, statistics, etc.). Replace "accounting" with the relevant course slug. JSON path: `src/data/{course}/chapters/`. Types path: `src/types/{course}.ts`. Route: `/courses/{course}/chapter-N`.

---

## Global Rules

### RTL + LaTeX Bidirectional Text
When mixing Hebrew with math formulas, text direction breaks. **Always**:
- Wrap Hebrew text in a `<span dir="rtl">` container
- Wrap LaTeX/math in a `<span dir="ltr" className="inline-block">` container
- Both sit inside a shared parent with `dir="rtl"` (default)
- Example pattern:
  ```
  <p dir="rtl">
    <span>המשוואה היא</span>
    <span dir="ltr" className="inline-block mx-1">$A = B + C$</span>
    <span>כאשר A הוא הסכום</span>
  </p>
  ```
- For block-level formulas, use a centered `<div dir="ltr">` inside the RTL flow
- **Test every formula** in the browser — direction bugs are invisible in code

### Handwriting Font Rule
`font-handwriting` (Playpen Sans Hebrew) = **only** where a student would physically write:
- Numbers inside balance sheet / P&L cells
- Exercise solutions (student's answer)
- Never for headings, body text, or explanations

### Design Research Directive
Don't default to the same layout for every chapter. **Before building each chapter**:
- `search_web` for design inspiration: "best educational UI", "interactive learning platform design", "dark theme course UI"
- Each topic benefits from unique visual treatment — probability uses animated dice, accounting uses ledger grids, economics uses supply-demand curves as visual motifs
- Study Brilliant.org, Khan Academy, 3Blue1Brown, Duolingo for interaction patterns
- Use `generate_image` to mock up new visual concepts before coding
- Iterate: propose → refine → build. Never copy-paste the same layout across chapters

---

## Phase 0 — Start Point

### What I Need From You
| Required | Optional |
|---|---|
| Course name + chapter number + Hebrew topic | Past exam files in a folder |
| Which concepts/topics belong in this chapter | Specific formatting requests |

### What I Do (Content Creation)
I **create** the content myself. I don't expect you to supply it.

**Research**: `search_web` for academic material — university syllabi, textbook explanations, professional standards. Cross-reference against your exam files to align with tested material and difficulty.

**Tag each piece**: `DEFINITION` / `RULE` / `FORMULA` → ConceptCard + CalculationBlock | `EXAMPLE` → JournalEntry or FinancialStatement | `EXERCISE` → InteractiveExercise | `PITFALL` → CommonMistakes block

---

## Phase 1 — Two Tones

### 🎓 Academic — "The Lecturer"
**Persona**: Serious Israeli college lecturer. Precise, proper terminology. Never dry.
- Proper Hebrew domain terms
- **Bold** = keywords in the sentence (not every word)
- `TermTooltip` = new lexicon terms needing explanation — unfamiliar professional concepts
- No English, no slang
- **Flow**: Problem → Definition → Rule → Formula → Example → Summary

**Design**: `font-main`, `text-foreground/90`, `border-r-8 border-primary/20`, teal `--color-primary`

### 🧡 Casual — "The Tel-Avivi"
**Persona**: Smart friend from Rothschild. Explains using daily-life scenarios.
- Opens with "דמיינו ש..." or "כמו ש..."
- **Domains**: שותפים בדירה, ביטוח רכב, חניות בת"א, ממשלה, טלוויזיה, חיי לילה, דייטים, בנות, ריאליטי, קפה, קניות
- `כמו` and `דמיינו` auto-colored `text-accent`

**Design**: `font-main font-black`, orange `--color-accent`, `bg-card/60 backdrop-blur-2xl`, Sparkles icon

---

## Phase 2 — Structure & Navigation

### Source of Truth
Structure: `src/types/{course}.ts` → `Chapter` → `Section` → `ContentBlock[]`
Data: `src/data/{course}/chapters/chapter-N.json`

### Tab Navigation
Chapters use **tabbed navigation** per topic, not long scroll. Each tab = one concept, self-contained with its own ConceptCard + CalculationBlock + exercises.

### Content Block Types

| Component | JSON `type` | Use When |
|---|---|---|
| `ConceptCard` | `"concept"` | Definitions, rules (`academic_text` + `analogy_text`) |
| `CalculationBlock` | `"calculation"` | Formulas, step-by-step breakdowns |
| `JournalEntry` | `"journal_entry"` | Debit/credit entries (accounting-specific) |
| `FinancialStatement` | `"calculation"` + `data.rows` | Tabular statements |
| `InteractiveExercise` | `exercises[]` | Practice questions |
| **`CommonMistakes`** | `"pitfalls"` | ⚠️ Tips, common errors, pitfall warnings |

### Common Mistakes / Tips / Pitfalls Block
A dedicated content block for each chapter section. Contains:
- **טעויות נפוצות** — mistakes students frequently make
- **טיפים** — pro tips for exams and understanding
- **מלכודות** — subtle pitfalls that look correct but aren't
- Placed **after** the concept explanation, **before** exercises
- Design: warning-styled glass card with `⚠️` icon, `border-r-8 border-error/30`
- Each item is a short, punchy statement — not a paragraph

---

## Phase 3 — Interactive Components Catalog

### Assessment Components
| Type | Use Case |
|---|---|
| **Multiple Choice** | Quick concept checks between explanations |
| **Fill-in-the-Blank** | Formula memorization ("נכסים = ___ + ___") |
| **Drag & Drop Sort** | Classify items into categories |
| **Matching Pairs** | Connect term ↔ definition |
| **True/False** | Common misconceptions check |

### Visual/Demonstration Components
| Type | Use Case |
|---|---|
| **Balance Visualizer** | Animated scale showing debit=credit |
| **Flow Diagram** | Money/data flow between accounts/nodes |
| **Before/After Toggle** | State change visualization |
| **Flashcard Deck** | End-of-chapter term review |
| **Step Stepper** | Walk through calculation one step at a time |

### Micro-Interactions (Between Explanations)
- "Quick check" — single question after a ConceptCard
- "Guess the result" — predict outcome before revealing
- "Spot the error" — find the mistake
- "Which one?" — tap the correct category/account/answer

---

## Phase 4 — Agent Delegation

Leverage `dispatching-parallel-agents` to run independent tasks simultaneously:

| Agent Role | Tasks | Runs In Parallel |
|---|---|---|
| **Content Researcher** | `search_web` for academic material, read exam files | Yes — with Design |
| **Design Scout** | `search_web` for visual inspiration, `generate_image` mockups | Yes — with Content |
| **Content Writer** | Academic pass → Casual pass → Pitfalls pass | Sequential |
| **Exercise Builder** | Build interactive components, micro-interactions | After content |
| **Coder** | Wire `page.tsx`, tab navigation, new components | After content + design |
| **QA Auditor** | `npm test`, `npx next build`, browser check, self-audit | Last |

**Self-Audit Rule**: After completing a chapter, re-read the entire output as a student. Ask: "Would I understand this? Is anything confusing? Is anything missing?" If unclear → ask the user before shipping.

---

## Phase 5 — Execution Priority

1. **Research** — `search_web` for academic material + review exam files
2. **JSON data** — skeleton: `title`, `summary`, `pageMap`, `sections[]`, `exercises[]`
3. **Academic pass** — All `academic_text`, formulas, data
4. **Casual pass** — All `analogy_text` and `analogy_note`
5. **Pitfalls pass** — Common mistakes block for each section
6. **Interactive elements** — Exercises + micro-interactions between content
7. **`page.tsx`** — Wire components, tab navigation
8. **`layout.tsx`** — SEO metadata
9. **Visual QA** — Browser check desktop + mobile, RTL + LaTeX direction

---

## Phase 6 — Robust Visual Audit

Testing is a **full-page visual audit**, not just code checks. Method:

### Step 1: Build Check
- `npx next build` — catches compile errors, missing imports, type mismatches
- `npm test` — schema validation, metadata, utilities

### Step 2: Visual Audit via Browser
Use `browser_subagent` to navigate every page of the chapter at **desktop (1440px)** and **mobile (375px)**:
- Screenshot every tab/section
- Analyze each screenshot for:

**Code Bugs**: Missing content blocks, render errors, broken components, empty sections, JS console errors

**Design Issues**:
- Text not rendering or invisible (low opacity on dark bg)
- Bad contrast ratios (WCAG AA: 4.5:1 minimum for body text)
- Text overflow / truncation in RTL
- Inconsistent spacing between blocks
- Misaligned elements in glassmorphism cards
- LaTeX formulas going wrong direction
- Handwriting font appearing in wrong places

**Design Recommendations**:
- Color harmony — verify teal academic + orange casual don't clash in adjacent blocks
- Glassmorphism consistency — backdrop-blur levels match across cards
- Animation smoothness — hover/entry transitions feel polished, not janky
- Typography hierarchy — headings > body > captions visually distinct
- Whitespace balance — not too cramped, not too sparse
- Mobile touch targets ≥ 44px for interactive elements

### Step 3: Fix & Re-check
Any issue found → fix immediately → re-screenshot → confirm resolved.
Design recommendations → log for user review, don't auto-apply subjective changes.

### Content Checklist (Quick)
```
SCHEMA:  Required fields present, type discriminants correct, no English ✓
ACADEMIC: ≥2 sentences/concept, standard terms, formulas complete ✓
CASUAL:  Analogy on every concept, Israeli references, adds NEW understanding ✓
PITFALLS: Common mistakes block per section ✓
DIRECTION: RTL correct, LaTeX formulas render properly ✓
```

