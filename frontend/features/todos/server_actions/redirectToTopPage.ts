'use server';

import { redirect } from 'next/navigation';

export const redirectToTopPage = async () => {
	'use server';
	redirect('/todos');
};
