import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, DeleteButton, UpdateButton } from "../components/Button";
import { ListItem } from "../components/ListItem";
import { ComputerType } from "../types/ComputerType";
const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

export function Home() {
    const history = useHistory();
    const [computerSearch, setComputerSearch] = useState('')
    const [computerList, setComputerList] = useState<ComputerType[] | null>(null)
    
    if (!computerList) Refresh()

    function GetUrl(){
        return computerSearch !== '' ? `${baseURL}/GetByName/${computerSearch}` : baseURL
    }

    function DeleteComputer(id: string){
        axios.delete(`${baseURL}?id=${id}`).then(_ => Refresh())
    }

    function Refresh(){
        axios.get(GetUrl()).then((response) => {setComputerList(response.data)})
    }

    return (
        <>
            <h1>Computadores</h1>
            <main>
                <input 
                    type="text"
                    placeholder="Pesquise pelo nome do computador"
                    onChange={event => setComputerSearch(event.target.value)}
                    value={computerSearch}
                />
                <button className="" onClick={() => Refresh()}>Pesquisar</button>
                <button className="" onClick={() => history.push('/computers/new')}>Adicionar</button>
                <div className="ComputerList">
                    {computerList ? computerList.map( computer => {
                        return  (
                            <div className="ListItem">
                                <ListItem computer={computer}/>
                                <button onClick={() => history.push({
                                    pathname: `/computers/update`,
                                    state: { computer: computer }
                                })}>Editar</button>
                                <button onClick={() => DeleteComputer(computer.Id)}>Delete</button>
                            </div>
                        )
                    }) : ''}
                </div>
            </main>
        </>
    )
}