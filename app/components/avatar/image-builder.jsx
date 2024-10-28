import { ImageResponse } from "next/og";

export default function ImageBuilder(
  bgColor,
  fgColor,
  size,
  chars,
  fontSize,
  rounded,
) {
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
        tw={`bg-${bgColor} text-${fgColor} text-${textSize} w-full h-full text-center justify-center items-center ${
          rounded ? "rounded-full" : ""
        }`}
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
