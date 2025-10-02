'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, addTodo, updateTodo, deleteTodo, Todo } from '../lib/api'
import Link from 'next/link'

export default function TodoList() {
  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [newTodo, setNewTodo] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')

  const queryClient = useQueryClient()

  const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
    queryKey: ['todos', page],
    queryFn: () => getTodos(page),
    keepPreviousData: true,
  })

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (res) => {
      // append to cache so UI updates immediately (JSONPlaceholder won't persist)
      queryClient.setQueryData<Todo[]>(['todos', page], (old) => old ? [...old, { ...res, id: Date.now() }] : [{ ...res, id: Date.now() }])
      setNewTodo('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (res) => {
      queryClient.setQueryData<Todo[]>(['todos', page], (old) => old ? old.map(t => t.id === res.id ? { ...t, ...res } : t) : [])
      setEditingId(null)
      setEditTitle('')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Todo[]>(['todos', page], (old) => old ? old.filter(t => t.id !== id) : [])
    },
  })

  if (isLoading) return <p className="text-center p-4">Loading...</p>
  if (isError) return <p className="text-center p-4 text-red-500">Error fetching todos</p>
  

  const filtered = todos.filter((t: Todo) => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Add new todo..." className="flex-1 border p-2 rounded-l" />
        <button onClick={() => newTodo.trim() && addMutation.mutate(newTodo.trim())} className="bg-blue-600 text-white px-4 rounded-r">Add</button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search todos..." className="w-full border p-2 mb-4 rounded" />

      <ul className="space-y-2">
        {filtered.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={todo.completed} onChange={() => updateMutation.mutate({ ...todo, completed: !todo.completed })} />
              {editingId === todo.id ? (
                <input className="border p-1 rounded" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              ) : (
                <Link href={`/todo/${todo.id}`} className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.title}</Link>
              )}
            </div>
            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button onClick={() => editTitle.trim() && updateMutation.mutate({ ...todo, title: editTitle.trim() })} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
              ) : (
                <button onClick={() => { setEditingId(todo.id); setEditTitle(todo.title) }} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              )}
              <button onClick={() => deleteMutation.mutate(todo.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  )
}
