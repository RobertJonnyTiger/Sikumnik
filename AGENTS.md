# AGENTS.md - Sikumnik Project Guidelines

## Project Overview

Sikumnik is a Hebrew educational platform for university-level economics and accounting with RTL support.

**Architecture:**
- **Frontend:** Next.js 16 + React 19 + TypeScript (App Router)
- **Backend:** Python pipeline for PDF → JSON processing
- **Data:** Static JSON chapter files in `web/src/data/chapters/`

## Build/Lint/Test Commands

### Web (Next.js)
Run from `web/` directory:

```bash
# Development
npm run dev                    # Start dev server on port 3001

# Build & Lint
npm run build                  # Production build
npm run start                  # Start production server
npm run lint                   # Run ESLint (Next.js config)

# Unit Tests (Vitest)
npm run test                              # Run all tests once
npm run test:watch                        # Watch mode
npm run test:coverage                     # With coverage report
npx vitest run tests/lib/utils.test.ts    # Single test file
npx vitest run -t "test name"             # Tests matching pattern

# E2E Tests (Playwright)
npx playwright test                       # Run all E2E tests
npx playwright test tests/e2e/arcade-integration.spec.ts  # Single file
npx playwright test --headed              # Run with visible browser
npx playwright test --debug               # Debug mode
```

### Python Scripts
Run from repository root:

```bash
# Pipeline
python pipeline.py input_materials/micro-economics/chapter-03/lecture.pdf
python pipeline.py input_materials/ --batch --resume

# Testing (pytest)
python -m pytest scripts/tests/                    # All tests
python -m pytest scripts/tests/test_file.py -v     # Single file
python -m pytest scripts/tests/ -k "pattern"       # Tests matching pattern

# Validation
python scripts/validate_chapter.py courses/micro-economics/chapter-1/chapter.json
```

## Code Style Guidelines

### TypeScript/JavaScript

**Formatting**
- 4 spaces indentation
- Double quotes for strings
- Semicolons required
- Trailing commas in multi-line
- Max line length: 88 characters

**Imports**
- Use `@/` alias: `import { Component } from "@/components/ui"`
- Group order: React/Next → third-party → local
- Named exports for components, default only for pages

**Types**
- Strict TypeScript enabled
- Use `type` for object shapes, `interface` for extensible contracts
- Explicit return types on exported functions
- Place types in `src/types/` directory

**Naming Conventions**
- Components: PascalCase (`BlockRenderer.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`ContentBlock`)
- Constants: UPPER_SNAKE_CASE

**Components**
- Functional components with `React.FC<Props>`
- Destructure props in parameters
- Use `"use client"` for client components
- Server components by default

**Error Handling**
- Early returns for guard clauses
- Throw for unexpected errors, return null for expected misses
- Always handle async errors with try/catch

**RTL Support**
- All UI must support Hebrew (RTL)
- `dir="rtl"` already set in root layout
- Test visual layouts in RTL mode

### Python

- Follow PEP 8, 4 spaces indentation
- Type hints for function signatures
- Docstrings for modules, classes, public functions
- snake_case for functions/variables, PascalCase for classes
- Use exceptions for error conditions, log with context

## Project Structure

```
web/
  src/
    app/                 # Next.js App Router pages
      courses/           # Course pages (accounting, microeconomics, etc.)
    components/
      core/
        blocks/          # Content block components
        interactive/     # Interactive learning components
      ui/                # Generic UI primitives
      layout/            # Navigation, sidebar
    data/chapters/       # JSON chapter data
    types/               # TypeScript definitions
    lib/                 # Utility functions
  tests/
    lib/                 # Vitest unit tests (*.test.ts)
    e2e/                 # Playwright E2E tests (*.spec.ts)

scripts/
  librarian_process.py   # PDF text extraction
  lecturer_process.py    # Transform to structured JSON
  validate_chapter.py    # JSON validation
  tests/                 # pytest test files
```

## Architecture Patterns

### Content Blocks
Discriminated union type `ContentBlock` with 20+ block types:
- `explanation`, `definition`, `formula`, `example`, `analogy`
- `deep-dive`, `tone-break`, `common-mistake`, `guided-exercise`
- `checkpoint`, `summary`, `callout`, `interactive`

### Chapter Structure
- `ChapterTemplate` renders topics as tabs
- Each topic contains an array of ContentBlocks
- Data-driven: Components render what JSON provides

### Testing Strategy
- **Unit:** Vitest for utilities in `tests/lib/`
- **E2E:** Playwright in `tests/e2e/`
- **Python:** pytest in `scripts/tests/`
- Coverage focused on `src/lib/` and `src/components/`

## Environment

- Node.js 20+, Python 3.11+
- Virtual environment: `.venv/` at root
- Tesseract OCR required for PDF processing
- Tailwind CSS v4 (no config file needed)

## Key Dependencies

**Web:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Vitest, Playwright, Framer Motion, KaTeX, Radix UI, Zod

**Python:** pdfplumber, pytesseract, pypdfium2, pandas, pytest
