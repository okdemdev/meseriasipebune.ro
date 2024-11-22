import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the auth token cookie with proper settings
  response.cookies.set({
    name: 'auth-token',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
}
