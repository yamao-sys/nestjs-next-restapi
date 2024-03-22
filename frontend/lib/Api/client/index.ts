import aspida, { FetchConfig } from '@aspida/fetch';
import api from '@/api/auth/$api';

export const getApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: 'http://localhost:8000',
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
