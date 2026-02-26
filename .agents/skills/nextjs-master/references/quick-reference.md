# Quick Reference

Quick lookup for common Next.js patterns and commands.

## Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run dev -p 3001     # Custom port
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Type checking
npx tsc --noEmit         # TypeScript check
npx next lint            # Next.js linting

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage
```

## File Structure

```
app/
├── page.tsx              # Route: /
├── layout.tsx            # Root layout (required)
├── loading.tsx           # Loading UI
├── error.tsx             # Error boundary
├── not-found.tsx         # 404 page
├── global.css           # Global styles
├── favicon.ico           # Favicon
│
├── (marketing)/          # Route group (no URL)
│   ├── layout.tsx        # Group-specific layout
│   └── about/
│       └── page.tsx     # /about
│
├── dashboard/            # /dashboard
│   ├── page.tsx
│   └── loading.tsx
│
├── posts/                # /posts
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx     # /posts/:slug
│
└── api/                  # API routes
    └── route.ts         # Handler for /api/*
```

## Route Types

| Pattern | File | URL Example |
|---------|------|-------------|
| Static | `about/page.tsx` | `/about` |
| Dynamic | `posts/[slug]/page.tsx` | `/posts/hello` |
| Catch-all | `docs/[...slug]/page.tsx` | `/docs/a/b/c` |
| Optional | `docs/[[...slug]]/page.tsx` | `/docs` or `/docs/a` |
| Group | `(marketing)/page.tsx` | `/` |

## Special Components

### Link
```tsx
import Link from 'next/link';

<Link href="/about">About</Link>
<Link href={`/posts/${slug}`}>{title}</Link>
<Link href="/dashboard" replace>No history</Link>
```

### Image (next/image)
```tsx
import Image from 'next/image';

<Image 
  src="/photo.jpg" 
  alt="Description"
  width={400}
  height={300}
/>
```

### Script (next/script)
```tsx
import Script from 'next/script';

<Script 
  src="https://analytics.js" 
  strategy="afterInteractive"
/>
```

## Data Fetching

```tsx
// Server Component - fetch
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}

// With caching
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',  // Dynamic
  next: { revalidate: 60 }, // ISR every 60s
});
```

## Server Actions

```tsx
// Define
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  // Database operation
  revalidatePath('/posts');
  redirect('/posts');
}

// Use in form
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

## Error Handling

```tsx
// error.tsx
'use client';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000  # Client + Server
API_SECRET=secret-only-server                # Server only
```

```tsx
// Access
process.env.NEXT_PUBLIC_API_URL  // Works in client
process.env.API_SECRET           // Server only
```

## CSS / Tailwind

```tsx
// Import global CSS
import './globals.css';

// Use Tailwind (no import needed in v4)
// Just use classes
<div className="p-4 bg-blue-500">Content</div>
```

## Common Patterns

### Client Component
```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Server Component with Data
```tsx
async function getData() { /* fetch */ }

export default async function Page() {
  const data = await getData();
  return <div>{data.content}</div>;
}
```

### Streaming
```tsx
import { Suspense } from 'react';

<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```
