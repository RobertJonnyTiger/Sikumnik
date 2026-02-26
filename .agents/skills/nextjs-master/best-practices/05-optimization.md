# Performance Optimization

Optimize your Next.js app for better performance.

## Image Optimization

```tsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // Load this image immediately
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Font Optimization

```tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Script Optimization

```tsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Load after page becomes interactive */}
      <Script 
        src="https://analytics.com/script.js"
        strategy="afterInteractive"
      />
      
      {/* Load in web worker (Partytown) */}
      <Script 
        src="https://third-party.com/script.js"
        strategy="worker"
      />
    </>
  );
}
```

## Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // Disable SSR for this component
  }
);

export default function Page() {
  return <HeavyComponent />;
}
```

## Route Prefetching

```tsx
import Link from 'next/link';

export default function Page() {
  return (
    <>
      {/* Prefetch enabled by default */}
      <Link href="/page">Page</Link>
      
      {/* Disable prefetch */}
      <Link href="/page" prefetch={false}>Page</Link>
    </>
  );
}
```

## Static Generation

```tsx
// Force static generation
export const dynamic = 'force-static';

// Or use generateStaticParams for dynamic routes
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

## Bundle Analysis

```bash
# Analyze bundle
npm run build
# or
npx @next/bundle-analyzer
```

## Core Web Vitals

Focus on these metrics:
- **LCP**: Largest Contentful Paint (image loading)
- **FID**: First Input Delay (JS execution)
- **CLS**: Cumulative Layout Shift (image sizes)

## Best Practices

1. Use `next/image` for all images
2. Use `next/font` for fonts
3. Lazy load heavy components
4. Optimize third-party scripts
5. Use static generation when possible

## Further Reading

- [Next.js Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
