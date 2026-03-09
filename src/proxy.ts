import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/dictionary', '/templates'];
const publicRoutes = ['/login', '/api/auth/login'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = req.cookies.get('session')?.value;
    let session = null;
    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (error) {
            // Invalid session
        }
    }

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // 5. Redirect to / if the user is authenticated but trying to access a public route (like login)
    if (
        isPublicRoute &&
        session &&
        !req.nextUrl.pathname.startsWith('/api')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
