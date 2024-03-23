'use client';

import { useState } from 'react';
import { putUpdateTodo } from '../../server_actions/putUpdateTodo';
import { useRouter } from 'next/navigation';
import { FetchTodoResponseDto } from '@/api/todos/@types';

type Props = {
	id: string;
	todo: FetchTodoResponseDto | undefined;
};

export function TodosEditTemplate({ id, todo }: Props) {
	const [inputTitle, setInputTitle] = useState(todo?.title ?? '');
	const [inputContent, setInputContent] = useState(todo?.content ?? '');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const router = useRouter();

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		const result = await putUpdateTodo(id, {
			title: inputTitle,
			content: inputContent,
		});

		if (!!result?.errors?.length) {
			setValidationErrors(result.errors);
		} else {
			window.alert('TODOの更新に成功しました。');
			router.push('/todos');
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
