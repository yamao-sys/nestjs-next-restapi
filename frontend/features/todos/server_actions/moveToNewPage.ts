'use server';

import { useRouter } from 'next/navigation';

export const moveToNewPage = async () => {
	'use server';

	const router = useRouter();
	router.push(`/todos/new`);
};
