# Data Fetching & Caching

Learn how to fetch data efficiently in Next.js App Router.

## Basic Data Fetching

```tsx
// Server Components can use async/await directly
async function getData() {
  const res = await fetch('https://api.example.com/data');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

## Caching Behavior

By default, `fetch` requests are cached:

```tsx
// Cached by default (static)
const res = await fetch('https://api.example.com/data');

// Same as above explicitly
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
});
```

## Revalidation

### Time-based Revalidation (ISR)

```tsx
// Revalidate every 60 seconds
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // seconds
});
```

### On-demand Revalidation

```tsx
// Using revalidatePath
import { revalidatePath } from 'next/cache';

revalidatePath('/posts'); // Revalidate /posts route
revalidatePath('/posts/[slug]', 'page'); // Revalidate dynamic route
```

### Using Tags

```tsx
// Fetch with tag
const res = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] },
});

// Revalidate by tag
import { revalidateTag } from 'next/cache';

revalidateTag('posts'); // Revalidate all requests with tag 'posts'
```

## Dynamic Data

```tsx
// Don't cache - fetch on every request
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
```

## Parallel Fetching

```tsx
// Fetch multiple resources in parallel
async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

async function getPosts(userId: string) {
  const res = await fetch(`https://api.example.com/users/${userId}/posts`);
  return res.json();
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Start both requests simultaneously
  const [user, posts] = await Promise.all([
    getUser(id),
    getPosts(id),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  );
}
```

## Sequential Fetching

```tsx
// When one depends on the other
export default async function Page({ params }: Props) {
  const { slug } = await params;
  
  const user = await getUserBySlug(slug); // First
  const posts = await getPostsByUser(user.id); // Second (depends on user)

  return <div>...</div>;
}
```

## Suspense for Better UX

```tsx
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div>
      <Header /> {/* Loads immediately */}
      
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList /> {/* Streams when ready */}
      </Suspense>
    </div>
  );
}

async function PostsList() {
  const posts = await getPosts();
  return <ul>{posts.map(p => <li>{p.title}</li>)}</ul>;
}

function PostsSkeleton() {
  return <div>Loading posts...</div>;
}
```

## Route Handler Data

```tsx
// app/api/data/route.ts
export async function GET() {
  const data = await fetchData();
  return Response.json(data);
}

// Client component
'use client';
import useSWR from 'swr';

function Component() {
  const { data, error } = useSWR('/api/data', fetcher);
  // ...
}
```

## Error Handling

```tsx
async function getData() {
  try {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Handle network errors
    console.error('Fetch failed:', error);
    throw error;
  }
}

export default async function Page() {
  try {
    const data = await getData();
    return <div>{data.title}</div>;
  } catch (error) {
    return <div>Error loading data</div>;
  }
}
```

## Best Practices

1. **Fetch in Server Components** when possible
2. **Use parallel fetching** for independent data
3. **Add revalidation** for dynamic content
4. **Use Suspense** for slow data
5. **Handle errors** gracefully

## Further Reading

- [Next.js Data Fetching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching)
