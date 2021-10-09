
import React from 'react'

type Props = {
  title: string;
}

export function SubmitButton({title}:Props) {
  return (
    <div className="d-flex">
      <button className="btn btn-primary ms-auto" type="submit">{title}</button>
    </div>
  )
}
