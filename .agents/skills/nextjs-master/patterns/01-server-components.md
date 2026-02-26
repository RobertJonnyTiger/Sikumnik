# Server Components

Server Components are the default in Next.js App Router. They run only on the server and never ship to the client.

## Key Points

- **Default**: All components are Server Components
- **Async**: Can use async/await for data fetching
- **No Hooks**: Cannot use useState, useEffect, or other hooks
- **No Browser APIs**: Cannot access window, document, localStorage

## When to Use Server Components

✅ Use Server Components for:
- Data fetching
- Accessing backend resources directly
- Keeping sensitive information on server (API keys, tokens)
- Large dependencies that shouldn't be sent to client
- Rendering static content

❌ Don't use Server Components for:
- Interactivity (onClick, onChange)
- State management (useState, useReducer)
- Browser-only APIs (localStorage, geolocation)
- Custom hooks that depend on state/effects

## Basic Server Component

```tsx
// app/page.tsx - Server Component by default
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Don't cache
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </main>
  );
}
```

## Server Component with Parameters

```tsx
// app/posts/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  return res.json();
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

## Fetching Multiple Data Sources

```tsx
// Fetch in parallel for performance
async function getUser(userId: string) {
  const res = await fetch(`https://api.example.com/users/${userId}`);
  return res.json();
}

async function getPosts(userId: string) {
  const res = await fetch(`https://api.example.com/users/${userId}/posts`);
  return res.json();
}

export default async function Page({ params }: Props) {
  const userId = '123';

  // Fetch in parallel - both start simultaneously
  const [user, posts] = await Promise.all([
    getUser(userId),
    getPosts(userId),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  );
}
```

## Passing Data to Client Components

```tsx
// app/page.tsx - Server Component
import { ClientComponent } from './client-component';

async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();

  // Pass serializable data to client component
  return <ClientComponent initialData={data} />;
}

// app/client-component.tsx - Client Component
'use client';

import { useState } from 'react';

interface Props {
  initialData: {
    items: string[];
  };
}

export function ClientComponent({ initialData }: Props) {
  const [items, setItems] = useState(initialData.items);

  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

## Client Component ("use client")

Add `"use client"` at the top of files that need:

```tsx
'use client';

import { useState, useEffect } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

## Mixing Server and Client Components

```tsx
// app/page.tsx
import { ServerComponent } from './server';
import { ClientComponent } from './client';

export default function Page() {
  return (
    <div>
      <ServerComponent />      {/* Server rendered */}
      <ClientComponent />      {/* Client rendered */}
    </div>
  );
}
```

## Server Component Boundary

When you use a Client Component, all parent components become client components:

```tsx
// app/page.tsx - SERVER
import { MyButton } from './button';

export default function Page() {
  return <MyButton />;  // MyButton is client, so this renders on client too
}

// app/button.tsx - CLIENT
'use client';

export function MyButton() {
  return <button>Click</button>;
}
```

Best practice: Keep client components at leaf nodes of your component tree.

## Serialization Rules

Data passed from Server to Client Components must be serializable:

✅ Serializable:
- Primitives (string, number, boolean)
- Arrays, Objects
- Maps, Sets (with caveats)
- Dates
- undefined, null

❌ Not Serializable:
- Functions
- Classes
- Error objects
- Symbols

```tsx
// WRONG - functions not serializable
<ClientComponent onSubmit={handleSubmit} />

// CORRECT - pass data, handle action in component
<ClientComponent formData={formData} />
```

## Further Reading

- [Next.js Server Components Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](./client-components.md)
