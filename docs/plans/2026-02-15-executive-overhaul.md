# Sikumnik Executive Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Sikumnik monorepo from a tangled mix of web app code, agent infrastructure, Python scripts, and loose files into a clean, scalable structure with clear boundaries between the Next.js app and the AI agent tooling.

**Architecture:** The project will be split into two clear zones: `web/` (the Next.js education platform) and `.agent/` (the AI orchestration system). Inside `web/`, the component library will be consolidated from 9 scattered directories into a single `components/` tree with `atoms/`, `molecules/`, `templates/`, and `interactive/` layers. All content will flow through typed JSON data files in `data/chapters/`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, KaTeX, Lucide Icons

---

## The Current Mess (Audit Summary)

### Root Directory (21 loose files — most don't belong here)
| File | Verdict |
|:---|:---|
| `GEMINI.md`, `CLAUDE.md`, `AGENTS.md` | ✅ Keep (agent config) |
| `README.md`, `.gitignore`, `.env` | ✅ Keep |
| `extract_ch3.py`, `extract_ch4.py`, etc. (5 scripts) | 🔴 Move → `tools/ingest/` |
| `ch3_text.txt`, `ch3_practice_text.txt` | 🔴 Move → `input_materials/` |
| `agent_audit_sunk_cost.md`, `TO-DO.md`, `CRITICAL_CHANGE_LOG.md` | 🔴 Move → `docs/` |
| `TEST_SKILL.md`, `nul`, `host.bat`, `host.ps1` | 🔴 Delete (dead/test files) |
| `full_structure.txt` (5.4MB!) | 🔴 Delete (regeneratable) |

### Components (81 files, 9 directories — 3 eras of duplication)
| Directory | Files | Status |
|:---|:---|:---|
| `components/accounting/` | 24 | 🔴 **Legacy Era 1** — Original pilot |
| `components/core/enhanced/` | 5 | 🟡 **Era 2** — Partial rewrite |
| `components/core/master-page/` | 31 | ✅ **Era 3** — Current "Gold Standard" |
| `components/micro/` | 2 | 🔴 Dead code |
| `components/microeconomics/` | 5 | 🔴 Dead code (superseded by master-page) |
| `components/home/` | 2 | ✅ Keep |
| `components/layout/` | 2 | ✅ Keep |
| `components/mdx/` | 3 | 🟡 Evaluate |
| `components/ui/` | 5 | ✅ Keep (shadcn) |
| `components/seo/` | 1 | ✅ Keep |

### Routes (40 pages)
- 23 Accounting chapter pages (chapters 2-12 + intro)
- 5 Microeconomics chapter pages (chapters 1-5)
- 2 Golden prototype pages
- 10 Other (home, courses, error, loading, etc.)

---

## Phase 1: Root Cleanup (The 30-Minute Win)

### Task 1: Kill Dead Root Files

**Files:**
- Delete: `nul`, `TEST_SKILL.md`, `host.bat`, `host.ps1`, `full_structure.txt`

**Step 1: Remove dead files**
```powershell
cd "c:\Users\rober\AI Projects\Sikumnik"
Remove-Item nul, TEST_SKILL.md, host.bat, host.ps1, full_structure.txt -ErrorAction SilentlyContinue
```

**Step 2: Verify**
```powershell
ls *.txt, *.bat, *.ps1, TEST_SKILL.md, nul 2>$null
```
Expected: No results (all deleted)

**Step 3: Commit**
```bash
git add -A && git commit -m "chore: remove dead root files"
```

---

### Task 2: Organize Root-Level Documents

**Files:**
- Move: `TO-DO.md` → `docs/TO-DO.md`
- Move: `CRITICAL_CHANGE_LOG.md` → `docs/CHANGELOG.md`
- Move: `agent_audit_sunk_cost.md` → `docs/audits/sunk-cost-audit.md`
- Move: `AGENTS.md` → `.agent/AGENTS.md`

**Step 1: Create directories and move files**
```powershell
New-Item -ItemType Directory -Path docs/audits -Force
Move-Item TO-DO.md docs/TO-DO.md
Move-Item CRITICAL_CHANGE_LOG.md docs/CHANGELOG.md
Move-Item agent_audit_sunk_cost.md docs/audits/sunk-cost-audit.md
Move-Item AGENTS.md .agent/AGENTS.md
```

