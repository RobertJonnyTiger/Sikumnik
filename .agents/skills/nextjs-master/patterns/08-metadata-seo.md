# Metadata and SEO

Next.js provides a Metadata API for managing SEO, social sharing, and more.

## Static Metadata

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  keywords: ['about', 'company', 'team'],
};

export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

## Dynamic Metadata

```tsx
// app/posts/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}
```

## Metadata Type

```ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My Website',
    template: '%s | My Website',  // Dynamic titles
  },
  description: 'Description of my website',
  viewport: 'width=device-width, initial-scale=1',
  generator: 'Next.js',
  applicationName: 'My App',
  referrer: 'origin-when-cross-origin',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  publisher: 'My Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
```

## Open Graph

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'My Article',
    description: 'Article description',
    url: 'https://mywebsite.com/article',
    siteName: 'My Website',
    locale: 'en_US',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    authors: ['John Doe'],
    images: [
      {
        url: 'https://mywebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image alt text',
      },
    ],
  },
};
```

## Twitter Cards

```tsx
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'My Article',
    description: 'Article description',
    creator: '@username',
    images: ['https://mywebsite.com/twitter-image.jpg'],
  },
};
```

## Robots

```tsx
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

## Favicon

```tsx
// app/layout.tsx
export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};
```

## Alternates (i18n)

```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://mywebsite.com/about',
    languages: {
      en: 'https://mywebsite.com/about',
      he: 'https://mywebsite.com/he/about',
      es: 'https://mywebsite.com/es/about',
    },
  },
};
```

## Metadata and Streaming

When using Suspense, use a separate Metadata export:

```tsx
// This works with Suspense
export const metadata: Metadata = {
  title: 'Page Title',
};

export default function Page() {
  return <Suspense>{/* ... */}</Suspense>;
}
```

## Viewport (deprecated in newer Next.js)

```tsx
// In newer Next.js, viewport is set in layout.tsx directly
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
```

## Best Practices

1. **Always include title and description** - Critical for SEO
2. **Use Open Graph** - Better social sharing previews
3. **Use dynamic metadata** - For user-generated content
4. **Use image dimensions** - Prevent layout shift
5. **Use canonical URLs** - Prevent duplicate content issues

## Further Reading

- [Next.js Metadata API Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
