'use server';

import { CreateTodoDto } from '@/api/todos/@types';
import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';
import { redirect } from 'next/navigation';

export const usePostCreateTodo = (params: CreateTodoDto) => {
	'use server';
	const client = getTodosApiClient();

	try {
		client.todos.$post({
			body: params,
		});

		redirect('/todos');
	} catch (error) {
		if (error instanceof HTTPError) {
			handleApiErrors(error);
		}

		console.error(JSON.stringify(error));
	}
};