**Step 2: Commit**
```bash
git add -A && git commit -m "chore: organize root documents into docs/"
```

---

### Task 3: Quarantine Python Ingest Scripts

**Files:**
- Move: `extract_ch3.py`, `extract_ch3_practice.py`, `extract_ch4.py`, `extract_ch4_ex.py`, `extract_pres_ch4.py` → `tools/ingest/`
- Move: `ch3_text.txt`, `ch3_practice_text.txt` → `input_materials/`

**Step 1: Move scripts**
```powershell
New-Item -ItemType Directory -Path tools/ingest -Force
Move-Item extract_*.py tools/ingest/
Move-Item ch3_text.txt, ch3_practice_text.txt input_materials/ -ErrorAction SilentlyContinue
```

**Step 2: Commit**
```bash
git add -A && git commit -m "chore: move ingest scripts to tools/ingest/"
```

---

## Phase 2: Component Consolidation (The Big One)

### Task 4: Kill Obviously Dead Component Directories

**Files:**
- Delete: `components/micro/` (2 files, fully superseded)
- Delete: `components/microeconomics/` (5 files, fully superseded)

**Step 1: Check for imports from these directories**
```powershell
cd web
npx grep-cli "@/components/micro" src/ --include="*.tsx" --include="*.ts" -r
npx grep-cli "@/components/microeconomics" src/ --include="*.tsx" --include="*.ts" -r
```
Expected: Identify any remaining imports (fix them first)

**Step 2: Update any found imports to use `core/master-page` equivalents**

(If imports found, update each file to use the `core/master-page` version)

**Step 3: Delete the dead directories**
```powershell
Remove-Item -Recurse src/components/micro
Remove-Item -Recurse src/components/microeconomics
```

**Step 4: Build to verify nothing broke**
```powershell
npm run build
```
Expected: Build succeeds

**Step 5: Commit**
```bash
git add -A && git commit -m "chore: remove dead micro/microeconomics component dirs"
```

---

### Task 5: Audit `core/enhanced/` vs `core/master-page/`

The `enhanced/` directory has 5 components that overlap with `master-page/`:

| Enhanced | Master-Page Equivalent |
|:---|:---|
| `CommonMistakes.tsx` | `CommonMistakes.tsx` + `MistakeFlipper.tsx` |
| `ConceptCard.tsx` | `DefinitionBlock.tsx` + `DualPersonaCard.tsx` |
| `DeepDive.tsx` | `DeepDive.tsx` |
| `GuidedExercises.tsx` | `GuidedExercise.tsx` |
| `PageMap.tsx` | `PageMap.tsx` |

**Step 1: For each file, diff the enhanced vs master-page version**
```powershell
# Example for CommonMistakes
fc src/components/core/enhanced/CommonMistakes.tsx src/components/core/master-page/CommonMistakes.tsx
```

