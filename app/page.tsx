import AvatarForm from "@/app/components/avatar/avatar-form";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Avatar Generator</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Generate Your Avatar</h2>
        <AvatarForm />
      </section>

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
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">
                  Parameter
                </th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">
                  Required
                </th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">
                  Default
                </th>
                <th className="text-left p-4 border border-gray-200 dark:border-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  bg-color
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Random color
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Background color (e.g., &quot;blue-500&quot;)
                </td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  fg-color
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  white
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Text color (e.g., &quot;white&quot;)
                </td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  img-size
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Yes
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  -
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Image size (1-1000px)
                </td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  font-size
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  md
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Text size (sm|md|lg|xl)
                </td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  chars
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  &quot;&quot;
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Characters to display
                </td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  rounded
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  false
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  Round the corners
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
