import React from "react";

interface TodoPageProps {
  params: {
    id: string;
  };
}

export default async function TodoPage({ params }: TodoPageProps) {
  const { id } = params;

  // Fetch todo details
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    cache: "no-store",
  });
  const todo = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Todo Details</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {todo.completed ? "Completed ✅" : "Pending ⏳"}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500">ID</h2>
            <p className="text-lg font-semibold text-gray-900 mt-1">{todo.id}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Title</h2>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {todo.title}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <a
            href="/"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            ← Back to Todos
          </a>
        </div>
      </div>
    </div>
  );
}