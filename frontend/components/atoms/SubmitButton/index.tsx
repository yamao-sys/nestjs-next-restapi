'use client';

type Props = {
	onSubmit: () => void;
};

export function SubmitButton({ onSubmit }: Props) {
	return (
		<>
			<button onClick={onSubmit}>登録する</button>
		</>
	);
}
