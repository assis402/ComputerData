import { createContext, ReactNode, useState } from "react";
import { ComputerType } from "../types/ComputerType";

type Props = {
  children: ReactNode;
}

type ContextProps = {
  selectedComputer: ComputerType | null;
  setSelectedComputer: (value: ComputerType | null)=>void;
}

export const AppContext = createContext({} as ContextProps);

export function AppContextProvider({children}:Props){
  const [ selectedComputer, setSelectedComputer ] = useState<ComputerType | null>(null);

  return (
    <AppContext.Provider value={{
      selectedComputer,
      setSelectedComputer
    }}>
      {children}
    </AppContext.Provider>
  );
}