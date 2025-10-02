export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Get all todos
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// Get single todo
export async function getTodoById(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
}

// Add a todo (fake POST)
export async function addTodo(newTodo: Partial<Todo>): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

// Update a todo (fake PUT)
export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }
  );
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

// Delete a todo (fake DELETE)
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
