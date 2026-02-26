# Caching Strategies

Next.js has a sophisticated caching system. Understanding it helps optimize performance.

## Fetch Caching

```tsx
// Default: cached forever (until revalidated)
const res = await fetch('https://api.example.com/data');

// Time-based revalidation (ISR)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }, // 1 hour
});

// No cache - always fresh
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
```

## Route Segment Cache

Use `export const dynamic = 'force-dynamic'` to force dynamic rendering:

```tsx
// app/page.tsx
export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await fetchFreshData();
  return <div>{data.time}</div>;
}
```

## Static vs Dynamic

| Option | Behavior |
|--------|----------|
| `force-static` | Static (cached, generated at build) |
| `force-dynamic` | Dynamic (rendered per request) |
| `default` | Uses fetch cache behavior |

## Router Cache

The client-side router caches pages:

```tsx
import { useRouter } from 'next/navigation';

function Component() {
  const router = useRouter();

  // Opt out of client-side prefetching
  return <Link href="/page" prefetch={false}>Page</Link>;

  // Hard refresh
  router.refresh(); // Re-fetches data on server
}
```

## Server Actions Cache

```tsx
'use server';

export async function getData() {
  // This can be cached based on arguments
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

// Revalidate after mutation
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/dashboard');
revalidateTag('posts');
```

## Image Caching

Images from `next/image` are optimized and cached:

```tsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={800}
  height={600}
/>
```

## Font Caching

`next/font` automatically caches Google Fonts:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Cache Tags

```tsx
// Tag a fetch request
const res = await fetch('https://api.com/data', {
  next: { tags: ['my-data'] },
});

// Revalidate by tag
import { revalidateTag } from 'next/cache';

revalidateTag('my-data');
```

## Best Practices

1. Use appropriate caching for each data type
2. Use tags for on-demand revalidation
3. Use `router.refresh()` to purge client cache
4. Be careful with sensitive data (don't cache auth tokens)

## Further Reading

- [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching)
