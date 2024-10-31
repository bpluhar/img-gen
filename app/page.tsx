import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Avatar Generator API</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Endpoint</h2>
        <code className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg font-mono text-red-500">
          POST /api/avatar
        </code>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">Parameter</th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">Required</th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">Default</th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">img-size</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">Required</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">-</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Image size (1-1000px)</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">bg-color</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Optional</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Random</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Background color (Tailwind colors)</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">fg-color</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Optional</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">white</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Text color</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">font-size</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Optional</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">md</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Text size (sm|md|lg|xl)</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">chars</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Optional</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">""</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Characters to display</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700 font-mono">rounded</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Optional</span>
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">false</td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">Round the corners</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm">
          <div className="overflow-x-auto">
            <span className="text-cyan-500">fetch</span>
            <span className="text-gray-400">(</span>
            <span className="text-amber-300">'https://ez-avatar.vercel.app/api/avatar'</span>
            <span className="text-gray-400">, {`{`}</span>
            <div className="ml-4">
              <span className="text-purple-400">method</span>
              <span className="text-gray-400">: </span>
              <span className="text-amber-300">'POST'</span>
              <span className="text-gray-400">,</span>
            </div>
            <div className="ml-4">
              <span className="text-purple-400">body</span>
              <span className="text-gray-400">: </span>
              <span className="text-cyan-500">FormData</span>
              <span className="text-gray-400"> {`{`}</span>
              <div className="ml-4">
                <div>
                  <span className="text-amber-300">'bg-color'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'blue-500'</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">'fg-color'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'white'</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">'img-size'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'128'</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">'font-size'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'lg'</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">'chars'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'AB'</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">'rounded'</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">'true'</span>
                </div>
              </div>
              <span className="text-gray-400">{`}`}</span>
            </div>
            <span className="text-gray-400">});</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Example Output</h2>
        <div className="flex gap-4">
          <Image 
            src="/response.webp" 
            alt="Example avatar" 
            width={128} 
            height={128}
            className="rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
