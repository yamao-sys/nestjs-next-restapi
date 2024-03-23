import { FetchTodoResponseDto } from '@/api/todos/@types';
import { TodoUpdateForm } from '../../organisms/TodoUpdateForm';

type Props = {
	id: string;
	todo: FetchTodoResponseDto | undefined;
};

export function TodosEditTemplate({ id, todo }: Props) {
	return (
		<>
			<TodoUpdateForm id={id} todo={todo} />
		</>
	);
}
