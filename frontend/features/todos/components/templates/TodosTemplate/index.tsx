import { FetchAllTodosResponseDto } from '@/api/todos/@types';
import { TodoList } from '../../organisms/TodoList';

type Props = {
	todos: FetchAllTodosResponseDto['todos'];
};

export default function TodosTemplate({ todos }: Props) {
	return (
		<>
			<TodoList todos={todos} />
		</>
	);
}
