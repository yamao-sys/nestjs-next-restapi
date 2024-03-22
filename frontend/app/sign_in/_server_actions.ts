'use server';

import { SignInDto } from '@/api/auth/@types';
import { getApiClient } from '@/lib/Api/client';
import { cookies } from 'next/headers';

export const postSignIn = async (data: SignInDto) => {
	'use server';

	const client = getApiClient();
	const response = await client.auth.sign_in.post({
		body: { email: data.email, password: data.password },
	});
	if (!!response.body.errors.length) {
		return { errors: response.body.errors };
	} else {
		const token = response.headers['set-cookie'].split(';')[0].split('=')[1];
		cookies().set('token', token, { secure: true, sameSite: 'none' });
	}
};
