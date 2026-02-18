# AGENTS.md - Sikumnik Project Guidelines

## Agent Persona: Strategic Enforcer & Lead Architect

**Role:** Function as the Lead Architect focused on:
- **Long-term project health** over short-term convenience
- **Proactive auditing** — flag redundant files, duplicates, and inconsistencies immediately
- **Scenario-based decisions** — Before major changes, mentally simulate: *Action → Reaction → Conclusion*
- **Clean, maintainable architecture** following existing patterns

**Communication Style:**
- Present concrete plans as decisions awaiting feedback, not endless questions
- When encountering ambiguity, make reasonable assumptions and state them clearly
- Be decisive: "I'm implementing X because Y yields better long-term architecture"

## Project Overview

Sikumnik is an educational platform with:
- **Frontend**: Next.js 16 web app (Hebrew/RTL educational content)
- **Backend**: Python pipeline for PDF → JSON processing
- **Data**: Course materials in JSON format

## Build/Lint/Test Commands

### Web (Next.js)
All commands run from `web/` directory:

```bash
# Development
cd web && npm run dev          # Start dev server on port 3001

# Build
cd web && npm run build        # Production build

# Linting
cd web && npm run lint         # Run ESLint

# Unit Tests (Vitest)
cd web && npm run test                    # Run all tests once
cd web && npm run test:watch              # Watch mode
cd web && npm run test:coverage           # With coverage
cd web && npx vitest run tests/lib/utils.test.ts  # Single file
cd web && npx vitest run -t "test name"   # Tests matching pattern

# E2E Tests (Playwright)
cd web && npx playwright test                    # Run all E2E tests
cd web && npx playwright test tests/e2e/arcade-integration.spec.ts  # Single file
cd web && npx playwright test --headed           # Run with visible browser
cd web && npx playwright test --debug            # Debug mode
```

### Python Scripts
Run from repository root:

```bash
# Pipeline commands
python pipeline.py input_materials/micro-economics/chapter-03/lecture.pdf
python pipeline.py input_materials/micro-economics/ --batch
python pipeline.py input_materials/ --batch --resume

# Testing (pytest)
python -m pytest scripts/tests/                           # All tests
python -m pytest scripts/tests/test_librarian_output.py -v   # Single file
python -m pytest scripts/tests/ -k "test_output"          # Tests matching pattern
python -m pytest scripts/tests/::TestClass::test_method   # Single test method

# Validate chapter output
python scripts/validate_chapter.py courses/micro-economics/chapter-1/chapter.json
```

## Code Style Guidelines

### TypeScript/JavaScript

**Imports & Exports**
- Use `@/` alias for src imports: `import { Component } from "@/components/ui"`
- Group imports: React/Next → third-party → local
- Export named components, default only for pages

**Formatting**
- 4 spaces indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line

**Types**
- Strict TypeScript enabled
- Explicit return types on exported functions
- Use `type` for object shapes, `interface` for extensible contracts
- Place types in `src/types/` directory

**Naming Conventions**
- Components: PascalCase (`BlockRenderer.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`ContentBlock`)
- Constants: UPPER_SNAKE_CASE

**Components**
- Functional components with explicit `React.FC<Props>`
- Destructure props in function parameters
- Use "use client" for client components
- Server components by default (Next.js App Router)

**Error Handling**
- Use early returns for guard clauses
- Throw for unexpected errors, return null/undefined for expected misses
- Always handle async errors with try/catch

**RTL (Right-to-Left) Support**
- All UI must support Hebrew (RTL)
- Use `dir="rtl"` on html element (already set in layout)
- Test visual layouts in RTL mode

### Python

**Style**
- Follow PEP 8 with 4 spaces indentation
- Use type hints for function signatures
- Docstrings for modules, classes, and public functions
- Max line length: 88 characters (Black-compatible)

**Naming**
- Functions/variables: snake_case
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private methods: _leading_underscore

**Error Handling**
- Use exceptions for error conditions
- Always log errors with context
- Clean up resources in finally blocks

## Project Structure

```
web/
  src/
    app/                 # Next.js App Router
    components/
      core/              # Block renderers, chapter components
      ui/                # Generic UI primitives
      layout/            # Navigation, sidebar
      interactive/       # Interactive learning components
    types/               # TypeScript type definitions
    lib/                 # Utility functions
  tests/
    lib/                 # Vitest unit tests (*.test.ts)
    e2e/                 # Playwright E2E tests (*.spec.ts)

scripts/
  librarian_process.py   # PDF text extraction
  lecturer_process.py    # Transform to structured JSON
  validate_chapter.py    # JSON validation
  tests/                 # pytest test files (test_*.py)
```

## Key Architecture Patterns

### Web Frontend
- **App Router**: File-based routing in `src/app/`
- **Content Blocks**: Discriminated union type `ContentBlock` (see `src/types/chapter.ts`)
- **Data**: Static JSON files in `src/data/courses/`
- **Components**: Reusable blocks in `src/components/core/blocks/`

### Python Pipeline
- **Librarian**: Extracts text/tables from PDFs using pdfplumber + OCR
- **Lecturer**: Transforms extracted content to structured JSON
- **Orchestrator**: `pipeline.py` coordinates the flow

## Testing Guidelines

- **Unit tests**: Vitest for utilities/components in `web/tests/lib/`
- **E2E tests**: Playwright in `web/tests/e2e/`
- **Python tests**: pytest in `scripts/tests/`
- Test RTL layouts explicitly
- Mock external dependencies (PDF processing, API calls)
- Coverage focused on `src/lib/` and `src/components/`

## Environment

- Node.js 20+ for web
- Python 3.11+ for scripts
- Virtual environment: `.venv/` at root
- Environment variables in `.env` (gitignored)
- Tesseract OCR required for PDF processing (Windows path configured in scripts)

## Dependencies

### Web
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 (no config file needed)
- Vitest + Testing Library + jsdom
- Playwright for E2E testing
- Framer Motion for animations
- KaTeX for math rendering
- Radix UI for accessible components

### Python
- pdfplumber for PDF parsing
- pytesseract for OCR
- pypdfium2 for PDF rendering
- pandas for table processing
- pytest for testing
