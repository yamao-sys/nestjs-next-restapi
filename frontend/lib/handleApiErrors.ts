import { HTTPError } from '@aspida/fetch';
import { redirect } from 'next/navigation';

export const handleApiErrors = (error: HTTPError) => {
	switch (error.response.status) {
		case 401:
			console.error(401);
			redirect('/sign_in');
		default:
			console.error(error.response);
			break;
	}
};
