import { NextResponse } from "next/server";
import ImageBuilder from "@/app/components/avatar/image-builder";

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
];

interface AvatarRequestBody {
  color?: string;
  size: string;
  chars: string;
  fontSize?: string;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const body: AvatarRequestBody = {
    color: formData.get("color")?.toString(),
    size: formData.get("size")?.toString() || "",
    chars: formData.get("chars")?.toString() || "",
    fontSize: formData.get("font-size")?.toString() || "md", // Default to "md"
  };

  let color = body.color;
  const size = body.size;
  const chars = body.chars;
  const fontSize = body.fontSize;

  if (
    !size || !/^\d+$/.test(size) || parseInt(size) > 1000 || parseInt(size) < 1
  ) {
    // No size provided or invalid size, returning error
    return NextResponse.json({
      error: "Size must be a number between 1 and 1000",
    });
  }

  if (!color) {
    // No color provided, returning random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const image = await ImageBuilder(randomColor, size, chars, fontSize);
    const imageBuffer = await image.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } else {
    // Convert to lowercase for consistency
    color = color.toLowerCase();

    const colorPattern = /-([0-9]{2,3})$/;
    const match = color.match(colorPattern);

    if (match) {
      const number = parseInt(match[1]);
      if (number % 50 !== 0) {
        return NextResponse.json({
          error:
            "Color number must be divisible by 50. See TailwindCSS colors for reference: https://tailwindcss.com/docs/customizing-colors",
        });
      }
    }

    const image = await ImageBuilder(color, size, chars, fontSize);
    const imageBuffer = await image.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" });
}
