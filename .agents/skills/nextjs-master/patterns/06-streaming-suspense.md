# Streaming with Suspense

Streaming allows you to progressively render and stream content from the server as it becomes available.

## Why Streaming?

- **Faster perceived performance**: Users see content faster
- **No waiting for slow data**: Fast parts render immediately
- **Better UX**: No blank pages while fetching

## Basic Suspense

```tsx
import { Suspense } from 'react';
import { ProductReviews } from './reviews';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <ProductDetails id={id} />
      
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={id} />
      </Suspense>
    </div>
  );
}

function ReviewsSkeleton() {
  return <div className="skeleton">Loading reviews...</div>;
}
```

## Suspense for Data Fetching

```tsx
import { Suspense } from 'react';

async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

async function UserProfile({ id }: { id: string }) {
  const user = await getUser(id);
  return <div>{user.name}</div>;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<UserSkeleton />}>
      <UserProfile id={id} />
    </Suspense>
  );
}

function UserSkeleton() {
  return <div className="animate-pulse">Loading...</div>;
}
```

## Streaming with loading.tsx

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="dashboard-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
}

// app/dashboard/page.tsx
export default async function Dashboard() {
  // This page streams after 1 second
  await new Promise(r => setTimeout(r, 1000));
  
  return <DashboardContent />;
}
```

## Parallel Data Fetching

```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function Page() {
  // Both start in parallel
  const postsData = getPosts();
  const usersData = getUsers();

  // Await both
  const [posts, users] = await Promise.all([postsData, usersData]);

  return (
    <div>
      <Posts data={posts} />
      <Users data={users} />
    </div>
  );
}
```

## Selective Streaming with Suspense Boundaries

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      {/* This renders immediately (no await) */}
      <Header />

      {/* This streams when ready */}
      <Suspense fallback={<SlowComponentSkeleton />}>
        <SlowComponent />
      </Suspense>

      {/* This also streams */}
      <Suspense fallback={<AnotherSkeleton />}>
        <AnotherComponent />
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  await new Promise(r => setTimeout(r, 2000));
  return <div>Slow content loaded!</div>;
}
```

## useStreaming

```tsx
'use client';

import { useStreaming } from 'next/streaming';

function Component() {
  const { data, isStreaming } = useStreaming();

  return (
    <div>
      {isStreaming ? 'Streaming...' : 'Ready'}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
}
```

## Error Handling with Streaming

```tsx
// app/products/[id]/page.tsx
import { Suspense, ErrorBoundary } from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <ProductHeader id={id} />

      <ErrorBoundary fallback={<ReviewsError />}>
        <Suspense fallback={<ReviewsSkeleton />}>
          <ProductReviews productId={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

## SEO with Streaming

Content in Suspense boundaries is:
- ✅ Crawled by Google (rendered on server)
- ⚠️ May not be in initial HTML (depends on implementation)

For critical SEO content, avoid Suspense or use `export const dynamic = 'force-static'`.

## Best Practices

1. **Wrap slow components** in Suspense
2. **Use meaningful skeletons** - show layout, not just spinner
3. **Stream at multiple levels** - granular boundaries are better
4. **Don't over-suspend** - only for genuinely slow data

## Further Reading

- [Next.js Streaming Docs](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
