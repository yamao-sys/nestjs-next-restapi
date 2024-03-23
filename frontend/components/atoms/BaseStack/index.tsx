'use client';

import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export function BaseStack({ children }: Props) {
	return <div style={{ display: 'flex' }}>{children}</div>;
}
