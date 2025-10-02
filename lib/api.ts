// // lib/api.ts
export type Todo  = {
  id: number;
  title: string;
  completed: boolean;
}

// ✅ Fetch todos
// export async function getTodos(page: number): Promise<Todo[]> {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
//   if (!res.ok) throw new Error('Failed to fetch todos')
//   return res.json()
// }

export const getTodoById = async (id: number): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
};

// ✅ Add todo (simulated API call)
export async function addTodo(newTodo: Omit<Todo, 'id'>): Promise<Todo> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
  if (!res.ok) throw new Error('Failed to add todo')
  return res.json()
}

// ✅ Update todo
export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return res.json()
}

// ✅ Delete todo
export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete todo')
  return { success: true }
}