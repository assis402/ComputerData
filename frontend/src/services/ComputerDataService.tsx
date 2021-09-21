import axios from "axios";
import { useState } from "react";

const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

export function GetAll() {
  const [result, setResult] = useState(null);

  axios.get(baseURL).then((response) => {setResult(response.data)})

  if (!result) return null;

  return (
      <p>{result}</p>
  )
}