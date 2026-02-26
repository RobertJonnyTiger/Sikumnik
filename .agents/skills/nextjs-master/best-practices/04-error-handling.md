# Error Handling

Next.js provides error boundaries for handling errors gracefully.

## Error Boundary (error.tsx)

```tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## 404 Page (not-found.tsx)

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

## Programmatic not-found()

```tsx
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  const post = await db.posts.find(slug);
  
  if (!post) {
    notFound();
  }
  
  return post;
}
```

## Loading UI (loading.tsx)

```tsx
export default function Loading() {
  return (
    <div className="skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-body" />
    </div>
  );
}
```

## Global Error (global-error.tsx)

```tsx
// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

## Error with HTTP Status

```tsx
// In a Route Handler
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await fetchData();
  
  if (!data) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(data);
}
```

## Error Handling in Server Actions

```tsx
'use server';

export async function createPost(formData: FormData) {
  try {
    await db.posts.create({
      title: formData.get('title'),
    });
    revalidatePath('/posts');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create post' };
  }
}
```

## Best Practices

1. Always include `reset()` in error boundaries
2. Log errors to monitoring (Sentry, etc.)
3. Create custom error pages for different error types
4. Use `not-found()` for missing resources

## Further Reading

- [Next.js Error Handling Docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
