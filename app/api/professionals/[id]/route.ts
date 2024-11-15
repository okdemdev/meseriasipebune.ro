import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Professional from "@/lib/models/professional";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const professional = await Professional.findById(params.id);
    
    if (!professional) {
      return NextResponse.json(
        { error: "Professional not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(professional);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch professional" },
      { status: 500 }
    );
  }
}