'use server';

import { UpdateTodoDto } from '@/api/todos/@types';
import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';

export const putUpdateTodo = async (id: string, params: UpdateTodoDto) => {
	'use server';
	const client = getTodosApiClient();

	try {
		const response = await client.todos._id(id).put({
			body: params,
		});
		if (!!response.body?.errors?.length) {
			return { errors: response.body.errors };
		}
	} catch (error) {
		if (error instanceof HTTPError) {
			handleApiErrors(error);
		}

		console.error(JSON.stringify(error));
	}
};
