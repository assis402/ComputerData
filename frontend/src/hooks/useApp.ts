import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useApp(){
  return useContext(AppContext);
}