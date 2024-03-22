'use server';

import { SignUpDto } from '@/api/auth/@types';
import { getApiClient } from '@/lib/Api/client';

export const postSignUp = async (data: SignUpDto) => {
	'use server';

	const client = getApiClient();
	const response = await client.auth.sign_up.post({
		body: { email: data.email, password: data.password },
	});
	// NOTE: AspidaでAPIクライアントを作成すると、レスポンスが200のもののみとなってしまう
	// 		 : NestJSのValidationPipeを使うと、バリデーションエラー(400)の時にフロントエンド側で扱いづらくなる
	//		 : → NestJS側ではValidationPipeを用いず、バリデーションエラーをerrorsに格納して200で返すようにする
	if (!!response.body?.errors?.length) {
		return { errors: response.body.errors };
	} else {
		return { errors: [] };
	}
};
