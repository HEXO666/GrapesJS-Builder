import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">GrapesJS WYSIWYG Editor</h1>
      <p className="text-xl mb-8">A powerful web builder framework integrated with Next.js</p>

      <Link href="/editor" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Launch Editor
      </Link>
    </main>
  )
}
