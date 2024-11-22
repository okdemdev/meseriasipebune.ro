import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Professional from '@/lib/models/professional';

// Get professional profile
export async function GET(req: Request) {
  try {
    await dbConnect();
    const token = cookies().get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
    const professional = await Professional.findById(decoded.id).select('-password');

    if (!professional) {
      return NextResponse.json({ error: 'Professional not found' }, { status: 404 });
    }

    return NextResponse.json(professional);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// Update professional profile
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const token = cookies().get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
    const updates = await req.json();

    // Remove sensitive fields from updates
    delete updates.password;
    delete updates.email;

    const professional = await Professional.findByIdAndUpdate(
      decoded.id,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!professional) {
      return NextResponse.json({ error: 'Professional not found' }, { status: 404 });
    }

    return NextResponse.json(professional);
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
