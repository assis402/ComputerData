import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../../components/FormItem";
import { ComputerType } from "../../types/ComputerType";
const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

type LocationType = {
    computer: ComputerType
}

export function UpdateComputer() {
	const history = useHistory()
	const location = useLocation<LocationType>()
	const id = location.state.computer.Id
	const [name, setName] = useState<string | undefined>(location.state.computer.Name);
	const [system, setSystem] = useState<string | undefined>(location.state.computer.System);
	const [systemVersion, setSystemVersion] = useState<string | undefined>(location.state.computer.SystemVersion);
	const [managerUser, setManagerUser] = useState<string | undefined>(location.state.computer.ManagerUser);
	const [departmentInstalled, setDepartmentInstalled] = useState<string | undefined>(location.state.computer.DepartmentInstalled); 
	
	function handleSubmit(event: FormEvent){
		event.preventDefault();
		
		axios.put(baseURL, getRequest(), {
				headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
		}).then(response => console.log(response.data))
		
		history.push('/');
	}
    
	function getRequest(){
		return {
			"id": id,
			"name": name,
			"system": system,
			"systemVersion": systemVersion,
			"managerUser": managerUser,
			"departmentInstalled": departmentInstalled
		}
	}
    
	return (
		<div className="container mt-5" style={{maxWidth: '30rem'}}>
			<h1 className="display-1 text-center">Atualizar</h1>
			<p className="text-center">Atualize dados dos dispositivos</p>
			<form onSubmit={handleSubmit}>
				<FormItem value={name} setValue={setName} label="Nome" placeholder="Digite o nome do computador" />
				<FormItem value={system} setValue={setSystem} label="Sistema Operacional" placeholder="Digite o sistema operacional"/>
				<FormItem value={systemVersion} setValue={setSystemVersion} label="Versão" placeholder="Digite a versão"/>
				<FormItem value={managerUser} setValue={setManagerUser} label="Usuário" placeholder="Digite o admin"/>
				<FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado" placeholder="Digite o departamento"/>
				<div className="d-flex">
					<button className="btn btn-primary ms-auto" type="submit">Salvar</button>
				</div>
			</form>
		</div>
	)
}
