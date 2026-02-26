# RSC Boundaries

Detect and prevent invalid patterns when crossing Server/Client component boundaries.

## Rule 1: Async Client Components Are Invalid

Client components **cannot** be async. Only Server Components can be async.

```tsx
// BAD: async client component
'use client'
export default async function UserProfile() {
  const user = await getUser() // Cannot await in client component!
  return <div>{user.name}</div>
}

// GOOD: Fetch in parent server component, pass data down

// page.tsx (Server Component)
export default async function Page() {
  const user = await getUser()
  return <UserProfile user={user} />
}

// UserProfile.tsx (Client Component)
'use client'
export function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>
}
```

## Rule 2: Non-Serializable Props

Props passed from Server → Client must be serializable.

```tsx
// BAD: Passing functions to client component
// page.tsx
import { ClientComponent } from './client';

function serverFn() { return 'data'; }

export default function Page() {
  return <ClientComponent handler={serverFn} />; // Error!
}

// BAD: Passing classes
export default function Page() {
  return <ClientComponent date={new Date()} />; // Error! Date not serializable
}

// GOOD: Pass serializable data
// page.tsx
export default async function Page() {
  const data = await getData();
  return <ClientComponent items={data.items} count={data.count} />;
}
```

## Rule 3: Server Actions in Client Components

Server Actions work differently with client components:

```tsx
// GOOD: Using server actions in client components
// actions.ts
'use server'
export async function submitForm(data: FormData) { ... }

// client.tsx
'use client'
import { submitForm } from './actions';

export function Form() {
  return <form action={submitForm}>...</form>
}
```

## Rule 4: Context Providers

Context cannot be used in Server Components:

```tsx
// BAD: Using context in server component
// page.tsx
import { ThemeContext } from './theme-provider';

export default function Page() {
  return (
    <ThemeContext.Provider value="dark">  // Error!
      <div>Content</div>
    </ThemeContext.Provider>
  );
}

// GOOD: Create a client provider component

// providers.tsx
'use client'
import { ThemeContext } from './theme-provider';

export function Providers({ children }) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

// layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return <Providers>{children}</Providers>;
}
```

## Rule 5: "use client" Placement

Once you use "use client", all parent components become client components:

```tsx
// If button.tsx has "use client":
// - button.tsx is a Client Component
// - Card.tsx that imports it becomes a Client Component too
// - page.tsx that imports Card.tsx becomes Client Component!

// Solution: Keep client components at leaf nodes

// app/
// ├── page.tsx (Server)           # Good: Server
// │   ├── Card.tsx (Server)       # Good: Server  
// │   └── Button.tsx (Client)    # Client leaf
```

## Common Patterns

| Scenario | Solution |
|----------|----------|
| Need state in page | Pass to client leaf component |
| Need context | Wrap in client Provider component |
| Need to fetch data | Fetch in Server Component, pass down |
| Need interactivity | Use "use client" only on interactive components |

## Linting

Enable ESLint rule for RSC boundaries:

```json
// .eslintrc
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

## Further Reading

- [Next.js RSC Boundaries](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
