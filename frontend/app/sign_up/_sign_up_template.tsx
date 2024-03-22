'use client';

import { useState } from 'react';
import { getApiClient } from '@/lib/Api/client';
import { InputTextForm } from '@/components/atoms/InputForm';
import { SubmitButton } from '@/components/atoms/SubmitButton';

export default function SignUpTemplate() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSubmit = async () => {
		const client = getApiClient();
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
				<InputTextForm
					name="email"
					placeholder="Email"
					value={inputEmail}
					onChange={handleChangeInputEmail}
				/>
				<InputTextForm
					name="password"
					placeholder="Password"
					value={inputPassword}
					onChange={handleChangeInputPassword}
				/>
				<SubmitButton onSubmit={handleSubmit} />
			</div>
		</>
	);
}
