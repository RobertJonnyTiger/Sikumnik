# Future Skills & Workflows TODO

This document tracks skills and workflows to potentially rebuild in the future.

---

## Skills to Rebuild (Deleted during cleanup)

These skills existed in the old setup but were removed because they targeted different projects. Rebuild when needed for Sikumnik content creation.

### 🧠 Knowledge Engine (New Architecture)

| Skill | Purpose | Priority | Status |
|-------|---------|----------|--------|
| `knowledge-ingestion/` | **The Librarian**: Ingest PDFs/Docs -> Markdown Knowledge Base | High | ✅ Restored (`librarian/`) |
| `sikumnik-lecturer/` | **The Lecturer**: Read Knowledge Base -> Write Educational Content | High | ✅ Restored (`lecturer/`) |
| `exercise-researcher/` | Research and create practice problems | Medium | ✅ Skill Created |

### Testing

| Skill | Purpose | Priority |
|-------|---------|----------|
| `playwright/` | E2E testing with Playwright | Medium |
| Add more e2e tests | Currently only 1 test exists | High |

### UI/Design

| Skill | Purpose | Priority |
|-------|---------|----------|
| `design-md/` | Design system documentation | Low |
| `shadcn-ui/` | Already exists - expand as needed | - |

### Other Tools

| Skill | Purpose | Priority |
|-------|---------|----------|
| `prompt-engineer/` | Prompt engineering utilities | Low |

---

## Workflows to Rebuild

### Current Workflows

| Workflow | Status |
|----------|--------|
| `chapter-rehaul.md` | Keep - for chapter content overhaul |

### Deleted Workflows (consider rebuilding)

| Workflow | Purpose |
|----------|---------|
| `course-building.md` | Build entire course structure |
| `system-sweep.md` | System cleanup workflow |

---

## Automated Testing TODO

Currently:
- ✅ Playwright configured (`web/playwright.config.ts`)
- ⚠️ Only 1 test exists (`tests/e2e/micro-ch1.spec.ts`)
- ❌ No CI pipeline (no GitHub Actions)

**Recommendations:**
1. Add more e2e tests for critical paths
2. Create GitHub Actions workflow to run tests on PR
3. Add visual regression testing with Playwright

---

## Ideas for New Skills

### Sikumnik-Specific

| Skill | Purpose |
|-------|---------|
| `chapter-migrator/` | Migrate chapters to new schema (could generalize Task 9) |
| `json-validator/` | Validate chapter JSON against schema |
| `heb-content-checker/` | Check Hebrew content quality/formatting |

### Skills from Other Projects

| Original Skill | Original Project |
|----------------|-----------------|
| `tlv-academic-explainer/` | Old content style |
| `tlv-casual-explainer/` | Old content style |
| `web-artifacts-builder/` | Different project |
| `vercel-react-best-practices/` | May need later |

---

## How to Rebuild

When you want to rebuild a skill:

1. Use the `writing-skills` skill (run `skill writing-skills`)
2. Follow TDD approach: test first, then write skill
3. Put in `.agent/skills/[skill-name]/`
4. Add entry to this document

---

*Last updated: 2026-02-16*

# Future Improvements & Technical Debt

- [x] Fix broken links in `.agent/agents/frontend-specialist.md`: The file references `.agent/.shared` and `.agent/rules`, which no longer exist.
- [x] Install `using-superpowers` skill (Installed manually from GitHub to `.agent/skills/using-superpowers`).