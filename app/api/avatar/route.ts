import { NextResponse } from "next/server";
import ImageBuilder from "@/app/components/avatar/image-builder";

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black", "white"];

export async function POST(request: Request) {
  const body = await request.formData();

  let color = body.get("color") as string;
  const size = body.get("size") as string;

  if (!size) {
    // No size provided, returning error
    return NextResponse.json({ error: "Missing size" });
  }

  if (!color) {
    // No color provided, returning random image
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const image = await ImageBuilder(randomColor, size);
    const imageBuffer = await image.arrayBuffer()

    return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
  } else {
    // Convert to lowercase for consistency
    color = color.toLowerCase();

    const colorPattern = /-([0-9]{2,3})$/;
    const match = color.match(colorPattern);
    
    if (match) {
        const number = parseInt(match[1]);
        if (number % 50 !== 0) {
            return NextResponse.json({ error: 'Color number must be divisible by 50. See TailwindCSS colors for reference: https://tailwindcss.com/docs/customizing-colors' });
        }
    }

    const image = await ImageBuilder(color, size);
    const imageBuffer = await image.arrayBuffer()

    return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
  }


  
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" });
}
