import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../../components/FormItem";
import { api } from '../../services/api';
import { useApp } from "../../hooks/useApp";
import { SelectItem } from "../../components/SelectItem";
import { SubmitButton } from "../../components/SubmitButton";
import { Header } from "../../components/Header";
import Swal from 'sweetalert';

export function UpdateComputer() {
	const history = useHistory()
  const {selectedComputer, setSelectedComputer} = useApp();
	const [name, setName] = useState(selectedComputer?.Name);
	const [system, setSystem] = useState(selectedComputer?.System);
	const [ip, setIp] = useState(selectedComputer?.Ip);	
	const [systemVersion, setSystemVersion] = useState(selectedComputer?.SystemVersion);
	const [managerUser, setManagerUser] = useState(selectedComputer?.ManagerUser);
	const [departmentInstalled, setDepartmentInstalled] = useState(selectedComputer?.DepartmentInstalled); 
	const { setIsLoading } = useApp();


	async function handleSubmit(event: FormEvent){
		event.preventDefault();
		
		if(!selectedComputer) return;

		const data = {
			id: selectedComputer.Id,
			ip,
			name,
			system,
			systemVersion,
			managerUser,
			departmentInstalled,
			
		}

		setIsLoading(true);
		try {
			await api.put('',data, {
				headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
			})
	
			Swal('Atualizado','Registro atualizado com sucesso', 'success');
			
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}

		
		setSelectedComputer(null);
		history.push('/');
	}
    
	return (
		<div className="container pt-5" style={{maxWidth: '30rem'}}>
			<Header 
				title="Atualizar"
				subtitle="Atualize dados dos dispositivos"
			/>

			<form onSubmit={handleSubmit}>

				<FormItem value={name} setValue={setName} label="Nome" placeholder="Digite o nome do computador" />
				<FormItem value={ip} setValue={setIp} label="IP" placeholder="Digite o IP do dispositivo" />
				<SelectItem value={system} setValue={setSystem} label="Sistema Operacional"/>
				<FormItem value={systemVersion} setValue={setSystemVersion} label="Versão" placeholder="Digite a versão"/>
				<FormItem value={managerUser} setValue={setManagerUser} label="Usuário" placeholder="Digite o admin"/>
				<FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado" placeholder="Digite o departamento"/>
				
				<SubmitButton title="Salvar"/>
				
			</form>
		</div>
	)
}
