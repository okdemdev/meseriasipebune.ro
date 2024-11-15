import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Professional from "@/lib/models/professional";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { rating, comment } = await req.json();

    const professional = await Professional.findById(params.id);
    if (!professional) {
      return NextResponse.json(
        { error: "Professional not found" },
        { status: 404 }
      );
    }

    // Update rating
    const newRatingCount = professional.ratingCount + 1;
    const newRating =
      (professional.rating * professional.ratingCount + rating) / newRatingCount;

    professional.rating = Number(newRating.toFixed(1));
    professional.ratingCount = newRatingCount;

    await professional.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}