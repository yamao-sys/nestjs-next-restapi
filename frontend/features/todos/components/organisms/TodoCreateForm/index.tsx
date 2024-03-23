'use client';

import { postCreateTodo } from '@/features/todos/server_actions/postCreateTodo';
import { useState } from 'react';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';

export function TodoCreateForm() {
	const [inputTitle, setInputTitle] = useState('');
	const [inputContent, setInputContent] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		try {
			const response = await postCreateTodo({
				title: inputTitle,
				content: inputContent,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
			} else {
				window.alert('TODOの作成に成功しました。');
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
			{!!validationErrors &&
				validationErrors.map((validationError, i) => (
					<div key={i}>{validationError}</div>
				))}
			<div>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={inputTitle}
					onChange={handleChangeInputTitle}
				/>
			</div>
			<div>
				<textarea
					name="content"
					placeholder="Content"
					value={inputContent}
					onChange={handleChangeInputContent}
				/>
			</div>
			<div>
				<button onClick={handleSubmit}>登録する</button>
			</div>
		</>
	);
}
