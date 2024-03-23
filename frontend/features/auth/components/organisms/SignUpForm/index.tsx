'use client';

import { useState } from 'react';
import { InputTextForm } from '@/components/atoms/InputForm';
import { postSignUp } from '@/features/auth/server_actions/postSignUp';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';

export default function SignUpForm() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSignUp = async () => {
		try {
			const response = await postSignUp({
				email: inputEmail,
				password: inputPassword,
			});

			if (!!response.errors.length) {
				setValidationErrors(response.errors);
				setInputPassword('');
			} else {
				window.alert('会員登録に成功しました！');
				setInputEmail('');
				setInputPassword('');
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
					type="password"
					name="password"
					placeholder="Password"
					value={inputPassword}
					onChange={handleChangeInputPassword}
				/>
				<button onClick={handleSignUp}>登録する</button>
			</div>
		</>
	);
}
