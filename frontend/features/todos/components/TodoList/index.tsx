'use client';

import { FetchAllTodosResponseDto } from '@/api/todos/@types';
import { deleteTodo } from '../../server_actions/deleteTodo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
	todos: FetchAllTodosResponseDto['todos'];
};

export function TodoList({ todos }: Props) {
	const [showTodos, setShowTodos] =
		useState<FetchAllTodosResponseDto['todos']>(todos);

	const router = useRouter();
	const handleMoveEditPage = (id: string) => router.push(`/todos/edit/${id}`);

	const handleDeleteTodo = async (id: string, title: string) => {
		if (!window.confirm(`${title}のTODOを削除しますか？`)) return;

		await deleteTodo(id);
		window.alert(`${title}のTODOを削除しました。`);

		const newTodos = todos?.filter((todo) => todo.id !== id);
		setShowTodos(newTodos);
	};

	return (
		<>
			{!!showTodos?.length
				? showTodos.map((todo) => (
						<div key={todo.id} style={{ display: 'flex' }}>
							<div>{todo.title}</div>
							<button onClick={() => handleMoveEditPage(todo.id)}>編集</button>
							<button onClick={() => handleDeleteTodo(todo.id, todo.title)}>
								削除
							</button>
						</div>
					))
				: '<div>まだTODOが未登録です。</div>'}
		</>
	);
}
