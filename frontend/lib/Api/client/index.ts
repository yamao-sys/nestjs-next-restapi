import aspida, { FetchConfig } from '@aspida/fetch';
import api from '@/api/auth/$api';

export const getApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