**Step 2: Choose winner (master-page is likely correct — it's the newer system)**

**Step 3: Update any imports pointing to `enhanced/` to use `master-page/` instead**

**Step 4: Delete `core/enhanced/` after confirming no imports remain**

**Step 5: Build + Commit**
```bash
npm run build
git add -A && git commit -m "refactor: merge enhanced/ into master-page/, single source of truth"
```

---

### Task 6: Rename `master-page/` to Semantic Structure

Currently all 31 components live flat in `master-page/`. Restructure:

**Target structure:**
```
components/
├── core/                    # Was: core/master-page/
│   ├── atoms/               # Tiny reusable pieces
│   │   ├── Collapse.tsx
│   │   ├── HandwrittenNote.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── TermTooltip.tsx
│   │   └── ToneBreak.tsx
│   ├── molecules/            # Content blocks
│   │   ├── ChapterBridge.tsx
│   │   ├── CheckpointQuiz.tsx
│   │   ├── CommonMistakes.tsx
│   │   ├── DeepDive.tsx
│   │   ├── DefinitionBlock.tsx
│   │   ├── DualPersonaCard.tsx
│   │   ├── FormulaCard.tsx
│   │   ├── GuidedExercise.tsx
│   │   ├── IndependentExercise.tsx
│   │   ├── InteractiveEquation.tsx
│   │   ├── Introduction.tsx
│   │   ├── MistakeFlipper.tsx
│   │   ├── PageMap.tsx
│   │   ├── ReferenceCard.tsx
│   │   ├── StreetLevelSummary.tsx
│   │   ├── SummaryDashboard.tsx
│   │   ├── TeaserAnalogy.tsx
│   │   └── TriviaCard.tsx
│   ├── templates/            # Full page compositions
│   │   ├── ChapterTabs.tsx
│   │   ├── ChapterTabPanel.tsx
│   │   ├── ChapterNavigationFooter.tsx
│   │   ├── MasterChapterTemplate.tsx
│   │   └── MasterPageLayout.tsx
│   ├── interactive/          # Heavy interactive widgets
│   │   └── ClassificationGame.tsx
│   ├── LatexRenderer.tsx
│   ├── ChapterContext.tsx
│   └── useChapterState.ts
├── home/                     # Keep
├── layout/                   # Keep
├── seo/                      # Keep
└── ui/                       # Keep (shadcn)
```

**Step 1: Create the new directories**
```powershell
New-Item -ItemType Directory -Path src/components/core/atoms -Force
New-Item -ItemType Directory -Path src/components/core/molecules -Force
New-Item -ItemType Directory -Path src/components/core/templates -Force
New-Item -ItemType Directory -Path src/components/core/interactive -Force
```

**Step 2: Move files to their new homes (atoms)**
```powershell
Move-Item src/components/core/master-page/Collapse.tsx src/components/core/atoms/
Move-Item src/components/core/master-page/HandwrittenNote.tsx src/components/core/atoms/
Move-Item src/components/core/master-page/SectionWrapper.tsx src/components/core/atoms/
Move-Item src/components/core/master-page/TermTooltip.tsx src/components/core/atoms/
Move-Item src/components/core/master-page/ToneBreak.tsx src/components/core/atoms/
```

**Step 3: Move molecules** (the content blocks — bulk of the components)

**Step 4: Move templates** (MasterChapterTemplate, ChapterTabs, etc.)

**Step 5: Move interactive** (ClassificationGame)

**Step 6: Move remaining (LatexRenderer, ChapterContext, useChapterState) to `core/`**

**Step 7: Global find-and-replace all import paths**
```
FROM: @/components/core/master-page/ComponentName
TO:   @/components/core/molecules/ComponentName  (or atoms/ or templates/)
```

**Step 8: Build + Commit**
```bash
npm run build
git add -A && git commit -m "refactor: restructure master-page into atoms/molecules/templates/interactive"
```

---

### Task 7: Create Barrel Exports

**Files:**
- Create: `src/components/core/atoms/index.ts`
- Create: `src/components/core/molecules/index.ts`
- Create: `src/components/core/templates/index.ts`
- Create: `src/components/core/interactive/index.ts`
- Create: `src/components/core/index.ts`

**Step 1: Create barrel files**

```typescript
// src/components/core/atoms/index.ts
export { Collapse } from './Collapse'
export { HandwrittenNote } from './HandwrittenNote'
export { SectionWrapper } from './SectionWrapper'
export { TermTooltip } from './TermTooltip'
export { ToneBreak } from './ToneBreak'
```

(Repeat pattern for molecules, templates, interactive)

**Step 2: Create master barrel**
```typescript
// src/components/core/index.ts
export * from './atoms'
export * from './molecules'
export * from './templates'
export * from './interactive'
export { LatexRenderer } from './LatexRenderer'
export { ChapterContext } from './ChapterContext'
```

**Step 3: Build + Commit**
```bash
npm run build
git add -A && git commit -m "feat: add barrel exports for core components"
```

---

## Phase 3: Legacy Accounting Migration

### Task 8: Audit Accounting Chapter Dependencies

**Step 1: List all imports in accounting chapter pages**
```powershell
Select-String -Path src/app/courses/accounting/*/page.tsx -Pattern "from.*components" | Select-Object Filename, Line
```

**Step 2: Categorize each import**
- If it imports from `components/accounting/` → needs migration
- If it imports from `components/core/master-page/` → already on Gold Standard

**Step 3: Document the migration map**
For each accounting-specific component, identify its Gold Standard equivalent.

**Step 4: Commit migration map to `docs/plans/accounting-migration-map.md`**

---

### Task 9: Migrate Chapter Pages (Per-Chapter Loop)

For each chapter (2-12) that still uses `components/accounting/`:

**Step 1: Update imports to use `core/molecules/` equivalents**

**Step 2: If no equivalent exists, move the accounting component to `core/molecules/` and refactor**

**Step 3: Build + verify the specific chapter page**
```powershell
# Quick check - navigate to http://localhost:3000/courses/accounting/chapter-X
npm run build
```

**Step 4: Commit per-chapter**
```bash
git add -A && git commit -m "migrate: chapter-X to Gold Standard components"
```

---

### Task 10: Delete `components/accounting/`

**Step 1: Verify zero remaining imports**
```powershell
Select-String -Path src/ -Pattern "components/accounting" -Recurse -Include *.tsx,*.ts
```
Expected: No results

**Step 2: Delete**
```powershell
Remove-Item -Recurse src/components/accounting
```

**Step 3: Build + Commit**
```bash
npm run build
git add -A && git commit -m "chore: remove legacy accounting components (fully migrated)"
```

---

## Phase 4: Data Layer Cleanup

### Task 11: Standardize JSON Data Naming

Current naming is inconsistent:
- Accounting: `chapter-2.json` through `chapter-12.json`
- Micro: `micro-ch1.json` through `micro-ch5.json`
- Also: `accounting-101.json`, `accounting-advanced.json`

**Target naming:** `{course}/{chapter-N}.json`

```
data/
├── chapters/
│   ├── accounting/
│   │   ├── chapter-2.json
│   │   ├── ...
│   │   └── chapter-12.json
│   └── microeconomics/
│       ├── chapter-1.json
│       ├── ...
│       └── chapter-5.json
└── courses.json              # Course metadata (was accounting-101.json)
```

**Step 1: Create course subdirectories**
**Step 2: Move and rename files**
**Step 3: Update all imports in page.tsx files**
**Step 4: Build + Commit**

---

## Phase 5: Final Cleanup & Standards

### Task 12: Remove `golden-prototype/` (if no longer needed)

Evaluate if `app/golden-prototype/` is still serving a purpose.

### Task 13: Cleanup `mdx/` Components

Evaluate if `components/mdx/` (3 files) is still used. If not, delete.

### Task 14: Add `.gitignore` Rules

```gitignore
# Add to existing .gitignore
full_structure.txt
*.pyc
__pycache__/
.tmp/
```

### Task 15: Final Build + Smoke Test

```powershell
npm run build
npm run dev
```

Navigate to:
- `http://localhost:3000/` (Home)
- `http://localhost:3000/courses/accounting/chapter-3` (Sample accounting)
- `http://localhost:3000/courses/microeconomics/chapter-3` (Sample micro)

All pages should load without errors.

---

## Final Target Structure

```
Sikumnik/
├── .agent/                   # AI orchestration (untouched by app)
│   ├── agents/
│   ├── commands/
│   ├── hooks/
│   ├── rules/
│   ├── skills/
│   ├── .shared/
│   └── workflows/
├── docs/                     # Documentation & plans
│   ├── plans/
│   ├── audits/
│   └── CHANGELOG.md
├── input_materials/          # Raw course content (PDFs, text)
├── tools/                    # Python ingest scripts
│   └── ingest/
├── web/                      # The Next.js app
│   └── src/
│       ├── app/              # Routes only
│       ├── components/
│       │   ├── core/         # The component library
│       │   │   ├── atoms/
│       │   │   ├── molecules/
│       │   │   ├── templates/
│       │   │   └── interactive/
│       │   ├── home/
│       │   ├── layout/
│       │   ├── seo/
│       │   └── ui/           # shadcn
│       ├── data/
│       │   ├── chapters/
│       │   │   ├── accounting/
│       │   │   └── microeconomics/
│       │   └── courses.json
│       ├── lib/
│       └── types/
├── CLAUDE.md
├── GEMINI.md
└── README.md
```

---

**Plan complete and saved to `docs/plans/2026-02-15-executive-overhaul.md`. Two execution options:**

**1. Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
