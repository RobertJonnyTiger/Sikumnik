# Component Gap Analysis

## Overview
Mapping `course-structure.md` (CS) sections to `components-catalog.md` (CC) components.

| CS Section | Required Component | Status in CC | Action |
| :--- | :--- | :--- | :--- |
| **[1] Page Map** | `PageMap` | ❌ Missing | **Create** |
| **[2] Introduction** | `Introduction` or `MarkdownBlock` | ❌ Missing | **Create** |
| **[3] Teaser Analogy** | `TeaserAnalogy` | ❌ Missing (Suggested: `ConceptCard` variation) | **Create/Adapt** |
| **[4] Formal Definitions** | `ConceptCard` or `DefinitionBlock` | ✅ `ConceptCard` semi-fits | **Refine** |
| **[5] Tone Break** | `ToneBreak` | ❌ Missing | **Create** |
| **[6] Deep Dive** | `DeepDive` (Complex Layout) | ❌ Missing | **Create** |
| **[7] Common Mistakes** | `CommonMistakes` | ❌ Missing | **Create** |
| **[8] Interactive Element** | `InteractiveWrapper` | ❓ Generic | **Standardize** |
| **[9] Checkpoint** | `CheckpointQuiz` | ❌ Missing | **Create** |
| **[10] Street Summary** | `StreetSummary` | ❌ Missing | **Create** |
| **[11] Guided Exercises** | `GuidedExercise` | ❌ Missing (`InteractiveExercise` too basic) | **Create** |
| **[12] Independent Exercises** | `IndependentExercise` | ❌ Missing | **Create** |
| **[13] Reference Card** | `QuickReferenceCard` | ❌ Missing | **Create** |
| **[14] Trivia** | `TriviaCard` | ❌ Missing | **Create** |
| **[15] Bridge** | `ChapterBridge` | ❌ Missing | **Create** |

## Shared Primitives Needed
- `SectionWrapper`: Standard padding, headers, anchors.
- `Tooltip`: For definitions.
- `Collapse`: For exercises/answers.
- `LatexRenderer`: For math.

## Conclusion
Most structural components are **MISSING**. The "Golden Prototype" will require building ~12 new components.
