import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Todo App - Next.js (TypeScript)</h1>
        <p className="mb-4">Click below to open the Todo list.</p>
        <Link href="/todo" className="px-4 py-2 bg-blue-600 text-white rounded">Open Todos</Link>
      </div>
    </main>
  )
}
