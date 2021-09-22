type FormItemProps = {
    value: string | undefined
    setValue: (value: string) => void
    label: string
}

export function FormItem(props: FormItemProps) {
    return (
        <label className="">
            {props.label}: 
            <input 
                type="text" 
                onChange={event => props.setValue(event.target.value)}
                value={props.value ?? ''}
            />
        </label>
    )
}