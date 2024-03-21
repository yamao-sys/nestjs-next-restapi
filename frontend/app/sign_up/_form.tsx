'use client';

import aspida, { HTTPError } from '@aspida/fetch';
import api from '@/api/auth/$api';
import { useState } from 'react';

const fetchConfig = {
	baseURL: 'http://localhost:8000',
	// throwHttpErrors: true, // throw an error on 4xx/5xx, default is false
};

export function Form() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSubmit = async () => {
		const client = api(aspida(fetch, fetchConfig));
		const response = await client.auth.sign_up.post({
			body: { email: inputEmail, password: inputPassword },
		});

		// NOTE: AspidaでAPIクライアントを作成すると、レスポンスが200のもののみとなってしまう
		// 		 : NestJSのValidationPipeを使うと、バリデーションエラー(400)の時にフロントエンド側で扱いづらくなる
		//		 : → NestJS側ではValidationPipeを用いず、バリデーションエラーをerrorsに格納して200で返すようにする
		if (!!response.body.errors?.length) {
			setValidationErrors(response.body.errors);
			setInputPassword('');
		} else {
			// TODO: サンクス画面にリダイレクト
			window.alert('会員登録に成功しました！');
			setInputEmail('');
			setInputPassword('');
		}
	};

	return (
		<>
			<div>
				{!!validationErrors &&
					validationErrors.map((validationError, i) => (
						<div key={i}>{validationError}</div>
					))}
				<input
					type="text"
					name="email"
					placeholder="Email"
					value={inputEmail}
					onChange={handleChangeInputEmail}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={inputPassword}
					onChange={handleChangeInputPassword}
				/>
				<button onClick={handleSubmit}>登録する</button>
			</div>
		</>
	);
}
