import aspida, { FetchConfig } from '@aspida/fetch';
import api from '@/api/todos/$api';
import { getAllCookies } from '@/lib/getAllCookies';

export const getTodosApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
		headers: {
			cookie: getAllCookies(),
		},
		throwHttpErrors: true,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
