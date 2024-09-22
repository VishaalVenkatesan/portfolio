"use server";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().delete('auth');
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}