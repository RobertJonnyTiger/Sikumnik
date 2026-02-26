# Intercepting Routes

Intercepting Routes allow you to show a route in the current context (like a modal) while allowing deep linking to the full page.

## The Problem

You want:
- `/photos/123` to show full page when accessed directly
- Clicking a photo from the feed shows it in a modal
- URL still shows `/photos/123` when viewing modal

## Solution: Intercepting + Parallel Routes

```
app/
├── layout.tsx                    # Root layout
├── @modal/                      # Parallel route for modals
│   ├── default.tsx              # Nothing when no modal
│   └── (.)photos/              # Intercepting segment
│       └── [id]/
│           └── page.tsx        # Modal version of /photos/[id]
├── photos/
│   ├── page.tsx                # /photos - gallery
│   └── [id]/
│       └── page.tsx            # /photos/[id] - full page
└── page.tsx                    # Home
```

## How It Works

1. User visits `/photos` → renders `photos/page.tsx`
2. User clicks photo → navigates to `/photos/123`
3. Intercepting route catches this → renders `@modal/(.)photos/[id]/page.tsx`
4. User refreshes on `/photos/123` → renders `photos/[id]/page.tsx` (full page)

## Intercepting Segment Syntax

| Syntax | Meaning |
|--------|---------|
| `(.)photos` | Intercept at this level |
| `(..)photos` | Intercept one level up |
| `(...)photos` | Intercept from root |
| `(..)(..)photos` | Intercept two levels up |

## Example: Photo Gallery with Modal

```
app/
├── @modal/
│   ├── default.tsx
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx
├── photos/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── layout.tsx
```

```tsx
// app/@modal/(.)photos/[id]/page.tsx
import { Dialog } from '@/components/dialog';
import { PhotoViewer } from '@/components/photo-viewer';

export default function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Dialog>
      <PhotoViewer id={id} />
    </Dialog>
  );
}
```

```tsx
// app/photos/[id]/page.tsx
import { PhotoViewer } from '@/components/photo-viewer';

export default function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <PhotoViewer id={id} />;
}
```

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
```

## Combined with Parallel Routes

Intercepting routes often work with parallel routes for more complex UIs:

```
app/
├── @modal/
│   ├── default.tsx
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx      # Modal version
├── photos/
│   ├── page.tsx              # Gallery
│   ├── layout.tsx
│   └── [id]/
│       └── page.tsx          # Full page version
└── layout.tsx
```

## Closing the Modal

When closing a modal, you often want to go back to the previous route:

```tsx
// In your modal component
'use client';

import { useRouter } from 'next/navigation';

function Modal({ children }) {
  const router = useRouter();

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  );
}
```

## Use Cases

- **Photo galleries**: Lightbox modal, deep-linkable
- **Login forms**: Popup login, full page fallback
- **Product details**: Quick view, full product page
- **Comments**: Inline expansion, full thread

## Further Reading

- [Next.js Intercepting Routes Docs](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
