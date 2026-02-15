# Sikumnik Executive Overhaul — Implementation Plan (v2)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip the Sikumnik project down to a clean, scalable Next.js education platform with clear separation between `web/` (the app) and `.agent/` (the AI tooling). Delete everything that doesn't serve the platform. After the overhaul, revisit chapter content with proper workflows.

**Architecture:** Two zones: `web/` (Next.js app) and `.agent/` (AI orchestration). Components consolidated from 9 scattered directories into a single `core/` tree with `atoms/`, `molecules/`, `templates/`, and `interactive/` layers. Content flows through typed JSON in `data/chapters/`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, KaTeX, Lucide Icons

---

## The Current Mess (Audit Summary)

### Root Directory — 21 loose files

| File | Verdict | Reason |
|:---|:---|:---|
| `GEMINI.md` | ✅ Keep | Active agent config (loaded by system) |
| `.gitignore`, `.env` | ✅ Keep | Essential |
| `CLAUDE.md` | 🔴 **Delete** | Stale — 3-layer arch doc from a different project (scraping/API system with Google OAuth). Not relevant to Sikumnik |
| `AGENTS.md` | 🔴 **Delete** | Identical to CLAUDE.md — same stale doc, just mirrored |
| `README.md` | 🟡 **Rewrite** | User-created, outdated. Needs overhaul after restructure |
| `TO-DO.md` | 🔴 **Delete** | User-created, no longer needed |
| `CRITICAL_CHANGE_LOG.md` | 🔴 **Delete** | User-created, will be replaced by proper git history |
| `agent_audit_sunk_cost.md` | 🔴 **Delete** | Obsolete audit doc |
| `TEST_SKILL.md`, `nul`, `host.bat`, `host.ps1` | 🔴 **Delete** | Dead/test files |
| `full_structure.txt` (5.4MB) | 🔴 **Delete** | Regeneratable |
| `extract_ch3.py`, `extract_ch4.py`, etc. (5 scripts) | 🔴 **Delete** | Ad-hoc scripts from scattered workflow. Will rebuild with proper ingest workflow post-overhaul |
| `ch3_text.txt`, `ch3_practice_text.txt` | 🔴 **Delete** | Extracted text artifacts, no longer needed |

### Components (81 files, 9 directories — 3 eras of duplication)

| Directory | Files | Status |
|:---|:---|:---|
| `components/accounting/` | 24 | 🟡 **Active but needs migration** — functional components still used by chapter pages |
| `components/core/enhanced/` | 5 | 🔴 **Partial rewrite** — duplicates master-page |
| `components/core/master-page/` | 31 | ✅ **Gold Standard** — current best version |
| `components/micro/` | 2 | 🔴 Dead code |
| `components/microeconomics/` | 5 | 🔴 Dead code (superseded) |
| `components/home/` | 2 | ✅ Keep |
| `components/layout/` | 2 | ✅ Keep |
| `components/mdx/` | 3 | 🟡 Evaluate |
| `components/ui/` | 5 | ✅ Keep (shadcn) |
| `components/seo/` | 1 | ✅ Keep |

### Other Directories

| Directory | Verdict | Reason |
|:---|:---|:---|
| `execution/` | 🔴 **Delete** | From the old 3-layer architecture (CLAUDE.md system). Not used by Sikumnik |
| `templates/` | 🟡 **Evaluate** | Check if used; delete if orphaned |
| `input_materials/` | ✅ Keep | Raw course content (PDFs, notebooks) |
| `.tmp/` | 🔴 **Delete** | Intermediate files, regeneratable |

---

## Phase 1: Scorched Earth — Root Cleanup

### Task 1: Delete Dead Root Files

**Files to delete:**
```
nul, TEST_SKILL.md, host.bat, host.ps1, full_structure.txt,
CLAUDE.md, AGENTS.md, TO-DO.md, CRITICAL_CHANGE_LOG.md,
agent_audit_sunk_cost.md,
extract_ch3.py, extract_ch3_practice.py, extract_ch4.py,
extract_ch4_ex.py, extract_pres_ch4.py,
ch3_text.txt, ch3_practice_text.txt
```

**Step 1: Remove all dead files**
```powershell
cd "c:\Users\rober\AI Projects\Sikumnik"
$deadFiles = @(
    "nul", "TEST_SKILL.md", "host.bat", "host.ps1", "full_structure.txt",
    "CLAUDE.md", "AGENTS.md", "TO-DO.md", "CRITICAL_CHANGE_LOG.md",
    "agent_audit_sunk_cost.md",
    "extract_ch3.py", "extract_ch3_practice.py", "extract_ch4.py",
    "extract_ch4_ex.py", "extract_pres_ch4.py",
    "ch3_text.txt", "ch3_practice_text.txt"
)
$deadFiles | ForEach-Object { Remove-Item $_ -ErrorAction SilentlyContinue }
```

