'use client';

type Props = {
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputTextForm({ name, placeholder, value, onChange }: Props) {
	return (
		<>
			<input
				type="text"
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
