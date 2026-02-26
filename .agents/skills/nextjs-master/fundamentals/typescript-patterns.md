# TypeScript Patterns for Next.js

This guide covers TypeScript patterns specific to Next.js App Router.

## Critical Rule: No `any`

This codebase has `@typescript-eslint/no-explicit-any` enabled. Using `any` will cause build failures.

```tsx
// WRONG
function handleSubmit(e: any) { ... }
const data: any[] = [];

// CORRECT
function handleSubmit(e: React.FormEvent<HTMLFormElement>) { ... }
const data: string[] = [];
```

## Page Props

### Next.js 14 and earlier

```tsx
function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = params;
  const { q } = searchParams;
  return <div>{slug} - {q}</div>;
}
```

### Next.js 15+ (Async Params)

In Next.js 15, `params` and `searchParams` are **Promises**:

```tsx
// Next.js 15+
function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { q } = await searchParams;
  return <div>{slug} - {q}</div>;
}
```

## Form Events

```tsx
"use client";

import { FormEvent, ChangeEvent } from 'react';

// Form submission
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  // Handle form
}

// Input change
function handleChange(e: ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}

// JSX
<form onSubmit={handleSubmit}>
  <input type="text" onChange={handleChange} />
</form>
```

## Server Actions

```tsx
"use server";

async function myAction(formData: FormData) {
  const email = formData.get('email');
  // Process form data
  return { success: true };
}

// With typed arguments
interface ActionArgs {
  email: string;
  name: string;
}

async function createUser(data: ActionArgs) {
  // Validate and process
  return { id: '123' };
}
```

## Route Handler Types

```tsx
// GET request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return Response.json({ id });
}

// POST request
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ success: true });
}

// With typed response
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function GET(): Promise<Response> {
  const response: ApiResponse<{ name: string }> = {
    data: { name: 'John' }
  };
  return Response.json(response);
}
```

## Dynamic Routes

```tsx
// Single segment: app/posts/[slug]/page.tsx
function Page({ params }: { params: { slug: string } }) { }

// Multiple segments: app/posts/[category]/[id]/page.tsx
function Page({ params }: { params: { category: string; id: string } }) { }

// Catch-all: app/docs/[...slug]/page.tsx
function Page({ params }: { params: { slug: string[] } }) { }

// Optional catch-all: app/docs/[[...slug]]/page.tsx
function Page({ params }: { params: { slug?: string[] } }) { }
```

## Typed Links

```tsx
import Link from 'next/link';
import { Route } from 'next';

// Type-safe routes
<Link href="/dashboard">Dashboard</Link>
<Link href={`/posts/${slug}`}>Post</Link>

// For complex routes, use template literals
type PostRoute = `/posts/${string}`;
const postLink: PostRoute = `/posts/${slug}`;
```

## useRouter & usePathname

```tsx
"use client";

import { useRouter, usePathname } from 'next/navigation';

function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push('/dashboard');
    router.replace('/dashboard'); // Without history
    router.refresh(); // Refresh data
  };

  return (
    <nav>
      <span>Current: {pathname}</span>
      <button onClick={handleClick}>Go</button>
    </nav>
  );
}
```

## generateStaticParams (SSG)

```tsx
// Generate static paths
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// With multiple segments
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    category: product.category,
    id: product.id,
  }));
}
```

## Metadata Types

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Site Title',
    template: '%s | Site Title',
  },
  description: 'Description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

## Component Props

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={variant}
    >
      {children}
    </button>
  );
}
```

## Generic Components

```tsx
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List 
  items={posts} 
  renderItem={(post) => <span>{post.title}</span>}
/>
```
