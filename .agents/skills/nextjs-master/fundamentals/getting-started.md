# Getting Started with Next.js 13+ App Router

Next.js 13 introduced the App Router - a new paradigm for building React applications with file-based routing.

## What is the App Router?

The App Router uses a file-system-based routing approach where:
- Folders define routes
- Files define UI components (pages, layouts, etc.)
- Special files handle specific behaviors

## Key Differences from Pages Router

| Feature | Pages Router | App Router |
|---------|-------------|------------|
| Routing | File-based in `pages/` | File-based in `app/` |
| Data Fetching | `getStaticProps`, `getServerSideProps` | `async/await` in components |
| Layouts | `_app.js` global | `layout.tsx` per segment |
| Metadata | `next/head` | `metadata` export |
| API Routes | `pages/api/*` | `app/*/route.ts` |
| Rendering | Client + Server | Server Components default |

## File Conventions

### Special Files

| File | Purpose |
|------|---------|
| `page.tsx` | Unique UI for a route |
| `layout.tsx` | Shared UI (preserves state) |
| `loading.tsx` | Loading UI with Suspense |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |
| `template.tsx` | Re-renders on navigation |
| `route.ts` | Route Handler (API) |

### Route Segments

```app/
├── page.tsx              # / (root)
├── about/
│   └── page.tsx         # /about
├── blog/
│   ├── page.tsx         # /blog
│   └── [slug]/
│       └── page.tsx     # /blog/:slug
└── products/
    ├── [[...slug]]/
    │   └── page.tsx     # /products/* (catch-all)
    └── page.tsx         # /products
```

### Colocation

- Components, tests, utils can be colocated in `app/`
- Only `page.tsx` and `route.ts` create public routes
- Other files are NOT accessible via URL

## Server Components by Default

In App Router, all components are Server Components unless you specify `"use client"`.

### Server Components (Default)
```tsx
// This runs on the server
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

### Client Components
```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## When to Use Each

### Use Server Components for:
- Data fetching
- Accessing backend resources directly
- Keeping sensitive info on server (API keys, etc.)
- Large dependencies that shouldn't be sent to client

### Use Client Components for:
- Interactivity (onClick, onChange)
- State and lifecycle (useState, useEffect)
- Browser-only APIs
- Custom hooks that depend on state/effects

## Getting Started

1. Create a new Next.js app:
```bash
npx create-next-app@latest my-app
```

2. Choose "Yes" for App Router when prompted

3. Start the dev server:
```bash
npm run dev
```

4. Visit `http://localhost:3000`

## Next Steps

- [Migration Guide](./migration.md) - Move from Pages Router
- [TypeScript Patterns](./typescript-patterns.md) - TypeScript best practices
- [Server Components](./../patterns/server-components.md) - Deep dive into RSC
