import { NextResponse } from "next/server";
import ImageBuilder from "@/app/components/image-builder";

export async function POST(request: Request) {
  const body = await request.formData();

  const image = await ImageBuilder();

  const imageBuffer = await image.arrayBuffer();
  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, World!", method: "GET" });
}
