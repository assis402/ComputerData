import axios from "axios";
import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../../components/FormItem";
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
		<div className="container mt-5" style={{maxWidth: '30rem'}}>
			<h1 className="display-1 text-center">Cadastrar</h1>
			<p className="text-center">Faça o cadastro do dispositivo</p>
			<form onSubmit={handleSubmit}>
				<FormItem value={name} setValue={setName} label="Nome" placeholder="Digite o nome do computador" />
				<FormItem value={system} setValue={setSystem} label="Sistema Operacional" placeholder="Digite o sistema operacional"/>
				<FormItem value={systemVersion} setValue={setSystemVersion} label="Versão" placeholder="Digite a versão"/>
				<FormItem value={managerUser} setValue={setManagerUser} label="Usuário" placeholder="Digite o admin"/>
				<FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado" placeholder="Digite o departamento"/>
				<div className="d-flex">
					<button className="btn btn-primary ms-auto" type="submit">Adicionar</button>
				</div>
			</form>
		</div>
	)
}
