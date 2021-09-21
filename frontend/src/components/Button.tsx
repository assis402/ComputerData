import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props}/>
    )
}

export function UpdateButton(props: ButtonProps) {
    return (
        <button className="button" {...props}/>
    )
}

export function DeleteButton(props: ButtonProps) {
    return (
        <button className="button" {...props}/>
    )
}

export function AddButton(props: ButtonProps) {
    return (
        <button className="button" {...props}/>
    )
}