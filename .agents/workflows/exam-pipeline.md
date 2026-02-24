---
description: Process a PDF exam into ExamEngine-ready JSON using Groq Vision
---

# /exam-pipeline — Exam Processing Workflow

## Prerequisites
- Python `.venv` is set up at project root
- `GROQ_API_KEY` is set in `.env`
- PDF exam file is placed in the correct `raw/` directory

## Directory Structure

```
web/
├── scripts/
│   ├── exam-extract.py    ← Script 1: PDF → questions JSON (Groq Vision OCR)
│   └── exam-solve.py      ← Script 2: questions → solved JSON (deep reasoning)
└── src/data/<course-id>/
    ├── exams/raw/
    │   └── <exam-name>.pdf         ← Input: raw PDF exam
    └── chapters/
        ├── chapter-1.json          ← Chapter data
        ├── chapter-2.json
        └── simulation-<short>-<year>.json  ← Final exam output (lives with chapters)
```

**Naming convention:** `simulation-<course-short>-<year>.json`
- microeconomics → `simulation-micro-2013.json`
- organizational-behavior → `simulation-ob-2024.json`
- accounting → `simulation-accounting-2023.json`

## Steps

### 1. Place the PDF
Copy the exam PDF into the raw directory:
```
web/src/data/<course-id>/exams/raw/<exam-name>.pdf
```

### 2. Extract questions (Groq Vision OCR)
// turbo
```bash
.venv/Scripts/python.exe web/scripts/exam-extract.py <course-id> <exam-name>.pdf
```
**What it does:** Renders each PDF page to a high-res image, sends it to Groq Vision (Llama 4 Scout) for OCR. Extracts each question individually — title, body, options (א-ה), tables, and graph descriptions. Proper Hebrew text reading.

**Intermediate output:** `web/src/data/<course-id>/exams/processed/<exam-name>-questions.json`

### 3. Solve questions (Groq Deep Reasoning)
// turbo
```bash
.venv/Scripts/python.exe web/scripts/exam-solve.py <course-id> <exam-name>-questions.json
```
**What it does:** Professor persona solves each question with rigorous step-by-step analysis. No guessing — real economic reasoning. Generates correctIndex, detailed reasoning for correct/wrong options, and a pedagogical hint.

**Final output:** `web/src/data/<course-id>/chapters/simulation-<short>-<year>.json`

**Auto-cleanup:** Deletes intermediate `-questions.json` and any leftover `-solved.json` files.

### 4. Update the exam page import (if new exam)
If this is a new exam file, update the import in the exam page:
```tsx
// web/src/app/courses/<course-id>/exam/page.tsx
import examData from "@/data/<course-id>/chapters/simulation-<short>-<year>.json";
```

### 5. Verify in browser
Open `http://localhost:3000/courses/<course-id>/exam` to see the exam in ExamEngine.

## Example (Microeconomics 2013)

```bash
# Step 2
.venv/Scripts/python.exe web/scripts/exam-extract.py microeconomics exam-2013-micro.pdf
# Step 3
.venv/Scripts/python.exe web/scripts/exam-solve.py microeconomics exam-2013-micro-questions.json
# → Final: web/src/data/microeconomics/chapters/simulation-micro-2013.json
```

## Notes
- Groq free tier: 30 RPM, 14,400 RPD — scripts include rate-limit pauses
- Extraction ~20s (9 pages), solving ~60s (20 questions)
- ExamEngine page: `web/src/app/courses/<course-id>/exam/page.tsx`
