type FormItemProps = {
	label: string;
	value: string | undefined;
	placeholder?: string;
	setValue: (value: string) => void;
}

export function FormItem({label, value, placeholder, setValue}: FormItemProps) {
	return (
		<div className="mb-3">
			<label htmlFor="" className="form-label">{label}</label>
			<input value={value} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder} type="text" className="form-control form-control-lg" />
		</div>
	)
}