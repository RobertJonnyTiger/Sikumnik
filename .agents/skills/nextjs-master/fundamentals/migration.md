# Migration Guide: Pages Router to App Router

This guide helps you migrate from the legacy Pages Router to the modern App Router.

## Overview

Migration involves:
1. Understanding current Pages Router structure
2. Creating root layout
3. Migrating pages to routes
4. Updating navigation
5. Cleaning up legacy files

## Step 1: Understand Current Structure

Examine your existing setup:
- Read `pages/` directory structure
- Identify `_app.tsx` - handles global state, layouts, providers
- Identify `_document.tsx` - customizes HTML structure
- Note metadata usage (`next/head`, `<Head>` component)
- List all routes and dynamic segments

## Step 2: Create Root Layout

Create `app/layout.tsx` - **REQUIRED**:

```tsx
export const metadata = {
  title: 'My App',
  description: 'App description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Migration Notes:**
- Move `_document.tsx` HTML structure to `layout.tsx`
- Move `_app.tsx` global providers/wrappers to `layout.tsx`
- Convert `<Head>` metadata to `metadata` export
- The root layout **MUST** include `<html>` and `<body>` tags

## Step 3: Migrate Pages to Routes

### Simple Page Migration

```tsx
// Before: pages/index.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main>
        <h1>Welcome</h1>
      </main>
    </>
  );
}

// After: app/page.tsx
export const metadata = {
  title: 'Home Page',
};

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
}
```

### Dynamic Routes

```tsx
// Before: pages/posts/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export default function Post({ post }) {
  return <h1>{post.title}</h1>;
}

// After: app/posts/[slug]/page.tsx
async function getPost(slug: string) {
  // Direct database/API call
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <h1>{post.title}</h1>;
}
```

### API Routes

```tsx
// Before: pages/api/posts/[id].ts
export default function handler(req, res) {
  const { query: { id } } = req;
  // Handle request
  res.status(200).json({ id });
}

// After: app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  // Handle request
  return Response.json({ id });
}
```

## Step 4: Update Navigation

### Link Component

```tsx
// Before
import Link from 'next/link';
<Link href="/about" replace>About</Link>

// After - Same API
import Link from 'next/link';
<Link href="/about">About</Link>
```

### Programmatic Navigation

```tsx
// Before
import { useRouter } from 'next/router';
const router = useRouter();
router.push('/dashboard');
router.replace('/dashboard');

// After
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');
router.replace('/dashboard');

// Note: useRouter from 'next/router' is replaced by 'next/navigation'
```

### Router Events

```tsx
// Before - Listening to route changes
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyComponent() {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('App is navigating to:', url);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);
}

// After - Use usePathname
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function MyComponent() {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log('Current path:', pathname);
  }, [pathname]);
}
```

## Step 5: Clean Up Pages Directory

After migration:

1. Remove `pages/` directory (or rename to keep as backup)
2. Remove `_app.tsx` and `_document.tsx`
3. Remove `next.config.js` (or update for App Router)
4. Update `tsconfig.json` paths if needed

## Common Migration Pitfalls

### Pitfall 1: Forgetting Root Layout HTML Tags

The root layout MUST include `<html>` and `<body>`:

```tsx
// WRONG - will error
export default function RootLayout({ children }) {
  return <div>{children}</div>;  // Missing html/body!
}

// CORRECT
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Pitfall 2: Using `next/head` in App Router

```tsx
// WRONG - doesn't work in App Router
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      ...
    </>
  );
}

// CORRECT - use metadata export
export const metadata = {
  title: 'Title',
};

export default function Page() {
  return ...;
}
```

### Pitfall 3: Not Removing Pages Directory

If you keep `pages/` alongside `app/`, Next.js may get confused. Either:
- Delete `pages/` after migration
- Or explicitly set `future: { v5: true }` in next.config.js

### Pitfall 4: Missing `page.tsx` Files

Every route segment needs a `page.tsx`:

```
app/
├── page.tsx           // ✓ Required for /
├── about/
│   └── page.tsx      // ✓ Required for /about
└── blog/
    └── layout.tsx     // ✗ Missing page.tsx!
```

### Pitfall 5: Incorrect Link Usage

```tsx
// WRONG - anchor tag
<a href="/about">About</a>

// CORRECT - Link component
import Link from 'next/link';
<Link href="/about">About</Link>
```

## Migration Checklist

- [ ] Created `app/layout.tsx` with `<html>` and `<body>`
- [ ] Converted `_app.tsx` providers to root layout
- [ ] Converted metadata to `metadata` export
- [ ] Migrated all pages to `page.tsx` files
- [ ] Migrated API routes to `route.ts` files
- [ ] Updated Link components
- [ ] Updated router usage (`next/router` → `next/navigation`)
- [ ] Removed or migrated `pages/` directory
- [ ] Tested all routes work correctly

## Further Reading

- [Next.js Migration Docs](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Server Components](./../patterns/server-components.md)
- [Metadata API](./../patterns/metadata-seo.md)
