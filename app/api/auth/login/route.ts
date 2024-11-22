import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Professional from '@/lib/models/professional';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    await dbConnect();
    const { email, password } = await req.json();

    // Find professional by email
    const professional = await Professional.findOne({ email });
    if (!professional) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password
    const isMatch = await professional.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT token with type assertion for the secret
    const token = jwt.sign({ id: professional._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    // Update cookie settings for better security
    const response = NextResponse.json({
      success: true,
      professional: {
        id: professional._id,
        name: professional.name,
        email: professional.email,
        profileImage: professional.profileImage,
      },
    });

    // Set cookie with consistent settings
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