**Step 2: Verify clean root**
```powershell
Get-ChildItem -File | Select-Object Name
```
Expected: Only `GEMINI.md`, `README.md`, `.env`, `.gitignore` remain

**Step 3: Commit**
```bash
git add -A && git commit -m "chore: scorched earth - delete 17 dead root files"
```

---

### Task 2: Delete Dead Root Directories

**Step 1: Check and remove `execution/` directory**
```powershell
# Verify it's from the old 3-layer system
Get-ChildItem execution/ -Recurse | Select-Object Name
Remove-Item -Recurse -Force execution/
```

**Step 2: Remove `.tmp/` directory**
```powershell
Remove-Item -Recurse -Force .tmp/ -ErrorAction SilentlyContinue
```

**Step 3: Evaluate `templates/` — check if anything references it**
```powershell
Select-String -Path web/src -Pattern "templates/" -Recurse -Include *.tsx,*.ts
```
If no references → delete. If referenced → keep for now.

**Step 4: Commit**
```bash
git add -A && git commit -m "chore: remove execution/, .tmp/, and orphaned directories"
```

---

### Task 3: Update `.gitignore`

**Add rules to prevent re-accumulation of junk:**
```gitignore
# Regeneratable
full_structure.txt

# Python artifacts
*.pyc
__pycache__/

# Temp
.tmp/

# OS
nul
```

**Commit:**
```bash
git add .gitignore && git commit -m "chore: update gitignore for post-overhaul"
```

---

## Phase 2: Component Consolidation

### Task 4: Kill Dead Component Directories

**Files:**
- Delete: `components/micro/` (2 files)
- Delete: `components/microeconomics/` (5 files)

**Step 1: Check for remaining imports**
```powershell
cd web
Select-String -Path src/ -Pattern "@/components/micro[^e]" -Recurse -Include *.tsx,*.ts
Select-String -Path src/ -Pattern "@/components/microeconomics" -Recurse -Include *.tsx,*.ts
```

**Step 2: If imports found, update them to use `core/master-page` equivalents**

**Step 3: Delete**
```powershell
Remove-Item -Recurse src/components/micro
Remove-Item -Recurse src/components/microeconomics
```

**Step 4: Build**
```powershell
npm run build
```

**Step 5: Commit**
```bash
git add -A && git commit -m "chore: remove dead micro/ and microeconomics/ components"
```

---

### Task 5: Merge `core/enhanced/` into `core/master-page/`

5 overlapping files:

| Enhanced | Master-Page Equivalent |
|:---|:---|
| `CommonMistakes.tsx` | `CommonMistakes.tsx` + `MistakeFlipper.tsx` |
| `ConceptCard.tsx` | `DefinitionBlock.tsx` + `DualPersonaCard.tsx` |
| `DeepDive.tsx` | `DeepDive.tsx` |
| `GuidedExercises.tsx` | `GuidedExercise.tsx` |
| `PageMap.tsx` | `PageMap.tsx` |

**Step 1: Diff each pair**
**Step 2: Master-page wins (newer system) — update any imports pointing to `enhanced/`**
**Step 3: Delete `core/enhanced/`**
**Step 4: Build + Commit**

---

### Task 6: Restructure `master-page/` → Semantic Layers

Move from flat 31-file directory to:

```
components/core/
├── atoms/           # 5 files: Collapse, HandwrittenNote, SectionWrapper, TermTooltip, ToneBreak
├── molecules/       # 18 files: The content blocks (FormulaCard, DefinitionBlock, etc.)
├── templates/       # 5 files: MasterChapterTemplate, ChapterTabs, Layout, Nav, etc.
├── interactive/     # 1 file: ClassificationGame
├── LatexRenderer.tsx
├── ChapterContext.tsx
└── useChapterState.ts
```

**Step 1: Create directories**
**Step 2: Move files by category**
**Step 3: Global find-and-replace import paths:**
```
FROM: @/components/core/master-page/X
TO:   @/components/core/{atoms|molecules|templates|interactive}/X
```
**Step 4: Build + Commit**

---

### Task 7: Create Barrel Exports

Create `index.ts` in each subdirectory:

```typescript
// atoms/index.ts
export { Collapse } from './Collapse'
export { HandwrittenNote } from './HandwrittenNote'
// ...etc
```

Create master barrel:
```typescript
// core/index.ts
export * from './atoms'
export * from './molecules'
export * from './templates'
export * from './interactive'
```

**Build + Commit**

---

## Phase 3: Accounting Component Migration

