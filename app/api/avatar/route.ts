import { NextResponse } from "next/server";
import ImageBuilder from "@/app/components/avatar/image-builder";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Pre-define colors as a constant Set for O(1) lookup
const VALID_COLORS = new Set([
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
]);

// Constants for validation
const MAX_SIZE = 1000;
const MIN_SIZE = 1;
const COLOR_NUMBER_PATTERN = /-([0-9]{2,3})$/;

// Type safety with zod or similar would be even better
interface AvatarRequestBody {
  bgColor?: string;
  fgColor?: string;
  imgSize: string;
  fontSize?: string;
  chars: string;
  rounded?: boolean;
}

// Memoized random color function
const getRandomColor = () => {
  const colorsArray = Array.from(VALID_COLORS);
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};

// Validation helper
const validateSize = (size: string): boolean => {
  const parsedSize = parseInt(size);
  return Boolean(size) &&
    /^\d+$/.test(size) &&
    parsedSize <= MAX_SIZE &&
    parsedSize >= MIN_SIZE;
};

// Validation helper
const validateColorNumber = (color: string): boolean => {
  const match = color.match(COLOR_NUMBER_PATTERN);
  if (!match) return true; // No number in color
  const number = parseInt(match[1]);
  return number % 50 === 0;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract and validate size first to fail fast
    const imgSize = formData.get("img-size")?.toString() || "";
    if (!validateSize(imgSize)) {
      return NextResponse.json({
        error: `Size must be a number between ${MIN_SIZE} and ${MAX_SIZE}`,
      }, { status: 400 });
    }

    // Build body with defaults
    const body: AvatarRequestBody = {
      bgColor: (formData.get("bg-color")?.toString() || getRandomColor())
        .toLowerCase(),
      fgColor: formData.get("fg-color")?.toString() || "white",
      imgSize,
      fontSize: formData.get("font-size")?.toString() || "md",
      chars: formData.get("chars")?.toString() || "",
      rounded: formData.get("rounded")?.toString().toLowerCase() === "true",
    };

    // Validate color number
    if (!validateColorNumber(body.bgColor!)) {
      return NextResponse.json({
        error:
          "Color number must be divisible by 50. See TailwindCSS colors for reference: https://tailwindcss.com/docs/customizing-colors",
      }, { status: 400 });
    }

    // Generate image
    const image = ImageBuilder(
      body.bgColor,
      body.fgColor,
      body.imgSize,
      body.chars,
      body.fontSize,
      body.rounded ? "true" : "false",
    );

    const imageBuffer = await image.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Avatar generation error:", error);
    return NextResponse.json({
      error: "Failed to generate avatar",
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 },
  );
}
