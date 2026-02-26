# File Conventions Reference

Quick reference for Next.js App Router file conventions.

## Special Files

| File | Purpose |
|------|---------|
| `page.tsx` | Route page (required for accessible route) |
| `layout.tsx` | Shared UI wrapper (persists across navigation) |
| `loading.tsx` | Loading UI (wrapped in Suspense) |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |
| `route.ts` | API Route Handler |
| `middleware.ts` | Edge middleware |
| `global-error.tsx` | Global error boundary |
| `template.tsx` | Like layout but remounts on navigation |
| `default.tsx` | Fallback for parallel routes |

## Route Structure

```
app/
├── page.tsx                    # /
├── layout.tsx                  # Root layout
├── loading.tsx                 # Root loading
├── error.tsx                  # Root error
├── not-found.tsx              # Root 404
│
├── about/
│   ├── page.tsx               # /about
│   └── layout.tsx             # /about layout
│
├── posts/
│   ├── page.tsx               # /posts
│   └── [slug]/
│       ├── page.tsx           # /posts/:slug
│       └── loading.tsx        # /posts/:slug loading
│
├── (marketing)/               # Route group
│   ├── layout.tsx
│   └── about/
│       └── page.tsx           # /about (no /marketing in URL)
│
└── api/
    └── posts/
        └── [id]/
            └── route.ts       # /api/posts/:id
```

## Dynamic Routes

| Pattern | File | URL Example |
|---------|------|-------------|
| Single | `posts/[slug]/page.tsx` | `/posts/hello` |
| Multiple | `posts/[category]/[id]/page.tsx` | `/posts/tech/123` |
| Catch-all | `docs/[...slug]/page.tsx` | `/docs/a/b/c` |
| Optional | `docs/[[...slug]]/page.tsx` | `/docs` or `/docs/a` |

## File Extensions

| Extension | Purpose |
|-----------|---------|
| `.tsx` | TypeScript React components |
| `.ts` | TypeScript files (utilities, types) |
| `.js` | JavaScript files (less common) |
| `.jsx` | JavaScript React (avoid) |
| `.css` | CSS files |
| `.json` | JSON files |

## Naming Conventions

- Use `kebab-case` for folders: `my-feature/`
- Use `kebab-case` for files: `my-component.tsx`
- Use `PascalCase` for components: `MyComponent.tsx`
- Route files: always `page.tsx`, `layout.tsx`, `route.ts`

## Further Reading

- [Next.js File Conventions](https://nextjs.org/docs/app/building-your-application/routing)
