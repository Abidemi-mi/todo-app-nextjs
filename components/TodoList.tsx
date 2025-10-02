"use client"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { getTodos, addTodo, updateTodo, deleteTodo, Todo } from "../lib/api"
import Link from "next/link"

export default function TodoList() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [newTitle, setNewTitle] = useState("")

  const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos", page],
    queryFn: () => getTodos(),
    placeholderData: keepPreviousData,
  })

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  if (isLoading) return <p className="text-center text-gray-500 mt-6">Loading todos...</p>
  if (isError) return <p className="text-center text-red-500 mt-6">Failed to load todos</p>

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">My Todo List</h1>

      {/* Add Todo */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => {
            if (newTitle.trim()) {
              addMutation.mutate({ title: newTitle })
              setNewTitle("")
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="grid gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div>
              <Link
                href={`/todo/${todo.id}`}
                className="text-lg font-medium text-gray-800 hover:text-indigo-600"
              >
                {todo.title}
              </Link>
              <p
                className={`text-sm mt-1 ${
                  todo.completed ? "text-green-500" : "text-orange-500"
                }`}
              >
                {todo.completed ? "✅ Completed" : "⏳ Pending"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateMutation.mutate({ ...todo, completed: !todo.completed })
                }
                className="px-4 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}