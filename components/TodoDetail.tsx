import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
//import { getTodoById } from "../api";  adjust path if needed
import { getTodoById } from "@/lib/api";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const todoId = Array.isArray(id) ? id[0] : id;
  const parsedId = todoId ? parseInt(todoId, 10) : undefined;

  const { data: todo, isLoading } = useQuery<Todo>({
    queryKey: ["todo", parsedId],
    queryFn: () => getTodoById(parsedId!),
    enabled: !!parsedId,
  });

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>{todo?.title}</p>}
    </div>
  );
};

export default TodoDetail;