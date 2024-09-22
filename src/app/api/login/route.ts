"use server";
import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface LoginRequest {
  userId: string;
  email: string;
}

interface JWTPayload {
  userId: string;
  email: string;
  [key: string]: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId, email }: LoginRequest = await request.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Include permissions in the JWT payload
    const token = await new SignJWT({
      userId,
      email,
    } as JWTPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('72h')
      .sign(secret);

    // Verify the token
    try {
      await jwtVerify(token, secret);
    } catch (verifyError) {
      console.error("Error verifying JWT:", verifyError);
      return NextResponse.json({ error: 'Failed to create a valid token' }, { status: 500 });
    }

    cookies().set('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 24 * 3, 
      path: '/'
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}