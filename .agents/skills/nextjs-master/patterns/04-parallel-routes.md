# Parallel Routes

Parallel Routes allow you to render multiple page slices simultaneously in the same layout.

## Use Cases

- Dashboards with multiple independent sections
- Social media feeds (main content + sidebar)
- Modal overlays that persist across navigation
- Split-view layouts (list + detail)

## Basic Parallel Routes

Create parallel routes using folder names starting with `@`:

```
app/
├── layout.tsx
├── page.tsx
├── @analytics/
│   └── page.tsx        # Renders alongside main page
└── @sidebar/
    └── page.tsx        # Renders alongside main page
```

```tsx
// app/layout.tsx
export default function Layout({
  children,
  analytics,
  sidebar,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <aside>{sidebar}</aside>
      <div className="analytics">{analytics}</div>
    </div>
  );
}
```

## With Dynamic Segments

```
app/
├── @modal/
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx   # /photos/[id] in modal
├── photos/
│   └── [id]/
│       └── page.tsx       # /photos/[id] standalone
└── layout.tsx
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

## Intercepting Routes

Combined with parallel routes for modal patterns:

```
app/
├── @modal/
│   ├── default.tsx         # Default: no modal
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx   # Intercepted: /photos/[id] shows as modal
├── photos/
│   ├── page.tsx           # /photos - gallery
│   ├── layout.tsx
│   └── [id]/
│       └── page.tsx       # /photos/[id] - full page
└── layout.tsx
```

## Default.tsx Fallback

For when a parallel route has no matching URL:

```tsx
// app/@sidebar/default.tsx
export default function SidebarDefault() {
  return (
    <aside className="default-sidebar">
      <p>Select an item</p>
    </aside>
  );
}
```

## State Preservation

Parallel routes preserve state when navigating:

```tsx
// If sidebar has a collapsible section, 
// it stays open when main content changes
// because sidebar doesn't re-render
```

## Loading States

```tsx
// app/@feed/loading.tsx
export default function FeedLoading() {
  return <div className="skeleton-feed">Loading feed...</div>;
}

// app/@sidebar/loading.tsx
export default function SidebarLoading() {
  return <div className="skeleton-sidebar">Loading sidebar...</div>;
}
```

## Error Handling

```tsx
// app/@feed/error.tsx
'use client';

export default function FeedError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Error loading feed</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

## Real-World Example: Dashboard

```
app/
├── dashboard/
│   ├── layout.tsx         # Dashboard layout
│   ├── page.tsx           # Main dashboard content
│   ├── @metrics/
│   │   ├── page.tsx      # Metrics panel
│   │   └── loading.tsx
│   ├── @notifications/
│   │   ├── page.tsx     # Notifications
│   │   └── loading.tsx
│   └── @activity/
│       ├── page.tsx     # Activity feed
│       └── loading.tsx
└── layout.tsx
```

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  metrics,
  notifications,
  activity,
}: {
  children: React.ReactNode;
  metrics: React.ReactNode;
  notifications: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <header>Dashboard</header>
      <div className="grid">
        <main>{children}</main>
        <aside className="metrics">{metrics}</aside>
        <aside className="notifications">{notifications}</aside>
        <aside className="activity">{activity}</aside>
      </div>
    </div>
  );
}
```

## Further Reading

- [Next.js Parallel Routes Docs](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
