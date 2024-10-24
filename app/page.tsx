import Link from "next/link";

export default function Home() {
  return (
   <>
    <h1 className="text-2xl font-bold p-4">Access with GET Request to <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-red-600">/api/hello</code>, or click <Link className="text-blue-600" href="/api/hello">here</Link> if you're lazy.</h1>
   </>
  );
}
