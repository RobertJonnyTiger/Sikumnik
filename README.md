# Sikumnik סיכומניק

Hebrew education platform for university-level economics, accounting, and organizational behavior.

## Quick Start

```bash
cd web
npm run dev
```

Visit `http://localhost:3001`

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 + Framer Motion 12.34.0
- **UI Primitives:** Radix UI (Headless)
- **Math:** KaTeX + react-katex (standard)
- **Icons:** Lucide React
- **Testing:** Vitest 4.0.18 + Playwright 1.58.2
- **Agent SDK:** Agentation 2.2.0

## Environment

- **Terminal:** **Windows PowerShell** (Strict).
- **Forbidden**: `ls` (use `dir`), `&&` (use `;`).

## Project Structure

```
web/src/
├── app/                    # Next.js App Router
│   └── courses/
│       ├── accounting/      # 13 chapters
│       ├── microeconomics/  # 6 chapters
│       └── organizational-behavior/ # 7 chapters
├── components/
│   ├── core/
│   │   ├── blocks/          # 25+ content block components
│   │   │   ├── DefinitionCard.tsx
│   │   │   ├── Explanation.tsx
│   │   │   ├── FormulaCard.tsx
│   │   │   └── ...
│   │   └── interactive/      # Domain-specific components
│   │       ├── accounting/
│   │       ├── microeconomics/
│   │       └── organizational-behavior/
│   ├── ui/                  # Reusable UI primitives
│   └── layout/              # Layout components
├── data/
│   └── [course]/chapters/   # JSON chapter data
└── types/
    └── chapter.ts           # ChapterData schema
```

## Adding a New Chapter (Math)

1. **Generate Data**: Use the `scripts/create-chapter.py` (if available) or create a JSON file in `web/src/data/chapters/math/chapter-N.json`.
2. **Registry**: Add the course to `web/src/data/courses/registry.ts` (if not already there).
3. **Dynamic Loading**: The platform automatically routes and loads chapters from the registry. No manual page creation is required for the Math course.

## Adding Chapters (Other Courses)
1. **Create data file:** `web/src/data/[course]/chapters/chapter-N.json`
2. **Create page:** `web/src/app/courses/[course]/chapter-N/page.tsx`

## Chapter Schema

Each chapter JSON follows this structure:

```json
{
  "id": "unique-chapter-id",
  "course": "חשבונאות",
  "chapterNumber": 3,
  "title": "Chapter Title",
  "topics": [
    {
      "id": "topic-1",
      "title": "Topic Title",
      "blocks": [
        { "type": "explanation", "content": "..." },
        { "type": "definition", "term": "...", "content": "..." },
        { "type": "formula", "formula": "...", "variables": [...] },
        { "type": "analogy", "content": "..." },
        { "type": "callout", "variant": "warning", "content": "..." }
      ]
    }
  ]
}
```

### Block Types

| Type | Purpose |
|------|---------|
| `explanation` | Core content |
| `definition` | Formal definitions with tooltips |
| `academic-definition` | Academic-style definitions |
| `formula` | Mathematical formulas |
| `analogy` | Real-world analogies |
| `tone-break` | Casual "street smart" explanations |
| `deep-dive` | Extended analysis |
| `example` | Worked examples |
| `real-world-example` | Practical examples |
| `common-mistake` | Error warnings |
| `mistake-card` | Mistake explanations |
| `checkpoint` | Quiz questions |
| `knowledge-challenge` | Interactive challenges |
| `guided-exercise` | Step-by-step exercises |
| `callout` | Info/warning boxes |
| `did-you-know` | Fun facts |
| `exam-tip` | Exam preparation tips |
| `exam-question` | Sample exam questions |
| `hook` | Attention-grabbing openings |
| `prerequisite` | Prerequisites |
| `chapter-image` | Images with captions |
| `list` | Styled lists |
| `maslow-pyramid` | Maslow hierarchy visualization |
| `narrative-summary` | Story-style summaries |
| `topic-summary` | Topic recaps |
| `topic-navigation` | In-topic navigation |

## Development

```bash
# Development (runs on port 3001)
npm run dev

# Build
npm run build

# Lint
npm run lint

# Test
npm run test         # Run all tests
npm run test:watch   # Watch mode
```

## Architecture

The platform uses a **Teaching-First** component system:
- `ChapterTemplate` renders dynamic tabs
- Content blocks are defined in JSON data
- Domain-specific components live in `interactive/`

## License

MIT
