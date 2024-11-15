import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Professional from "@/lib/models/professional";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const professional = await Professional.create(body);
    return NextResponse.json(professional, { status: 201 });
  } catch (error) {
    console.error("Failed to create professional:", error);
    return NextResponse.json(
      { error: "Failed to create professional" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const query: any = {};
    const city = searchParams.get("city");
    const category = searchParams.get("category");
    
    if (city) query.city = city;
    if (category) query.category = category;

    const professionals = await Professional.find(query);
    return NextResponse.json(professionals);
  } catch (error) {
    console.error("Failed to fetch professionals:", error);
    return NextResponse.json(
      { error: "Failed to fetch professionals" },
      { status: 500 }
    );
  }
}