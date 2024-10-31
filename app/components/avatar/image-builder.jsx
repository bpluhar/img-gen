import { ImageResponse } from "next/og";

export default function ImageBuilder(
  bgColor,
  fgColor,
  size,
  chars,
  fontSize = "md",
  rounded,
) {
  const scale = size / 32;

  const typography = {
    xs: { fontSize: 12, lineHeight: 16 },
    sm: { fontSize: 14, lineHeight: 20 },
    md: { fontSize: 16, lineHeight: 24 },
    lg: { fontSize: 18, lineHeight: 28 },
    xl: { fontSize: 20, lineHeight: 28 },
    "2xl": { fontSize: 24, lineHeight: 32 },
    "3xl": { fontSize: 30, lineHeight: 36 },
    "4xl": { fontSize: 36, lineHeight: 40 },
    "5xl": { fontSize: 48, lineHeight: 48 },
    "6xl": { fontSize: 60, lineHeight: 60 },
    "7xl": { fontSize: 72, lineHeight: 72 },
    "8xl": { fontSize: 96, lineHeight: 96 },
    "9xl": { fontSize: 128, lineHeight: 128 },
  };

  const typographySettings = typography[fontSize] || typography.md;

  const calculatedFontSize = Math.round(typographySettings.fontSize * scale);
  const calculatedLineHeight = Math.round(
    typographySettings.lineHeight * scale,
  );

  return new ImageResponse(
    (
      <div
        tw={`
          bg-${bgColor}
          text-${fgColor}
          w-full 
          h-full 
          flex 
          items-center 
          justify-center 
          text-center
          ${rounded ? "rounded-full" : ""}
          text-[${calculatedFontSize}px]
          line-height-[${calculatedLineHeight}px]
        `}
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
