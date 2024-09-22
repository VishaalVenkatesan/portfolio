import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    // If verification succeeds, allow access to the admin page
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login page on error
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware only to admin routes
};