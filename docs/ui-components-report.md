# UI Components Report for Sikumnik Lessons & Chapters

## Overview

This report catalogs all unique UI component templates used in the Sikumnik Hebrew education platform for university-level economics and accounting courses.

## Summary

- **Total unique component templates**: 28
- **Currently used in chapters**: 20 components (71%)
- **Unused/available**: 8 components (29%)
- **Total blocks in current chapters**: 299

---

## Components by Category

### 1. Lobby / Chapter Pages (6 components)

| Component | Path | Used |
|-----------|------|------|
| ChapterLanding | `features/core-lessons/renderers/ChapterLanding.tsx` | Yes |
| ChapterTemplate | `features/core-lessons/renderers/ChapterTemplate.tsx` | Yes |
| ChapterProgressionBar | `features/core-lessons/renderers/ChapterProgressionBar.tsx` | Yes |
| CourseBreadcrumb | `features/core-lessons/renderers/CourseBreadcrumb.tsx` | Yes |
| LessonFooter | `features/core-lessons/renderers/LessonFooter.tsx` | Yes |
| TopicTab | `features/core-lessons/renderers/TopicTab.tsx` | Yes |

### 2. Content Blocks (6 components)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| text | `blocks/TextBlock.tsx` | Yes | 47 |
| definition | `blocks/Definition.tsx` | Yes | 24 |
| explanation | `blocks/Explanation.tsx` | No | 0 |
| topic-summary | `blocks/TopicSummary.tsx` | Yes | 32 |
| narrative-summary | `blocks/NarrativeSummary.tsx` | No | 0 |
| list | `blocks/List.tsx` | Yes | 1 |

### 3. Practice Blocks (5 components)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| worked-example | `blocks/WorkedExample.tsx` | Yes | 60 |
| guided-exercise | `blocks/GuidedExercise.tsx` | Yes | 17 |
| example | `blocks/WorkedExample.tsx` | Yes | 8 |
| checkpoint-quiz | `blocks/CheckpointQuiz.tsx` | Yes | 20 |
| checkpoint | `blocks/CheckpointQuiz.tsx` | Yes | 12 |

### 4. Math / Specialized (6 components)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| formula | `blocks/FormulaCard.tsx` | Yes | 6 |
| formula-card | `blocks/FormulaCard.tsx` | No | 0 |
| hero-formula | `features/math/components/HeroFormula.tsx` | Yes | 14 |
| reference-table | `features/math/components/ReferenceTable.tsx` | Yes | 22 |
| street-smart | `blocks/StreetSmartSketch.tsx` | No | 0 |
| street-smart-sketch | `blocks/StreetSmartSketch.tsx` | No | 0 |
| concept-translation | `features/math/components/ConceptTranslation.tsx` | No | 0 |

### 5. Tips & Warnings (4 components)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| alert | `blocks/Alert.tsx` | Yes | 2 |
| callout | `blocks/Callout.tsx` | Yes | 1 |
| common-mistake | `blocks/CommonMistake.tsx` | Yes | 16 |
| exam-tip | `blocks/ExamTip.tsx` | Yes | 11 |

### 6. Engagement (4 components)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| hook | `blocks/Hook.tsx` | Yes | 2 |
| analogy | `blocks/Analogy.tsx` | Yes | 1 |
| deep-dive | `blocks/DeepDive.tsx` | Yes | 1 |
| did-you-know | `blocks/DidYouKnow.tsx` | Yes | 2 |

### 7. Navigation (1 component)

| Component | Path | Used | Count |
|-----------|------|------|-------|
| topic-navigation | `blocks/TopicNavigation.tsx` | No | 0 |

---

## Usage Statistics

### Blocks by Category (used in current chapters)

| Category | Count | Percentage |
|----------|-------|------------|
| Practice | 97 | 32.4% |
| Content | 104 | 34.8% |
| Learning Aids (Math) | 43 | 14.4% |
| Tips & Warnings | 29 | 9.7% |
| Engagement | 6 | 2.0% |
| Other | 20 | 6.7% |
| **Total** | **299** | **100%** |

### Top 10 Most Used Components

1. worked-example: 60
2. text: 47
3. topic-summary: 32
4. definition: 24
5. reference-table: 22
6. checkpoint-quiz: 20
7. guided-exercise: 17
8. common-mistake: 16
9. hero-formula: 14
10. checkpoint: 12

---

## Unused Components

The following components exist but are not currently used in any chapter:

- explanation
- narrative-summary
- formula-card
- street-smart
- street-smart-sketch
- concept-translation
- topic-navigation

---

## Conclusions

1. **Strong Practice Focus**: 32.4% of content is practice-oriented (worked-examples, guided-exercises, checkpoints), indicating a pedagogy focused on active learning.

2. **Math-Heavy**: 14.4% of blocks are math-specific (formulas, hero-formulas, reference-tables), reflecting the platform's focus on quantitative courses.

3. **Dual Narrative Style**: The `text` block supports both formal academic language (`formalText`) and street narrator explanations (`streetNarrator`), showing the bilingual teaching approach.

4. **Growth Potential**: 8 components (29%) are available but unused, providing room for expansion without new component development.

5. **Consistent Structure**: All chapter content flows through `BlockRenderer.tsx` as the central dispatcher, making it easy to add new block types.

---

*Generated: March 2026*
*Source: `web/src/features/core-lessons/` and `web/src/data/chapters/`*
