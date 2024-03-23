'use server';

import { useRouter } from 'next/navigation';

export const moveToEditPage = async (id: string) => {
	'use server';

	const router = useRouter();
	router.push(`/todos/edit/${id}`);
};
