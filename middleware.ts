import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Helper function to verify token
const verifyToken = async (token: string): Promise<boolean> => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return false;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = token && (await verifyToken(token));
  const { pathname } = request.nextUrl;

  // Protected routes - require authentication
  const protectedPaths = ['/profile', '/api/profile'];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  // Auth routes - only for non-authenticated users
  const authPaths = ['/login', '/register'];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Redirect authenticated users away from auth pages
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Redirect non-authenticated users away from protected pages
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/profile/:path*', '/api/profile/:path*', '/login', '/register'],
};
