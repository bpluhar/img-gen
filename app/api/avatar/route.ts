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
  bgColor?: string;
  fgColor?: string;
  imgSize: string;
  fontSize?: string;
  chars: string;
  rounded?: boolean;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const body: AvatarRequestBody = {
    bgColor: formData.get("bg-color")?.toString(),
    fgColor: formData.get("fg-color")?.toString(),
    imgSize: formData.get("img-size")?.toString() || "",
    fontSize: formData.get("font-size")?.toString() || "md", // Default to "md"
    chars: formData.get("chars")?.toString() || "",
    rounded: formData.get("rounded")?.toString() === "true",
  };

  let bgColor = body.bgColor;
  let fgColor = body.fgColor;
  const size = body.imgSize;
  const chars = body.chars;
  const fontSize = body.fontSize;
  const rounded = body.rounded;
  if (
    !size || !/^\d+$/.test(size) || parseInt(size) > 1000 || parseInt(size) < 1
  ) {
    // No size provided or invalid size, returning error
    return NextResponse.json({
      error: "Size must be a number between 1 and 1000",
    });
  }

  if (!bgColor) {
    // No color provided, returning random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const image = await ImageBuilder(randomColor, size, chars, fontSize, rounded);
    const imageBuffer = await image.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } else {
    // Convert to lowercase for consistency
    bgColor = bgColor.toLowerCase();

    const colorPattern = /-([0-9]{2,3})$/;
    const match = bgColor.match(colorPattern);

    if (match) {
      const number = parseInt(match[1]);
      if (number % 50 !== 0) {
        return NextResponse.json({
          error:
            "Color number must be divisible by 50. See TailwindCSS colors for reference: https://tailwindcss.com/docs/customizing-colors",
        });
      }
    }

    const image = await ImageBuilder(bgColor, fgColor, size, chars, fontSize, rounded);
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
