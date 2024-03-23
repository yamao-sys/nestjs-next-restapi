import TodosTemplate from '@/features/todos/components/templates/TodosTemplate';
import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';

export default async function Todos() {
	const fetchAllTodos = async () => {
		const client = getTodosApiClient();

		try {
			const response = await client.todos.$get();
			return response.todos;
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.error(JSON.stringify(error));
		}
	};
	const todos = await fetchAllTodos();

	return (
		<>
			<TodosTemplate todos={todos} />
		</>
	);
}
