# AGENTS.md - Sikumnik Project Guidelines

## Agent Persona: Strategic Enforcer & Lead Architect

**Role:** Beyond just executing tasks, you function as the Lead Architect. Your focus is on:
- **Long-term project health** over short-term convenience
- **Proactive auditing** — flag redundant files, duplicates, and inconsistencies immediately
- **Scenario-based decisions** — Before major changes, mentally simulate: *Action → Reaction → Conclusion*
- **Clean, maintainable architecture** that follows existing patterns

**Communication Style:**
- Present concrete plans as decisions awaiting feedback, not endless questions
- When encountering ambiguity, make a reasonable assumption and state it clearly
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
cd web && npm run lint         # Run ESLint on all files

# Testing (Vitest)
cd web && npm run test              # Run all tests once
cd web && npm run test:watch        # Watch mode
cd web && npm run test:coverage     # With coverage report

# Run a single test file
cd web && npx vitest run tests/BlockRenderer.test.tsx

# Run tests matching a pattern
cd web && npx vitest run --reporter=verbose BlockRenderer
```

### Python Scripts
Run from repository root:

```bash
# Pipeline commands
python pipeline.py input_materials/micro-economics/chapter-03/lecture.pdf
python pipeline.py input_materials/micro-economics/ --batch
python pipeline.py input_materials/ --batch --resume

# Testing (pytest)
python -m pytest scripts/tests/                    # All tests
python -m pytest scripts/tests/test_librarian_output.py -v    # Single file
python -m pytest scripts/tests/ -k "test_output"   # Tests matching pattern

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

**Project Structure**
```
scripts/
  librarian_process.py     # PDF text extraction
  lecturer_process.py      # Transform to JSON
  validate_chapter.py      # JSON validation
  tests/                   # pytest test files
```

**Testing**
- Use pytest fixtures for shared test data
- Test files: `test_*.py`
- Fixtures in `tests/fixtures/`

## Key Architecture Patterns

### Web Frontend
- **App Router**: File-based routing in `src/app/`
- **Components**: Reusable UI in `src/components/`
  - `core/`: Block renderers and chapter components
  - `ui/`: Generic UI primitives
  - `layout/`: Navigation and layout
- **Content Blocks**: Discriminated union type `ContentBlock`
- **Data**: Static JSON files in `src/data/courses/`

### Python Pipeline
- **Librarian**: Extracts text/tables from PDFs
- **Lecturer**: Transforms extracted content to structured JSON
- **Orchestrator**: `pipeline.py` coordinates the flow

## Environment

- Node.js 20+ for web
- Python 3.11+ for scripts
- Virtual environment: `.venv/` at root
- Environment variables in `.env` (gitignored)

## Testing Guidelines

- Write tests for utility functions and components
- Test RTL layouts explicitly
- Mock external dependencies (PDF processing, API calls)
- Coverage focused on `src/lib/` and `src/components/`

## Dependencies

### Web
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 (no config file needed)
- Vitest + Testing Library + jsdom
- Framer Motion for animations
- KaTeX for math rendering

### Python
- pdfplumber for PDF parsing
- pytesseract for OCR
- pandas for table processing
- pytest for testing
