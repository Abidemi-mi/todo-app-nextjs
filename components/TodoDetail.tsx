"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodoById, Todo } from "@/lib/api";

const TodoDetail = ({ id }: { id: string }) => {
  const parsedId = parseInt(id, 10);

  const { data: todo, isLoading } = useQuery<Todo>({
    queryKey: ["todo", parsedId],
    queryFn: () => getTodoById(parsedId),
  });

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>{todo?.title}</p>}
    </div>
  );
};

export default TodoDetail;