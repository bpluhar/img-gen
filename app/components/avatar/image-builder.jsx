import { ImageResponse } from "next/og";

export default function ImageBuilder(color, size, chars, fontSize) {
  let textSize;
  switch (fontSize) {
    case "sm":
      textSize = "5xl";
      break;
    case "md":
      textSize = "6xl";
      break;
    case "lg":
      textSize = "7xl";
      break;
    case "xl":
      textSize = "8xl";
      break;
    default:
      textSize = "6xl"; // Default to md size
  }

  return new ImageResponse(
    (
      <div
        tw={`text-${color} text-${textSize} bg-white w-full h-full text-center justify-center items-center`}
      >
        {chars}
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
