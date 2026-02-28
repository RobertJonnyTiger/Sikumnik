# Input Materials - Course Materials Organization System

## Overview

This directory contains organized course materials for university-level economics and accounting courses. All files follow a consistent naming and folder structure to enable easy navigation and programmatic access.

---

## Quick Start

### Folder Structure
```
input-materials/
├── math/           # Mathematics
├── micro/         # Micro-economics
├── acct/          # Accounting
└── orgbh/         # Organizational Behaviour
```

### Each Course Contains
```
[course]/
├── lecture-slides/    # Professor's slides from class
├── ai-slides/        # AI-generated slides (NotebookLM)
├── exercises/        # Practice exercises & drills
├── exams/           # Exams and solutions
├── drills/          # Additional practice (some courses)
└── other/           # Miscellaneous materials
```

---

## Naming Conventions

### 1. Lecture Slides
**Pattern:** `lecture-[number]-[topic].[ext]`

- Number: Topic order in course (01, 02, 03...)
- Topic: Descriptive name in lowercase with hyphens
- Sorted alphabetically = chronologically by course

**Examples:**
```
lecture-01-sets-functions.pdf
lecture-02-limits.pdf
lecture-03-continuity-discontinuity.pdf
```

---

### 2. AI Slides
**Pattern:** `[number]-[topic]-[detail].[ext]`

- Number: Matches corresponding lecture slide number
- Multiple files can share the same number (different resources for same topic)
- Topics align with lecture slide topics

**Examples:**
```
02-limits.pdf
02-limits-tactical-guide.pdf
05-derivatives-differential.pdf
```

---

### 3. Exercises
**Pattern:** `exercise-[number][letter]-[topic].[ext]`

- Number: Aligned with lecture slide topic numbers
- Optional letter suffix (a, b, c) for additional exercises on same topic
- Sorted by number, then by letter

**Examples:**
```
exercise-01-balance-sheet.docx
exercise-10-fixed-assets.docx
exercise-10a-depreciation-calculation.docx
exercise-10b-fixed-assets-exam.docx
```

---

### 4. Exams
**Pattern:** `exam-[year]-[session].[ext]`

- Year: 4-digit year (ascending - oldest first)
- Session: `a` (מועד א) or `b` (מועד ב)
- May include: `solution`, `questions`, `american`

**Examples:**
```
exam-2018-american.doc
exam-2023-a-questions.pdf
exam-2024-b-solution.docx
exam-2025-a.pdf
```

---

## Content Types

| Type | Description | Folder |
|------|-------------|--------|
| `lecture-slides` | College professor slides from class | `lecture-slides/` |
| `ai-slides` | AI-generated slides (NotebookLM) | `ai-slides/` |
| `exercises` | Practice exercises & drills | `exercises/` |
| `drills` | Additional practice exercises | `drills/` |
| `exams` | Exams and exam solutions | `exams/` |
| `other` | Miscellaneous materials | `other/` |

---

## Course-Specific Details

### Mathematics (math)
- **Topics:** 10 main topics (sets → reconstruction)
- **Includes:** lecture-slides, ai-slides, exercises, exams, other
- **Numbering:** 01-10 corresponds to course progression
- **Files:** 27 AI slide files, 13 exercise files, exam files

### Micro-Economics (micro)
- **Topics:** 12 chapters
- **Includes:** lecture-slides (in chapter folders), drills, exams, other
- **Numbering:** chapter-01 through chapter-12

### Accounting (acct)
- **Topics:** 12 exercise sets
- **Includes:** lecture-slides, exercises, exams, other
- **Numbering:** 01-12 with letter suffixes (a, b, c)

### Organizational Behaviour (orgbh)
- **Topics:** 5 main topics
- **Includes:** lecture-slides, ai-slides, other
- **Special:** Questions & answers file, course summaries in `other/`

---

## Accessing Materials

### By Course
```bash
ls input-materials/math/
ls input-materials/micro/
ls input-materials/acct/
ls input-materials/orgbh/
```

### By Type
```bash
# All lecture slides
find input-materials -name "lecture-*.pdf"

# All exams
find input-materials -path "*/exams/*"

# All AI slides
find input-materials -path "*/ai-slides/*"
```

### By Topic Number
```bash
# All materials for Topic 02 (Limits)
ls math/lecture-slides/lecture-02-*
ls math/ai-slides/02-*
ls math/exercises/exercise-02-*
```

---

## Key Principles

1. **Number Prefix = Sorting**: Numbers ensure files sort in course order
2. **Consistent Naming**: All lowercase, hyphen-separated (kebab-case)
3. **Topic Alignment**: AI slides & exercises match lecture slide numbers
4. **Hebrew Content**: File content may be in Hebrew; filenames are in English
5. **Date Sorting**: Exams sorted oldest → newest (ascending by year)

---

## Automated Organization

Use the provided Python script to organize new materials:

```bash
python organize_materials.py <folder_path>
```

The script will:
1. Analyze the folder structure
2. Detect content type (lecture, exercise, exam, etc.)
3. Apply naming conventions
4. Ask for guidance when uncertain

See `organize_materials.py` for details.

---

## Notes

- All folder and file names use **kebab-case** (lowercase with hyphens)
- Number prefixes use 2-digit format: `01`, `02`, ..., `12`
- Multiple files can share the same number (different resources for same topic)
- When uncertain, the script will prompt for user input
