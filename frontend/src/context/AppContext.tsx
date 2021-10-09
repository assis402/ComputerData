import { createContext, ReactNode, useState } from "react";
import { Loader } from "../components/Loader";
import { ComputerType } from "../types/ComputerType";

type Props = {
  children: ReactNode;
}

type ContextProps = {
  selectedComputer: ComputerType | null;
  setSelectedComputer: (value: ComputerType | null)=>void;
  setIsLoading: (value:boolean)=>void;
  isLoading: boolean;
}

export const AppContext = createContext({} as ContextProps);

export function AppContextProvider({children}:Props){
  const [ selectedComputer, setSelectedComputer ] = useState<ComputerType | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider value={{
      selectedComputer,
      setSelectedComputer,
      isLoading,
      setIsLoading
    }}>
      <Loader isLoading={isLoading}/>
      {children}
    </AppContext.Provider>
  );
}