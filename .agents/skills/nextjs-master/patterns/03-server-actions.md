# Server Actions

Server Actions let you call server functions directly from your components, without needing to create API routes.

## Defining Server Actions

```tsx
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // Server-side logic (database, etc.)
  await db.posts.create({ title, content });

  // Revalidate and redirect
  revalidatePath('/posts');
  redirect('/posts');
}
```

## Using in Forms

```tsx
// app/create-post/page.tsx
import { createPost } from '../actions';

export default function CreatePostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Validation with Zod

```tsx
// app/actions.ts
'use server';

import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10),
});

export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await db.posts.create(validatedFields.data);
  revalidatePath('/posts');
  return { success: true };
}
```

## Handling Form State

```tsx
// app/actions.ts
'use server';

export async function subscribe(prevState: any, formData: FormData) {
  const email = formData.get('email');

  if (!email || !email.includes('@')) {
    return { message: 'Invalid email' };
  }

  await db.subscribers.create({ email });
  return { message: 'Subscribed!' };
}

// app/subscribe/page.tsx
'use client';

import { useFormState } from 'react-dom';
import { subscribe } from '../actions';

const initialState = { message: null };

export function SubscribeForm() {
  const [state, formAction] = useFormState(subscribe, initialState);

  return (
    <form action={formAction}>
      <input name="email" type="email" placeholder="Email" />
      <button type="submit">Subscribe</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

## Async Actions

```tsx
'use server';

export async function fetchAndProcess(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  
  // Process data
  const processed = data.items.map((item: any) => ({
    ...item,
    processed: true,
  }));

  return processed;
}
```

## Calling Actions from Client Components

```tsx
'use client';

import { useTransition } from 'react';
import { deletePost } from './actions';

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await deletePost(postId);
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

## TypeScript with Actions

```tsx
'use server';

interface CreatePostInput {
  title: string;
  content: string;
  published: boolean;
}

export async function createPost(data: CreatePostInput) {
  // Type-safe access
  const { title, content, published } = data;
  
  await db.posts.create({
    title,
    content,
    published,
  });
  
  return { success: true };
}
```

## Best Practices

1. **Use 'use server' at top of file** for all actions, or mark individual functions
2. **Validate input** with Zod or similar
3. **Use revalidatePath/revalidateTag** after mutations
4. **Handle errors** and return meaningful error messages
5. **Prefer forms** for data mutations over API calls

## Further Reading

- [Next.js Server Actions Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
