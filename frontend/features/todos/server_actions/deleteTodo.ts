'use server';

import { getTodosApiClient } from '@/lib/Api/client/getTodosApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';

export const deleteTodo = async (id: string) => {
	'use server';
	const client = getTodosApiClient();

	try {
		await client.todos._id(id).delete();
	} catch (error) {
		if (error instanceof HTTPError) {
			handleApiErrors(error);
		}

		console.error(JSON.stringify(error));
	}
};
