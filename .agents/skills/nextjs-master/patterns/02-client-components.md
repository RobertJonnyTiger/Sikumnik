# Client Components

Client Components enable interactivity in your app. Use `"use client"` to mark components that need browser APIs, hooks, or user interaction.

## When to Use Client Components

Use Client Components when you need:
- **Interactivity**: onClick, onChange, onSubmit handlers
- **State**: useState, useReducer
- **Effects**: useEffect, useLayoutEffect
- **Browser APIs**: window, document, localStorage, geolocation
- **Custom Hooks** that use hooks internally

## Basic Client Component

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Forms and Inputs

```tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Submit to server action or API
    await submitForm({ name });
    
    setIsSubmitting(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

## Using Browser APIs

```tsx
'use client';

import { useEffect, useState } from 'react';

export function Geolocation() {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
        },
        (error) => {
          setLocation('Unable to get location');
        }
      );
    }
  }, []);

  return <p>Location: {location || 'Loading...'}</p>;
}
```

## Local Storage

```tsx
'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## Event Listeners

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function ClickOutside() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('Clicked outside');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return <div ref={ref}>Content</div>;
}
```

## Interfacing with Server Actions

```tsx
'use client';

'use client';

import { useState } from 'react';
import { createPost } from '@/app/actions';

export function CreatePostForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    await createPost(formData);
    setPending(false);
  }

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Title" />
      <button type="submit" disabled={pending}>
        {pending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

## Client Components in Server Pages

```tsx
// app/page.tsx - Server Component
import { Counter } from './counter';

export default function Page() {
  return (
    <main>
      <h1>Welcome</h1>
      <Counter />  {/* Client Component used in Server Component */}
    </main>
  );
}

// app/counter.tsx - Client Component  
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Performance Tip: Keep Client Components at Leaves

```
✅ GOOD - Server parent, Client leaves
app/
├── page.tsx (Server)           # Renders on server
│   ├── Header.tsx (Server)     # Renders on server  
│   └── Counter.tsx (Client)    # Hydrates only this

❌ BAD - Unnecessary client rendering
app/
├── page.tsx (Client)          # Entire page hydrates
│   ├── Header.tsx (Client)    
│   └── Counter.tsx (Client)
```

## Further Reading

- [Server Components](./01-server-components.md)
- [Server Actions](./server-actions.md)
- [Next.js Docs](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
