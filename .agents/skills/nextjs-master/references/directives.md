# Directives Reference

Special directives in Next.js.

## "use client"

Marks a component as a Client Component (runs in browser):

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**When to use:**
- Using hooks (`useState`, `useEffect`, `useRef`)
- Using browser APIs (`window`, `document`)
- Event handlers (`onClick`, `onChange`)
- Custom hooks that use hooks

## "use server"

Marks a function as a Server Action (runs on server):

```tsx
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.posts.create({ title });
  revalidatePath('/posts');
}
```

**When to use:**
- Functions that need server-side logic
- Database operations
- Accessing secrets/env variables
- After mutations (revalidatePath, redirect)

## "use cache"

Cache the result of a function:

```tsx
'use cache';

export async function getExpensiveData() {
  const data = await expensiveComputation();
  return data;
}
```

## "use strict"

Not a Next.js directive, but TypeScript's strict mode is enabled.

## Directive Order

```tsx
'use client';
'use server';

import { useState } from 'react';
// ... component code
```

The order should be:
1. `'use client'` or `'use server'`
2. Import statements
3. Code

## Common Mistakes

❌ **Wrong:** Using server-side code in client component
```tsx
'use client';
const data = await fetchData(); // Error!
```

✅ **Correct:** Fetch in server, pass to client
```tsx
// Server: page.tsx
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// Client: component.tsx
'use client';
export function ClientComponent({ data }) {
  return <div>{data}</div>;
}
```

## Further Reading

- [Next.js Directives](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
