'use client';

import { useState } from 'react';
import { FetchTodoResponseDto } from '@/api/todos/@types';
import { putUpdateTodo } from '@/features/todos/server_actions/putUpdateTodo';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';

type Props = {
	id: string;
	todo: FetchTodoResponseDto | undefined;
};

export function TodoUpdateForm({ id, todo }: Props) {
	const [inputTitle, setInputTitle] = useState(todo?.title ?? '');
	const [inputContent, setInputContent] = useState(todo?.content ?? '');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		try {
			const response = await putUpdateTodo(id, {
				title: inputTitle,
				content: inputContent,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
			} else {
				window.alert('TODOの更新に成功しました。');
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
				<button onClick={handleSubmit}>保存する</button>
			</div>
		</>
	);
}
