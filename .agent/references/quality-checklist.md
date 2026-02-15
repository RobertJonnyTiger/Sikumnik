
---

### 5. `references/quality-checklist.md` — TDD Style

```markdown
# Quality Checklist — TDD for Chapters

Before delivering a chapter, run through this checklist.
Every item must pass. If one fails, fix before delivery.

---

## Structure Tests

- [ ] All 15 sections present
- [ ] Sections in correct order (1-15)
- [ ] No sections merged
- [ ] No extra sections added

---

## Content Tests

### Section [1] Page Map
- [ ] Breadcrumb present
- [ ] Progress indicator present
- [ ] 3-5 learning objectives
- [ ] Prerequisites listed (or "none" stated)

### Section [2] Introduction
- [ ] 2+ paragraphs
- [ ] Explains what chapter covers
- [ ] Explains why it matters

### Section [3] Teaser Analogy
- [ ] Single paragraph
- [ ] Tel Aviv student life reference
- [ ] Ends with transition to formal

### Section [4] Formal Definitions
- [ ] Academic tone (no slang, no emojis)
- [ ] All key terms defined
- [ ] Tooltips on first appearance of new terms
- [ ] Proper notation

### Section [5] Tone Break
- [ ] Correct opener (odd/even alternation)
- [ ] Re-explains section [4] concepts
- [ ] Casual language used
- [ ] Actually understandable to non-student

### Section [6] Deep Dive
- [ ] 3+ examples present
- [ ] Examples progress simple → complex
- [ ] "How this appears on exams" section present
- [ ] Connections to previous chapters

### Section [7] Common Mistakes
- [ ] 3-5 mistakes listed
- [ ] Each has: mistake / correct / why

### Section [8] Interactive Element
- [ ] One type only
- [ ] Appropriate for the topic
- [ ] Actually interactive (not just text)

### Section [9] Checkpoint
- [ ] Exactly 2 questions
- [ ] Answers are collapsible
- [ ] Explanations provided

### Section [10] Street Summary
- [ ] Summarizes full chapter
- [ ] Uses extended analogy
- [ ] Casual tone

### Section [11] Guided Exercises
- [ ] 2-3 exercises
- [ ] Difficulty ratings present (⭐)
- [ ] Step-by-step solutions
- [ ] Each step has: what/why/calc/result

### Section [12] Independent Exercises
- [ ] 2-3 exercises
- [ ] At least one ⭐⭐⭐+
- [ ] Hints present (collapsible)
- [ ] Answers only, no full solutions

### Section [13] Quick Reference
- [ ] All formulas from chapter
- [ ] All definitions (one-line)
- [ ] Scannable format

### Section [14] Trivia
- [ ] 1-2 fun facts
- [ ] Not study material
- [ ] Actually interesting

### Section [15] Bridge
- [ ] Links to next chapter
- [ ] Creates curiosity
- [ ] (or wrap-up if last chapter)

---

## Tone Tests

- [ ] Sections 4, 6, 7, 13: NO emojis, NO slang
- [ ] Sections 3, 5, 10: Casual Hebrew, analogies present
- [ ] No tone mixing within any section

---

## Technical Tests

- [ ] JSON validates against schema
- [ ] All tooltips are first-appearance only
- [ ] All collapsibles properly marked
- [ ] All exercise difficulty ratings present
- [ ] Hebrew RTL correct
- [ ] Links to previous chapters work (IDs correct)

---

## Preservation Tests

- [ ] Existing good content preserved
- [ ] Existing content reorganized (not deleted)
- [ ] No duplicate information
- [ ] No contradictions with previous chapters

## Pre-Delivery Checks

- [ ] grep for hardcoded colors (no #ffffff, #000000, etc.)
- [ ] grep for hardcoded fonts (no font-family inline)
- [ ] grep for old font names (Varela, etc.)
- [ ] visual check: all text readable on all backgrounds
- [ ] visual check: correct font in correct places