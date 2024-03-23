'use client';

import { useState } from 'react';
import { postCreateTodo } from '../../server_actions/postCreateTodo';
import { useRouter } from 'next/navigation';

export function TodosNewTemplate() {
	const [inputTitle, setInputTitle] = useState('');
	const [inputContent, setInputContent] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const router = useRouter();

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		const result = await postCreateTodo({
			title: inputTitle,
			content: inputContent,
		});

		if (!!result?.errors?.length) {
			setValidationErrors(result.errors);
		} else {
			window.alert('TODOの作成に成功しました。');
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
				<button onClick={handleSubmit}>登録する</button>
			</div>
		</>
	);
}
