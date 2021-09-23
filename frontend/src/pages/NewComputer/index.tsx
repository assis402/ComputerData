import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../../components/FormItem";
import { SelectItem } from "../../components/SelectItem";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { SubmitButton } from "../../components/SubmitButton";

export function NewComputer() {
	const history = useHistory();
	const [name, setName] = useState('');
	const [system, setSystem] = useState('');
	const [systemVersion, setSystemVersion] = useState('');
	const [managerUser, setManagerUser] = useState('');
	const [departmentInstalled, setDepartmentInstalled] = useState('');

	function handleSubmit(event: FormEvent){
		event.preventDefault();

		const data = {
			name,
			system,
			systemVersion,
			managerUser,
			departmentInstalled
		}

		api.post('', data, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});
		
		history.push('/');
	}
	
	return (
		<div className="container mt-5" style={{maxWidth: '30rem'}}>
		
			<Header 
				title="Cadastro"
				subtitle="Faça o cadastro do dispositivo"
			/>

			<form onSubmit={handleSubmit}>

				<FormItem value={name} setValue={setName} label="Nome" placeholder="Digite o nome do computador" />
				<SelectItem value={system} setValue={setSystem} label="Sistema Operacional"/>
				<FormItem value={systemVersion} setValue={setSystemVersion} label="Versão" placeholder="Digite a versão"/>
				<FormItem value={managerUser} setValue={setManagerUser} label="Usuário" placeholder="Digite o admin"/>
				<FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado" placeholder="Digite o departamento"/>

				<SubmitButton title="Adicionar"/>

			</form>

		</div>
	)
}
