'use server';

import { UpdateTodoDto } from '@/api/todos/@types';
import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';

export const putUpdateTodo = async (id: string, params: UpdateTodoDto) => {
	'use server';
	const client = getTodosApiClient();

	const response = await client.todos._id(id).put({
		body: params,
	});
	if (!!response.body?.errors?.length) {
		return { errors: response.body.errors };
	}
};
