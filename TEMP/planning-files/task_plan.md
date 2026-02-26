# Task Plan: Component System Redesign Implementation

## Goal
Consolidate 30+ fragmented UI components into 22 unified, accessible, and semantically consistent components based on the Sikumnik Design System specifications.

## Current Phase
Phase 5

## Phases

### Phase 1: Requirements & Discovery
- [x] Read `INDEX.md`, `README.md`, and `00_EXECUTIVE_SUMMARY.md`
- [x] Analyze `COMPONENT_REDESIGN.md` architecture
- [x] Document key color mappings and component hierarchy in `findings.md`
- **Status:** complete

### Phase 2: Definition & Alert Unification
- [x] Implement `<AcademicDefinition />` (formal, serif, dark blue)
- [x] Implement `<Definition variant="simple" />` (quick reference, teal)
- [x] Implement unified `<Alert variant="tip | warning | prerequisite" />`
- [x] Deprecate old components (`Callout`, `ExamTip`, `CommonMistake`, `Prerequisite`)
- [x] Update `components-audit` page to render new versions
- **Status:** complete

### Phase 3: Exercise System Refactor
- [x] Improve `<CheckpointQuiz />` UX (smooth expand/collapse transitions)
- [x] Build `<KnowledgeExam />` (5-question chapter-end validation)
- [ ] Refactor `<GuidedExercise />`:
    - [x] Support LaTeX math rendering in body, questions, and answers
- [x] Implement LaTeX rendering in `<CheckpointQuiz />` and `<KnowledgeExam />`

### Phase 4: Narrative Component Overhaul
- [x] Redesign `<Hook />` (gradient background, engaging)
- [x] Build `<StreetSmart />` (casual "bro language", orange, coffee icon)
- [x] Validate `<Explanation />`, `<DeepDive />`, and `<NarrativeSummary />`
- [x] Deprecate `<TopicSummary />` and `<ToneBreak />`
- [x] Update `components-audit` page
- **Status:** complete

### Phase 5: Final Audit & Dead Code Sweep
- [x] Refine pedagogical emphasis components (DidYouKnow, Analogy)
- [x] Sweep project for dead code
- [x] Delete deprecated components (ToneBreak, old StreetSmart, etc.)
- [x] Fix linter warnings
- **Status:** complete

### Phase 6: Data Migration
- [x] Write a script to automatically parse and transform legacy JSON structures
- [x] Backup current JSON data
- [x] Migrate `accounting` chapter JSONs
- [x] Migrate `microeconomics` chapter JSONs
- [x] Migrate `organizational-behavior` chapter JSONs
- [x] Verify content renders correctly across the platform
- **Status:** complete

## Key Questions
1. Should `StreetSmart` be a full block or inline explanation? (Resolved: Full block)
2. Will migrating JSON data break existing lessons if done mid-build? (Needs coordination)

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Store planning files in `planning-files/` | The user already created this directory; respecting their workspace structure. |
| Grouping tasks by component family | Matches the roadmap outlined in `COMPONENT_REDESIGN.md` Phase 1 through 4. |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
|       |         |            |

## Notes
- Update phase status as you progress: pending → in_progress → complete
- Re-read this plan before major decisions
- Always test new components in `/components-audit` before migrating JSON data.
