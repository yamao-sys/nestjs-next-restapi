'use server';

import { useRouter } from 'next/navigation';

export const moveToTopPage = async () => {
	'use server';

	const router = useRouter();
	router.push(`/todos`);
};
