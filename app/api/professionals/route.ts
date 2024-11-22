import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Professional from '@/lib/models/professional';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Check if professional already exists
    const existingProfessional = await Professional.findOne({ email: body.email });
    if (existingProfessional) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Create the professional
    const professional = await Professional.create(body);

    // Create JWT token with consistent secret
    const token = jwt.sign({ id: professional._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Create response with consistent cookie settings
    const response = NextResponse.json(
      {
        success: true,
        professional: {
          id: professional._id,
          name: professional.name,
          email: professional.email,
          profileImage: professional.profileImage,
        },
      },
      { status: 201 }
    );

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
    console.error('Failed to create professional:', error);
    return NextResponse.json({ error: 'Failed to create professional' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const query: any = {};
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const rating = searchParams.get('rating');
    const search = searchParams.get('search');

    if (city) query.city = city.toLowerCase();
    if (category) query.category = category.toLowerCase();
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (search) query.name = { $regex: search, $options: 'i' };

    const professionals = await Professional.find(query);
    return NextResponse.json(professionals);
  } catch (error) {
    console.error('Failed to fetch professionals:', error);
    return NextResponse.json({ error: 'Failed to fetch professionals' }, { status: 500 });
  }
}
