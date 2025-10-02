const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in .env.local");
}



// lib/api.ts
export interface Todo {
  id: number
  title: string
  completed: boolean
}
 
// ✅ Get paginated todos
export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
};

// ✅ Get a single todo
export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  if (!res.ok) throw new Error("Failed to fetch todo")
  return res.json()
}

// lib/api.ts
export async function addTodo(todo: { title: string }): Promise<Todo> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo, completed: false }), // completed defaults to false
  })
  if (!res.ok) throw new Error("Failed to add todo")
  return res.json()
}

// ✅ Update existing todo
export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }
  )
  if (!res.ok) throw new Error("Failed to update todo")
  return res.json()
}

// ✅ Delete todo
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete todo")
}