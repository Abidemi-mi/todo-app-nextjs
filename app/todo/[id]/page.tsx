import TodoDetail from './../../../components/TodoDetail'

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  return <TodoDetail id={params.id} />
}
