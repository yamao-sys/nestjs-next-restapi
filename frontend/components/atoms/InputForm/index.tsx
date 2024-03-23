'use client';

type Props = {
	type?: string;
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputTextForm({
	type = 'text',
	name,
	placeholder,
	value,
	onChange,
}: Props) {
	return (
		<>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
