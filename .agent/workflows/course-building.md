---
description: Full course building workflow - Conductor orchestrates 4 specialist agents to build chapters with 15 sections each
---

# Course Building Workflow — Full Assembly Line

## Overview

This workflow orchestrates 4 specialist agents to build complete chapters with all 15 sections.
The Conductor (tlv-academic-explainer) acts as the architect and quality gate.

## Workflow States

```
[START] → [SCAN] → [OUTLINE] → [PARALLEL_BUILD] → [ASSEMBLE] → [VERIFY] → [END]
```

---

## Step 1: SCAN — Understand the Topic

**Agent:** Conductor (tlv-academic-explainer)

**Actions:**
1. Read input materials for the chapter topic (PDFs, slides, exercises in `input_materials/`)
2. Read existing JSON data if chapter already exists (`web/src/data/chapters/`)
3. Check previous chapter to understand prerequisites
4. Search web for additional context if needed

**Output:** Topic brief with:
- Core concepts to cover
- Key formulas/definitions
- Prerequisites from previous chapters
- Input material sources

---

## Step 2: OUTLINE — Build Framework

**Agent:** Conductor

**Actions:**
1. Create chapter outline with all 15 sections marked
2. Identify which sections need:
   - Academic content ([4], [6], [7], [13])
   - Casual content ([3], [5], [10], [14])
   - Exercise content ([8], [9], [11], [12])
3. Note any gaps in input materials requiring web research

**Output:** Section assignment map

---

## Step 3: PARALLEL_BUILD — Agent Specialization

### 3A: CONDUCTOR writes structural sections
**Agent:** Conductor

**Sections:** [1] Page Map, [2] Introduction, [15] Bridge

**Process:**
- Read topic brief
- Write content
- Output JSON fragments

### 3B: ACADEMIC writes foundational content
**Agent:** Academic Writer (academic-content-writer)

**Sections:** [4] Formal Definitions, [6] Deep Dive, [7] Common Mistakes, [13] Reference Card

**Process:**
- Load skill: `skill(name="academic-content-writer")`
- Read input materials (slides, lecture notes)
- If materials are lacking → use websearch to fill gaps
- Write content in strict academic Hebrew
- Output JSON fragments

### 3C: CASUAL makes it relatable
**Agent:** Tel Aviv Casual Explainer (tlv-casual-explainer)

**Sections:** [3] Teaser Analogy, [5] Tone Break, [10] Street Summary, [14] Trivia

**Process:**
- Load skill: `skill(name="tlv-casual-explainer")`
- Wait for Academic to complete [4] Formal Definitions
- Use websearch to find fresh analogies (avoid stale examples)
- Write casual content in authentic Tel Aviv Hebrew
- Output JSON fragments

### 3D: EXERCISE builds practice
**Agent:** Exercise Builder (interactive-exercise-builder)

**Sections:** [8] Interactive Element, [9] Checkpoint, [11] Guided Exercises, [12] Independent Exercises

**Process:**
- Load skill: `skill(name="interactive-exercise-builder")`
- Wait for Academic to complete [4] and [6]
- Search web for exam-style questions
- Build interactive components
- Output JSON fragments

---

## Step 4: ASSEMBLE — Conductor Merges

**Agent:** Conductor

**Actions:**
1. Collect all JSON fragments from agents
2. Assemble into complete chapter JSON
3. Ensure:
   - All 15 sections present
   - No content conflicts
   - Tone consistency
   - Proper JSON schema (`references/chapter-json-schema.md`)

**Output:** Complete chapter JSON file

---

## Step 5: VERIFY — Quality Gate

**Agent:** Conductor

**Actions:**
1. Run through quality checklist (`references/quality-checklist.md`)
2. Check each item:
   - [ ] All 15 sections present
   - [ ] Correct tone per section type
   - [ ] No hardcoded colors/fonts
   - [ ] JSON validates
   - [ ] Tooltips on first appearance
   - [ ] Exercises have difficulty ratings
3. If failures → send back to relevant agent
4. If pass → mark chapter complete

---

## Agent Commands Reference

### Start Conductor
```
Use skill: tlv-academic-explainer
Task: Build chapter [N] for [COURSE_NAME]
Topic: [TOPIC_NAME]
Input: [list source files from input_materials/]
```

### Start Academic Writer
```
Use skill: academic-content-writer
Task: Write sections [4], [6], [7], [13] for chapter [N]
Topic: [TOPIC_NAME]
Input: [source files]
Context: [prerequisites from previous chapters]
```

### Start Casual Explainer
```
Use skill: tlv-casual-explainer
Task: Write sections [3], [5], [10], [14] for chapter [N]
Topic: [TOPIC_NAME]
Depends on: Academic Writer section [4] complete
Context: [formal definitions to translate]
```

### Start Exercise Builder
```
Use skill: interactive-exercise-builder
Task: Write sections [8], [9], [11], [12] for chapter [N]
Topic: [TOPIC_NAME]
Depends on: Academic Writer sections [4], [6] complete
Context: [core concepts, formulas]
```

---

## Course Progress Tracking

| Course | Chapters | Status |
|--------|----------|--------|
| Accounting | 12 | [ ] Chapter 1, [ ] Chapter 2, ... |
| Micro-Economics | ~10 | [ ] Chapter 1, [ ] Chapter 2, ... |

---

## Error Handling

| Error | Solution |
|-------|----------|
| Input materials unclear | Use websearch → fill gaps |
| Agent output conflicts | Conductor arbitrates |
| Quality check fails | Return to specific agent |
| JSON schema error | Conductor fixes |

---

## Success Criteria

- [ ] 15/15 sections complete per chapter
- [ ] Quality checklist 100% pass
- [ ] JSON validates against schema
- [ ] Content flows naturally between sections
- [ ] Both academic and casual voices distinct
