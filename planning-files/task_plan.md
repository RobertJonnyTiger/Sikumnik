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
- [x] Improve `<CheckpointQuiz />` UX
- [x] Build `<KnowledgeExam />` (5-question chapter-end validation)
- [x] Enhance `<GuidedExercise />` (step-by-step methodology, no grading)
- [x] Update `components-audit` page
- **Status:** complete

### Phase 4: Narrative Component Overhaul
- [ ] Redesign `<Hook />` (gradient background, engaging)
- [ ] Build `<StreetSmart />` (casual "bro language", orange, coffee icon)
- [ ] Validate `<Explanation />`, `<DeepDive />`, and `<NarrativeSummary />`
- [ ] Deprecate `<TopicSummary />` and `<ToneBreak />`
- [ ] Update `components-audit` page
- **Status:** pending

### Phase 5: Data Migration & Delivery
- [ ] Write data migration script based on `MIGRATION_GUIDE.md`
- [ ] Migrate all chapter JSON files to use new schemas (e.g. `type: "alert"`)
- [ ] Perform full QA pass on all existing chapters
- [ ] Deliver finished system to user
- **Status:** pending

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
