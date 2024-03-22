'use client';

import { useState } from 'react';
import { InputTextForm } from '@/components/atoms/InputForm';
import { SubmitButton } from '@/components/atoms/SubmitButton';
import { postSignUp } from './_server_actions';

export default function SignUpTemplate() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSubmit = async () => {
		const response = await postSignUp({
			email: inputEmail,
			password: inputPassword,
		});

		if (!!response.errors?.length) {
			setValidationErrors(response.errors);
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
