# Debugging & Troubleshooting

Common issues and how to solve them.

## Hydration Errors

### "Text content does not match server-rendered HTML"

**Cause:** Server and client produce different content.

**Solution:**
```tsx
// Use useEffect to render client-only content
'use client';
import { useEffect, useState } from 'react';

export function Time() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  if (!time) return null;
  
  return <p>{time}</p>;
}
```

### "There was an error while hydrating"

**Solution:** Use `suppressHydrationWarning`:

```tsx
<div suppressHydrationWarning>{content}</div>
```

## 500 Errors

### "Function movement should not be rendered on the client"

**Cause:** Using Server Action or async function in client component.

**Solution:**
- Move async logic to a Server Component
- Pass data as props from parent

## Route Not Found

### "404 on valid route"

**Check:**
1. File is named `page.tsx`
2. File is in `app/` directory
3. No typos in folder/file names

## Type Errors

### "async/await in client component"

**Solution:** Add `"use client"` only to components that need it, keep data fetching in Server Components.

## Build Errors

### "Module not found"

```bash
# Clear .next cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Performance Issues

### "Page is slow"

1. Check for large bundles: `npm run build` shows bundle sizes
2. Use dynamic imports for heavy components
3. Add Suspense boundaries
4. Optimize images with `next/image`

## Logging

```tsx
// Server-side
console.log('Server log:', data);

// Client-side  
console.log('Client log:', data);

// In error boundaries
useEffect(() => {
  console.error(error);
}, [error]);
```

## Dev Tools

- **React DevTools**: Inspect component tree
- **Network tab**: Check fetch requests
- **Console**: View logs and errors
- **Next.js DevTools**: Performance insights

## Common Error Messages

| Error | Solution |
|-------|----------|
| `window is not defined` | Check `typeof window` or use `"use client"` |
| `document is not defined` | Same as above |
| `Cannot read property of undefined` | Add null checks |
| `Invalid hook call` | Ensure `"use client"` is at top of file |

## Further Reading

- [Next.js Troubleshooting Docs](https://nextjs.org/docs/app/building-your-application/troubleshooting)
