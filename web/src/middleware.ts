import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define locked courses
    const lockedPaths = [
        '/courses/accounting',
        '/courses/microeconomics',
        '/courses/statistics'
    ];

    // Check if current path is a sub-path of a locked course (e.g. specific chapter)
    // We strictly check for the path followed by a slash to only lock children
    const isLocked = lockedPaths.some(path => pathname.startsWith(`${path}/`));

    // Allow next.js internals, api, static files
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
        return NextResponse.next();
    }

    if (isLocked) {
        // Determine where to redirect (e.g., to courses index or back to home)
        // For now, redirecting to /courses with a query param
        const url = request.nextUrl.clone();
        url.pathname = '/courses';
        url.searchParams.set('error', 'locked');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/courses/:path*',
    ],
};
