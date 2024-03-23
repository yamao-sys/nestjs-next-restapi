import { TodosEditTemplate } from '@/features/todos/components/templates/TodoEditTemplate';
import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';

type Params = {
	params: { id: string };
};

export default async function TodoEdit({ params }: Params) {
	const fetchEditTargetTodo = async () => {
		const client = getTodosApiClient();

		try {
			return await client.todos._id(params.id).$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.error(JSON.stringify(error));
		}
	};
	const todo = await fetchEditTargetTodo();

	return (
		<>
			<TodosEditTemplate id={params.id} todo={todo} />
		</>
	);
}
