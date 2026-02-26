# Route Handlers (API Routes)

Route Handlers let you create API endpoints in your Next.js app.

## Basic Route Handler

Create `app/api/hello/route.ts`:

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello!' });
}
```

## HTTP Methods

```ts
export async function GET() {
  return NextResponse.json({ data: 'GET request' });
}

export async function POST() {
  return NextResponse.json({ data: 'POST request' });
}

export async function PUT() {
  return NextResponse.json({ data: 'PUT request' });
}

export async function DELETE() {
  return NextResponse.json({ data: 'DELETE request' });
}

export async function PATCH() {
  return NextResponse.json({ data: 'PATCH request' });
}
```

## Accessing Request Data

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const name = searchParams.get('name');

  return NextResponse.json({ id, name });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = body.name;

  return NextResponse.json({ received: name });
}
```

## Dynamic Segments

```ts
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const res = await fetch(`https://api.example.com/users/${id}`);
  const user = await res.json();

  return NextResponse.json(user);
}
```

## Query Parameters

```ts
// app/api/search/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const results = await searchArticles({ query, page, limit });

  return NextResponse.json(results);
}
```

## Headers

```ts
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');

  // Process headers
  return NextResponse.json({ auth: !!authHeader, ua: userAgent });
}
```

## Setting Headers

```ts
export async function GET() {
  const response = NextResponse.json({ ok: true });
  
  response.headers.set('X-Custom-Header', 'value');
  response.headers.set('Cache-Control', 's-maxage=3600');

  return response;
}
```

## Cookies

```ts
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  return NextResponse.json({ hasToken: !!token });
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('token', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
```

## Streaming (Server-Sent Events)

```ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const data = JSON.stringify({ count: i });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        await new Promise(r => setTimeout(r, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

## Error Handling

```ts
export async function GET(request: NextRequest) {
  try {
    const res = await fetch('https://api.example.com/data');
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Validation with Zod

```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = CreateUserSchema.safeParse(body);
  
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, age } = result.data;
  
  // Create user in database
  const user = await db.users.create({ name, email, age });

  return NextResponse.json(user, { status: 201 });
}
```

## CORS

```ts
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

## Route Handler vs API Routes

| Feature | Route Handler | Pages API |
|---------|---------------|-----------|
| Location | `app/api/*/route.ts` | `pages/api/*` |
| Default | Route.ts | `export default handler` |
| Request | NextRequest | req, res objects |
| Response | NextResponse | res.status().json() |
| Web Standards | ✅ Native | ❌ Next-specific |

## Further Reading

- [Next.js Route Handlers Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