> The `components/accounting/` directory has 24 components that are **actively used** by chapter pages. They need to be migrated to the Gold Standard system, not just deleted.

### Task 8: Audit Accounting Chapter Dependencies

**Step 1: Map all imports**
```powershell
Select-String -Path src/app/courses/accounting/*/page.tsx -Pattern "from.*components" | Select-Object Filename, Line
```

**Step 2: For each accounting component, document:**
- Which chapters use it
- Whether a `core/molecules/` equivalent exists
- Migration path (swap import vs. rewrite)

**Output:** `docs/plans/accounting-migration-map.md`

---

### Task 9: Migrate Per-Chapter (Loop)

For each chapter (2-12) still importing from `components/accounting/`:

**Step 1:** Update imports to core equivalents
**Step 2:** If no equivalent exists, promote the accounting component to `core/molecules/`
**Step 3:** Build + test the specific chapter
**Step 4:** Commit per-chapter

---

### Task 10: Delete `components/accounting/`

After all chapters migrated:
**Step 1:** Verify zero imports remain
**Step 2:** Delete the directory
**Step 3:** Build + Commit

---

## Phase 4: Data Layer Standardization

### Task 11: Organize JSON Data by Course

Current:
```
data/chapters/chapter-2.json     # accounting
data/chapters/micro-ch1.json     # microeconomics
data/accounting-101.json         # ??
data/accounting-advanced.json    # ??
```

Target:
```
data/
├── chapters/
│   ├── accounting/
│   │   ├── chapter-2.json ... chapter-12.json
│   └── microeconomics/
│       ├── chapter-1.json ... chapter-5.json
└── courses.json
```

**Step 1:** Create course subdirectories
**Step 2:** Move and rename files
**Step 3:** Update all imports in page.tsx files
**Step 4:** Build + Commit

---

## Phase 5: Final Polish

### Task 12: Evaluate and Remove `golden-prototype/`

Check if `app/golden-prototype/` is still serving a purpose. If it's a dev-only gallery, consider removing or moving to a dev-only route.

### Task 13: Evaluate `mdx/` Components

Check if `components/mdx/` (3 files) is still imported anywhere. Delete if orphaned.

### Task 14: Rewrite `README.md`

Create a proper README for the project:
- Project description (Hebrew education platform)
- How to run (`cd web && npm run dev`)
- Project structure (the new clean one)
- How to add a new chapter
- Tech stack

### Task 15: Final Build + Smoke Test

```powershell
cd web
npm run build
npm run dev
```

Navigate to:
- `http://localhost:3000/` (Home)
- `http://localhost:3000/courses/accounting/chapter-3`
- `http://localhost:3000/courses/microeconomics/chapter-3`

All pages must load without errors.

---

## Post-Overhaul: Chapter Improvement (Future Phase)

> **This is NOT part of the executive overhaul.** These are the next steps after the codebase is clean.

Once the structure is solid:
1. **Audit `input_materials/`** — catalog all raw content (PDFs, presentations, notebooks)
2. **Build proper ingest workflow** — replace the ad-hoc Python scripts with a proper pipeline using `.agent/workflows/chapter-rehaul.md`
3. **Rebuild chapters** — go through each chapter systematically using the Gold Standard template and clean workflows
4. **Content quality pass** — ensure consistency across all chapters (Hebrew text, LaTeX formatting, tone)

---

## Final Target Structure

```
Sikumnik/
├── .agent/                   # AI orchestration (untouched by app)
│   ├── agents/
│   ├── commands/
│   ├── hooks/
│   ├── references/
│   ├── rules/
│   ├── skills/
│   ├── .shared/
│   └── workflows/
├── docs/                     # Documentation & plans
│   └── plans/
├── input_materials/          # Raw course content (PDFs, text)
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
│       │   └── chapters/
│       │       ├── accounting/
│       │       └── microeconomics/
│       ├── lib/
│       └── types/
├── GEMINI.md                 # Single agent config
└── README.md                 # Project documentation
```

---

## Summary

| Phase | Tasks | What Dies |
|:---|:---|:---|
| **1. Scorched Earth** | 3 | 17 dead files, `execution/`, `.tmp/`, stale agent configs |
| **2. Component Consolidation** | 4 | `micro/`, `microeconomics/`, `enhanced/`, flat `master-page/` |
| **3. Accounting Migration** | 3 | `components/accounting/` (after migrating all chapters) |
| **4. Data Layer** | 1 | Inconsistent naming, flat structure |
| **5. Final Polish** | 4 | `golden-prototype/`, `mdx/`, stale README |

**Total: 15 tasks, 5 phases.**

---

**Plan ready. Two execution options:**

**1. Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open new Claude Code session with `executing-plans` skill

**Which approach?**
