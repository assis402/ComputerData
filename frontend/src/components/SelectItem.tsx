type FormItemProps = {
	label: string;
	value: string | undefined;
	placeholder?: string;
	setValue: (value: string) => void;
}

export function SelectItem({label, value, placeholder, setValue}: FormItemProps) {
	return (
		<div className="mb-3">
			<label htmlFor="" className="form-label">{label}</label>
      <select className="form-select form-select-lg" value={value} onChange={(e)=>setValue(e.target.value)}>
        <option value="Windows">Windows</option>
        <option value="Linux">Linux</option>
        <option value="MacOS">MacOS</option>
        <option value="Solaris">Solaris</option>
      </select>
		</div>
	)
}