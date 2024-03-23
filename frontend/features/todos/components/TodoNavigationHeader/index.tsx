'use client';

import { useRouter } from 'next/navigation';

export default function TodoNavigationHeader() {
	const router = useRouter();
	const handleMoveTopPage = () => router.push(`/todos`);
	const handleMoveCreatePage = () => router.push(`/todos/new`);

	return (
		<div style={{ display: 'flex' }}>
			<button onClick={handleMoveTopPage}>TOP</button>
			<button onClick={handleMoveCreatePage}>新規作成</button>
		</div>
	);
}
