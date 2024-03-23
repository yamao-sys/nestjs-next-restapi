'use client';

type Props = {
	onClick: () => void;
	title: string;
};

export function SubmitButton({ onClick, title }: Props) {
	return (
		<>
			<button onClick={onClick}>{title}</button>
		</>
	);
}
