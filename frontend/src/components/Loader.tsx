type Props = {
  isLoading: boolean;
}

export function Loader({isLoading}:Props) {
  if(!isLoading) return null;
  
  return (
    <div className="overlay">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
