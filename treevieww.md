# Sikumnik Project Structure Tree View

## Overview

This document provides a detailed tree view of the specified paths in the Sikumnik project, a Hebrew education platform for university-level economics and accounting courses built with Next.js.

---

## Path: `web\src\app\(courses)`

This is a **Next.js Route Group** (denoted by parentheses). Route groups allow organizing routes without affecting the URL path.

```
web/src/app/(courses)/
└── courses/
    └── [courseId]/
        └── page.tsx           # Dynamic route for individual course pages
```

### Explanation
- `(courses)` - Route group (URL: not included in path)
- `courses/[courseId]/page.tsx` - Dynamic route that renders content based on `courseId` parameter

---

## Path: `web\src\app\courses`

This is the main courses directory containing all course pages. This affects the URL path `/courses`.

```
web/src/app/courses/
├── page.tsx                    # Main courses landing page (/courses)
├── accounting/
│   ├── page.tsx                # Accounting course home (/courses/accounting)
│   ├── loading.tsx             # Loading state
│   ├── error.tsx               # Error boundary
│   ├── chapter-0/
│   │   └── page.tsx            # Chapter 0 (/courses/accounting/chapter-0)
│   ├── chapter-1/
│   │   ├── layout.tsx          # Chapter layout
│   │   └── page.tsx            # Chapter 1 (/courses/accounting/chapter-1)
│   ├── chapter-2/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-3/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-4/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-5/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-6/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-7/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-8/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-9/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-10/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── chapter-11/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── chapter-12/
│       ├── layout.tsx
│       └── page.tsx
├── microeconomics/
│   ├── page.tsx                # Microeconomics home (/courses/microeconomics)
│   ├── chapter-1/
│   │   └── page.tsx            # (/courses/microeconomics/chapter-1)
│   ├── chapter-2/
│   │   └── page.tsx
│   ├── chapter-3/
│   │   └── page.tsx
│   ├── chapter-4/
│   │   └── page.tsx
│   ├── chapter-5/
│   │   └── page.tsx
│   ├── exam/
│   │   └── page.tsx            # (/courses/microeconomics/exam)
│   ├── equilibrium-table/
│   │   └── page.tsx            # (/courses/microeconomics/equilibrium-table)
│   └── market-shifts/
│       └── page.tsx            # (/courses/microeconomics/market-shifts)
├── organizational-behavior/
│   ├── page.tsx                # Organizational Behavior home
│   ├── chapter-1/
│   │   └── page.tsx
│   ├── chapter-2/
│   │   └── page.tsx
│   ├── chapter-3/
│   │   └── page.tsx
│   ├── chapter-4/
│   │   └── page.tsx
│   ├── chapter-5/
│   │   └── page.tsx
│   ├── chapter-6/
│   │   └── page.tsx
│   ├── chapter-7/
│   │   └── page.tsx
│   ├── summary/
│   │   └── page.tsx            # (/courses/organizational-behavior/summary)
│   ├── situational-leadership/
│   │   └── page.tsx            # (/courses/organizational-behavior/situational-leadership)
│   ├── diagnostic-workshop/
│   │   └── page.tsx            # (/courses/organizational-behavior/diagnostic-workshop)
│   └── exam-simulation/
│       └── page.tsx            # (/courses/organizational-behavior/exam-simulation)
└── math/
    └── chapter-1/
        └── page.tsx            # (/courses/math/chapter-1)
```

### Explanation
- **Accounting**: 13 chapters (0-12), each with optional layout.tsx for shared styling
- **Microeconomics**: 5 chapters + 3 additional pages (exam, equilibrium-table, market-shifts)
- **Organizational Behavior**: 7 chapters + 4 additional pages (summary, situational-leadership, diagnostic-workshop, exam-simulation)
- **Math**: 1 chapter currently

---

## Path: `web\src\app\math`

This is a separate math section (different from `/courses/math`).

```
web/src/app/math/
└── demo/
    └── page.tsx                # Demo page (/math/demo)
```

### Explanation
- This is a standalone `/math` route (not under `/courses`)
- Contains a demo subfolder with a page

---

## Path: `web\src\data\math`

This is the data directory for math content (JSON data files).

```
web/src/data/math/
└── index.ts                    # Math course data export
```

### Explanation
- Contains TypeScript file that exports math chapter data
- Data is loaded and cast to `ChapterData` type in components

---

## URL Path Summary

| Directory | URL Path |
|-----------|----------|
| `(courses)/courses/[courseId]` | `/courses/:courseId` |
| `courses/page.tsx` | `/courses` |
| `courses/accounting/chapter-N` | `/courses/accounting/chapter-N` |
| `courses/microeconomics/chapter-N` | `/courses/microeconomics/chapter-N` |
| `courses/organizational-behavior/chapter-N` | `/courses/organizational-behavior/chapter-N` |
| `courses/math/chapter-1` | `/courses/math/chapter-1` |
| `app/math/demo` | `/math/demo` |

---

## Architecture Notes

1. **Route Groups**: The `(courses)` folder uses Next.js route group syntax (parentheses) to organize routes without affecting URLs.

2. **Dynamic Routes**: `[courseId]` is a dynamic segment that captures URL parameters.

3. **Layouts**: Some chapters have `layout.tsx` files for shared UI across chapter pages.

4. **Special Files**: 
   - `page.tsx` - Route page component
   - `layout.tsx` - Shared layout wrapper
   - `loading.tsx` - Loading state component
   - `error.tsx` - Error boundary component

5. **Data Pattern**: Course content is stored in `web/src/data/` as JSON/TypeScript and loaded into page components.
