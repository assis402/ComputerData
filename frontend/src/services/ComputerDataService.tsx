import axios from "axios";
import { useEffect, useState } from "react";
import { ComputerType } from "../types/ComputerType";

const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

export function GetAll() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {setResult(response.data)})
  }, []);

  if (!result) return null;

  return result;
}

export function GetAllByName(name: string) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/GetByName/${name}`).then((response) => {setResult(response.data)})
  }, []);

  if (!result) return null;

  const computerList = result as ComputerType[]

  return computerList;
}