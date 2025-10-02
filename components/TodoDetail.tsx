'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, updateTodo, deleteTodo } from '../lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TodoDetail({ id }: { id: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')

  const { data: todo, isLoading } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodos(id),
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (res) => {
      queryClient.setQueryData(['todo', id], res)
      queryClient.invalidateQueries(['todos'])
      setEditing(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      router.push('/todo')
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (!todo) return <p>Todo not found</p>

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Todo Detail</h1>
      {editing ? (
        <div>
          <input className="w-full border p-2 mb-2" value={title} onChange={e => setTitle(e.target.value)} />
          <div className="flex gap-2">
            <button onClick={() => title.trim() && updateMutation.mutate({ ...todo, title: title.trim() })} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>ID:</strong> {todo.id}</p>
          <p className="mb-2"><strong>Title:</strong> {todo.title}</p>
          <p><strong>Status:</strong> {todo.completed ? '✅ Completed' : '❌ Not completed'}</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => { setEditing(true); setTitle(todo.title) }} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => deleteMutation.mutate(todo.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}
