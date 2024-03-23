import { FetchAllTodosResponseDto } from '@/api/todos/@types';

type Props = {
	todos: FetchAllTodosResponseDto['todos'];
};

export default function TodosTemplate({ todos }: Props) {
	return (
		<>
			{!!todos?.length
				? todos.map((todo) => <div>{todo.title}</div>)
				: '<div>まだTODOが未登録です。</div>'}
		</>
	);
}
