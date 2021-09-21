import axios from "axios";
import { useState } from "react";
import { Button, DeleteButton, UpdateButton } from "../components/Button";
import { ListItem } from "../components/ListItem";
import { ComputerType } from "../types/ComputerType";
const baseURL = `https://localhost:5001/ComputerData`;

export function Home() {
    const [computerName, setComputerName] = useState('');
    const [computerList, setComputerList] = useState<ComputerType[]>([]);
    const [result, setResult] = useState(null);

    function getComputers() {
        if (computerName !== ''){
            //getComputersByName()
        }
        
    }

    function GetAll() { 
        axios.get(baseURL, {
        }).then((response) => {setResult(response.data)})
    }

    GetAll();

    return (
        <>
            <h1>Computadores</h1>
            <main>
                <form onSubmit={GetAll}>
                    <input 
                        type="text"
                        placeholder="Pesquise pelo nome do computador"
                        onChange={event => setComputerName(event.target.value)}
                        value={computerName}
                    />
                    <Button type="submit">
                        Pesquisar
                    </Button>
                </form>
                <div className="ComputerList">
                    <p>{result}</p>
                    {computerList.map( computer => {
                        return  (
                            <div className="ListItem">
                                <ListItem computer={computer}/>
                                <UpdateButton/>
                                <DeleteButton/>
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}