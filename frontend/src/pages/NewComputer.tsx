import axios from "axios";
import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../components/FormItem";
const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

export function NewComputer() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [system, setSystem] = useState('');
    const [systemVersion, setSystemVersion] = useState('');
    const [managerUser, setManagerUser] = useState('');
    const [departmentInstalled, setDepartmentInstalled] = useState(''); 

    function handleSubmit(event: FormEvent){
        event.preventDefault();

        axios.post(baseURL, getRequest(), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
        }).then(response => console.log(response.data))
        
        history.push('/');
    }

    function getRequest(){
        return {
            "name": name,
            "system": system,
            "systemVersion": systemVersion,
            "managerUser": managerUser,
            "departmentInstalled": departmentInstalled
        }
    }
    
    return (
        <form className="" onSubmit={handleSubmit}>
            <FormItem value={name} setValue={setName} label="Nome"/>
            <FormItem value={system} setValue={setSystem} label="Sistema Operacional"/>
            <FormItem value={systemVersion} setValue={setSystemVersion} label="Versão"/>
            <FormItem value={managerUser} setValue={setManagerUser} label="Usuário"/>
            <FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado"/>
            <button type="submit">Adicionar</button>
        </form>
    )
}