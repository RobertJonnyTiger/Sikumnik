# Sikumnik סיכומניק

Hebrew education platform for university-level economics and accounting.

## Quick Start

```bash
cd web
npm run dev
```

Visit `http://localhost:3000`

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Math:** KaTeX for LaTeX rendering
- **Icons:** Lucide React

## Project Structure

```
web/src/
├── app/                    # Next.js routes
│   └── courses/
│       ├── accounting/     # 12 chapters
│       └── microeconomics/ # 5 chapters
├── components/
│   └── core/
│       ├── blocks/         # 13 content block components
│       │   ├── DefinitionCard.tsx
│       │   ├── Explanation.tsx
│       │   ├── DeepDive.tsx
│       │   └── ...
│       └── interactive/    # Domain-specific components
│           └── accounting/
├── data/
│   └── chapters/
│       ├── accounting/    # JSON chapter data
│       └── microeconomics/
└── types/
    └── chapter.ts         # ChapterData schema
```

## Adding a New Chapter

1. **Create data file:** `data/chapters/[course]/chapter-N.json`
2. **Use schema:** See `types/chapter.ts` for the ChapterData interface
3. **Create page:** `app/courses/[course]/chapter-N/page.tsx`

```tsx
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/[course]/chapter-N.json";

export default function ChapterNPage() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
```

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
| `formula` | Mathematical formulas |
| `analogy` | Real-world analogies |
| `tone-break` | Casual "street smart" explanations |
| `deep-dive` | Extended analysis |
| `example` | Worked examples |
| `common-mistake` | Error warnings |
| `checkpoint` | Quiz questions |
| `guided-exercise` | Step-by-step exercises |
| `callout` | Info/warning boxes |

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Architecture

The platform uses a **Teaching-First** component system:
- `ChapterTemplate` renders dynamic tabs
- Content blocks are defined in JSON data
- Domain-specific components live in `interactive/`

## License

MIT
