# Findings & Research

## Architectural Overview
The system is migrating from a fragmented ~30 component library to a strict 22 component library.

## The 5 Key Consolidations
1. **Definitions (3 → 2)**: `AcademicDefinition` (formal/blue) and `Definition` (simple/teal).
2. **Alerts (5 → 1)**: Unified `Alert` component with `variant="tip | warning | prerequisite"`.
3. **Exercises (3 → 3)**: Keep `CheckpointQuiz`, add `KnowledgeExam` for the end, enhance `GuidedExercise`.
4. **Narrative (2 → 3)**: Keep `Hook`, `Explanation`, `DeepDive`. Bring back `StreetSmart` (casual orange explanations).
5. **Summaries (2 → 1)**: Keep `NarrativeSummary`. Delete `TopicSummary`.

## Semantic Color System
- 🟢 **Fresh Emerald** (#059669): Alert (Tip)
- 🔵 **Sapphire Blue** (#1e40af): Academic Definition, Real-World Example, Explanation accent
- 🟪 **Vibrant Indigo** (#4f46e5): Hook gradient
- 🟦 **Slate Blue** (#475569): CheckpointQuiz, KnowledgeExam, GuidedExercise
- 🟠 **Warm Orange** (#f97316): StreetSmart (casual tone)
- 🟧 **Golden Amber** (#d97706): Alert (Warning)
- ⬜ **Cool Slate** (#6b7280): Alert (Prerequisite)
- 🔴 **Rose Red** (#dc2626): DeepDive (advanced)
- 🔗 **Teal** (#06b6d4): Definition (Simple)

## JSON Payload Migrations Required
```json
// Old Alert
{ "type": "callout", "variant": "tip", "content": "..." }
{ "type": "exam-tip", "importance": "high", "content": "..." }

// New Alert
{ "type": "alert", "variant": "tip", "content": "..." }
```
```json
// Old ToneBreak
{ "type": "tone-break", "content": "..." }

// New StreetSmart
{ "type": "street-smart", "title": "...", "content": "..." }
```
