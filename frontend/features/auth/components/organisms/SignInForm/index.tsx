'use client';

import { InputTextForm } from '@/components/atoms/InputForm';
import { postSignIn } from '@/features/auth/server_actions/postSignIn';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';
import { useState } from 'react';

export default function SignInForm() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);
	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSignIn = async () => {
		try {
			const response = await postSignIn({
				email: inputEmail,
				password: inputPassword,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
				setInputPassword('');
			} else {
				window.alert('ログインに成功しました！');
				setInputEmail('');
				setInputPassword('');
				await redirectToTopPage();
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.error(JSON.stringify(error));
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
				<button onClick={handleSignIn}>ログインする</button>
			</div>
		</>
	);
}
