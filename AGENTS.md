# AGENTS.md - Agent Configuration for Sikumnik

This file provides essential context for AI coding agents operating in this repository.

## Project Overview

Sikumnik is a Hebrew education platform for university-level economics and accounting courses. The main application is in the `web/` directory.

## Build Commands

All commands run from the `web/` directory.

```bash
# Development
npm run dev          # Start dev server on port 3001

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Linting & Type Checking
npm run lint         # Run ESLint (uses eslint-config-next/core-web-vitals + typescript)

# Testing
npm run test                # Run all tests once
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage report
npx vitest run path/to/file.test.ts   # Run single test file
```

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.3
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Animation:** Framer Motion 12.34.0
- **UI Primitives:** Radix UI (Accordion, Slider, Tooltip, etc.)
- **Icons:** Lucide React
- **Math:** KaTeX (react-katex)
- **Testing:** Vitest 4.0.18, Playwright 1.58.2

## Code Style Guidelines

### TypeScript

- Strict mode is enabled in `tsconfig.json`
- Use `type` for unions, intersections, and primitives
- Use `interface` for object shapes and component props
- Always type function parameters and return values
- Enable `noUncheckedIndexedAccess` behavior mentally when accessing arrays
- Use `import { type ... }` for type-only imports

### Components

- Use `"use client"` directive for any component using hooks or browser APIs
- Name components in PascalCase: `ChapterTemplate.tsx`, `BlockRenderer.tsx`
- Use `React.forwardRef` for components that need refs:
  ```typescript
  const Card = React.forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => (
    <div ref={ref} {...props} />
  ));
  Card.displayName = "Card";
  ```
- Keep components focused - one component per file preferred

### File Naming

- Components: PascalCase (e.g., `DefinitionCard.tsx`)
- Utilities: kebab-case (e.g., `utils.ts`, `api-client.ts`)
- Pages: `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`

### Imports

- Use path alias: `@/` maps to `src/` (e.g., `@/components/core`)
- Import order:
  1. React/Next imports
  2. External libraries
  3. Internal imports (use `@/` alias)
  4. Type imports (use `import { type ... }`)
- Example:
  ```typescript
  import React from "react";
  import { motion } from "framer-motion";
  import { cn } from "@/lib/utils";
  import { type ChapterData } from "@/types/chapter";
  import { BlockRenderer } from "./BlockRenderer";
  ```

### Styling

- Tailwind CSS v4 uses CSS-first configuration in `globals.css`
- Define custom theme values in `@theme` block
- Use `cn()` utility from `@/lib/utils` for class merging
- Support RTL: components should work with `dir="rtl"`

### Comments

- Avoid adding comments unless explicitly requested
- Code should be self-documenting with clear naming

## Testing

### Framework

- Vitest with jsdom environment
- @testing-library/jest-dom for DOM assertions
- @testing-library/react for component testing

### Test File Location

- Put tests in `web/tests/` for integration tests
- Put unit tests alongside source: `src/**/*.test.ts`

### Test Naming

- Follow pattern: `filename.test.ts` or `filename.test.tsx`
- Use descriptive test names: `it("merges class names", ...)`

### Running Tests

```bash
npm run test                              # All tests
npx vitest run tests/lib/utils.test.ts   # Single file
npm run test:watch                       # Watch mode
npm run test:coverage                    # With coverage
```

## Project Structure

```
web/src/
├── app/                    # Next.js App Router pages
│   └── courses/           # Course pages (accounting, microeconomics, etc.)
├── components/
│   ├── core/              # Core components (ChapterTemplate, BlockRenderer)
│   │   ├── blocks/        # Content block components
│   │   └── interactive/   # Interactive domain components
│   ├── ui/                # Reusable UI primitives (Card, Badge, etc.)
│   └── layout/            # Layout components (Sidebar, Footer)
├── lib/                   # Utilities (utils.ts, api-client.ts)
├── types/                 # TypeScript type definitions
└── data/                  # JSON chapter data
```

## Important Conventions

### Content vs Code

- Course content (MDX, JSON data) is in **Hebrew**
- Code, comments, and variable names are in **English only**
- Do not translate or mix Hebrew into code files

### Chapter Data

- Chapters are defined as JSON in `data/chapters/[course]/`
- Use `ChapterData` type from `types/chapter.ts`
- Load with: `import chapterData from "@/data/chapters/..."`
- Cast: `const data = chapterData as unknown as ChapterData`

### Browser APIs

- Use `window` only in client components (after "use client")
- Check for `typeof window !== "undefined"` when needed in SSR

## Error Handling

- Use Next.js `error.tsx` for error boundaries at route segments
- Use `not-found.tsx` for 404 pages
- Log errors appropriately - don't expose sensitive data

## Environment

- Dev server runs on **port 3001** (not default 3000)
- Environment variables: check `.env` file
- Build output goes to `.next/` directory
