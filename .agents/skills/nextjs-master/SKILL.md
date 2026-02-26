---
name: nextjs-master
description: "Comprehensive Next.js guide covering App Router fundamentals, advanced patterns, and best practices. Use for Next.js 13+ development, migration from Pages Router, building with Server Components, streaming, parallel routes, caching, and optimization. Consolidates nextjs-app-router-fundamentals, nextjs-app-router-patterns, and next-best-practices."
---

# Next.js Master - Complete Guide

Comprehensive Next.js resource combining fundamentals, patterns, and best practices for modern Next.js development.

## When to Use This Skill

Use this skill when:
- Building Next.js 13+ applications with App Router
- Migrating from Pages Router to App Router
- Implementing Server Components and Client Components
- Working with layouts, parallel routes, intercepting routes
- Setting up data fetching, caching, and streaming
- Optimizing performance (bundling, images, fonts)
- Handling errors, loading states, and metadata
- Debugging common Next.js issues

## Quick Navigation

| Your Task | Go To |
|-----------|-------|
| Migrate from Pages Router | [Migration Guide](./fundamentals/migration.md) |
| Understand App Router basics | [Getting Started](./fundamentals/getting-started.md) |
| Server Components patterns | [Server Components](./patterns/server-components.md) |
| Parallel/Intercepting routes | [Advanced Routing](./patterns/parallel-routes.md) |
| Data fetching & caching | [Data & Caching](./best-practices/data-fetching.md) |
| Error handling | [Error Handling](./best-practices/error-handling.md) |
| Performance optimization | [Optimization](./best-practices/optimization.md) |
| Debug issues | [Debugging](./best-practices/debugging.md) |
| Quick reference | [Quick Reference](./references/quick-reference.md) |

## TypeScript: NEVER Use `any` Type

**CRITICAL RULE:** This codebase has `@typescript-eslint/no-explicit-any` enabled. Using `any` will cause build failures.

**WRONG:**
```typescript
function handleSubmit(e: any) { ... }
const data: any[] = [];
```

**CORRECT:**
```typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) { ... }
const data: string[] = [];
```

### Common Next.js Type Patterns

```typescript
// Page props (Next.js 15+)
function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}

// SearchParams (always async in Next.js 15+)
function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> })

// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// Server actions
async function myAction(formData: FormData) { ... }
```

## App Router vs Pages Router

### Pages Router (Legacy - Next.js 12 and earlier)
```
pages/
├── index.tsx              # Route: /
├── about.tsx              # Route: /about
├── _app.tsx               # Custom App component
├── _document.tsx          # Custom Document component
└── api/                   # API routes
    └── hello.ts           # API endpoint: /api/hello
```

### App Router (Modern - Next.js 13+)
```
app/
├── layout.tsx             # Root layout (required)
├── page.tsx               # Route: /
├── about/
│   └── page.tsx           # Route: /about
├── api/
│   └── route.ts            # Route Handler: /api/*
└── (marketing)/           # Route group (no URL impact)
    └── about/
        └── page.tsx       # Route: /about
```

## Key Concepts

### Server Components (Default)
- Components render on server by default
- Can use async/await for data fetching
- Cannot use hooks (useState, useEffect) or browser APIs
- Reduce client-side JavaScript

### Client Components
- Add `"use client"` at top of file
- Use hooks for interactivity
- Can use browser APIs
- Share less code with client

### Streaming & Suspense
- Stream content as it becomes available
- Show loading states while data fetches
- Improve perceived performance

### Parallel Routes
- Render multiple pages simultaneously
- Use for split views, modals, tabs

### Intercepting Routes
- Show modals while preserving context
- Allow deep linking to modal content
- Part of parallel routes pattern

---

## File Conventions Reference

| File | Purpose |
|------|---------|
| `page.tsx` | Route page (required for route) |
| `layout.tsx` | Shared UI for segment |
| `loading.tsx` | Loading UI (Suspense) |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |
| `route.ts` | Route Handler (API) |
| `middleware.ts` | Request middleware |
| `globals.css` | Global styles |

---

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build       # Production build
npm run start       # Start production

# Linting
npm run lint        # Run ESLint

# Testing
npm run test        # Run tests
```

---

## Sections Overview

### Fundamentals
- Getting Started with Next.js 13+
- Migration from Pages Router
- TypeScript patterns
- Layouts and nesting

### Patterns
- Server & Client Components
- Server Actions
- Parallel & Intercepting Routes
- Streaming with Suspense
- Route Handlers (API)
- Metadata & SEO

### Best Practices
- RSC Boundaries
- Data Fetching & Caching
- Error Handling
- Performance Optimization
- Debugging & Troubleshooting
