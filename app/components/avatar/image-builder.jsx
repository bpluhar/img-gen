import { ImageResponse } from "next/og";

export default function ImageBuilder(color, size) {


   

    return new ImageResponse(
        (
          <div
            tw={`text-${color} bg-white w-full h-full text-center justify-center items-center`}
          >
            👋 Hello
          </div>
        ),
        {
          width: size,
          height: size,
        },
      );
}
