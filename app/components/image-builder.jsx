import { ImageResponse } from "next/og";

export default function ImageBuilder() {
    return new ImageResponse(
        (
          <div
            tw=" text-black bg-white w-full h-full text-center justify-center items-center"
          >
            👋 Hello
          </div>
        ),
        {
          width: 250,
          height: 125,
        },
      );
}
