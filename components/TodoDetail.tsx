import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
// import { getTodo, Todo } from "../../lib/api"
import { getTodo, Todo } from "@/lib/api"

import React from "react";

interface TodoPageProps {
  params: {
    id: string;
  };
}

export default async function TodoPage({ params }: TodoPageProps) {
  const { id } = params;

  // fetch todo details
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    cache: "no-store", // prevents caching during dev
  });
  const todo = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo Details</h1>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">ID:</span>
            <span className="text-gray-900">{todo.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Title:</span>
            <span className="text-gray-900">{todo.title}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`px-2 py-1 rounded text-sm font-semibold ${
                todo.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {todo.completed ? "Completed ✅" : "Pending ⏳"}
            </span>
          </div>
        </div>

        <div className="mt-6 text-right">
          <a
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back to Todos
          </a>
        </div>
      </div>
    </div>
  );
}

// export default function TodoDetail() {
//   const router = useRouter()
//   const { id } = router.query

//   const todoId = Array.isArray(id) ? id[0] : id
//   const parsedId = todoId ? parseInt(todoId, 10) : undefined

//   const { data: todo, isLoading, isError } = useQuery<Todo>({
//     queryKey: ["todo", parsedId],
//     queryFn: () => getTodo(parsedId!),
//     enabled: !!parsedId,
//   })

//   if (isLoading) return <p>Loading todo...</p>
//   if (isError) return <p>Failed to load todo.</p>
//   if (!todo) return <p>No todo found</p>

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-2">Todo Details</h1>
//       <p><strong>ID:</strong> {todo.id}</p>
//       <p><strong>Title:</strong> {todo.title}</p>
//       <p>
//         <strong>Status:</strong>{" "}
//         {todo.completed ? "✅ Completed" : "⏳ Pending"}
//       </p>
//     </div>
//   )
// }