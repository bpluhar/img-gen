import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold p-4">
        Access with POST Request to{" "}
        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded-lg font-semibold text-red-600">
          /api/avatar
        </code>

      <div className="mt-4 text-base">
        <p className="mb-2 font-semibold">Example POST request:</p>
          <pre className="bg-black/[.05] dark:bg-white/[.06] p-2 w-full overflow-x-auto rounded-lg">
            {`fetch('https://ez-avatar.vercel.app/api/avatar', {
  method: 'POST',
  body: FormData {
    'bg-color': 'blue-500',    // Optional: Tailwind color
    'fg-color': 'white',       // Optional: Text color
    'img-size': '128',         // Required: 1-1000px
    'font-size': 'lg',         // Optional: sm|md|lg|xl
    'chars': 'BP',             // Required: Text to display
    'rounded': 'true'          // Optional: true|false
  }
})`}
          </pre>
      </div>

      <div className="mt-4 text-base">
        <p className="mb-2 font-semibold">Returned Image:</p>
        <Image src="/response.webp" alt="bp" width={64} height={64} />
      </div>
      </h1>
    </>
  );
}
