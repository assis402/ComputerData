import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"
import { FormItem } from "../../components/FormItem";
import { SelectItem } from "../../components/SelectItem";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { SubmitButton } from "../../components/SubmitButton";
import { useApp } from "../../hooks/useApp";

export function NewComputer() {
	const history = useHistory();
	const [name, setName] = useState('');
	const [ip, setIp] = useState('');
	const [system, setSystem] = useState('Windows');
	const [systemVersion, setSystemVersion] = useState('');
	const [managerUser, setManagerUser] = useState('');
	const [departmentInstalled, setDepartmentInstalled] = useState('');
	const { setIsLoading } = useApp();

	async function handleSubmit(event: FormEvent){
		event.preventDefault();

		const data = {
			name,
			ip,
			system,
			systemVersion,
			managerUser,
			departmentInstalled
		}	

		setIsLoading(true);
		try {
			await api.post('', JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});
			
			history.push('/');
			
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	/* function handleSubmit(event: FormEvent){
		event.preventDefault();

		axios.post(baseURL, getRequest(), {
				headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
		}).then(response => console.log(response.data))
		
		history.push('/');
	} */

	
	return (
		<div className="container pt-5" style={{maxWidth: '30rem', position: 'relative'}}>
			<Header 
				title="Cadastro"
				subtitle="Faça o cadastro do dispositivo"
			/>

			<form onSubmit={handleSubmit}>

				<FormItem value={name} setValue={setName} label="Nome" placeholder="Digite o nome do computador" />
				<FormItem value={ip} setValue={setIp} label="IP" placeholder="Digite o IP do dispositivo" />
				<SelectItem value={system} setValue={setSystem} label="Sistema Operacional"/>
				<FormItem value={systemVersion} setValue={setSystemVersion} label="Versão" placeholder="Digite a versão"/>
				<FormItem value={managerUser} setValue={setManagerUser} label="Usuário" placeholder="Digite o admin"/>
				<FormItem value={departmentInstalled} setValue={setDepartmentInstalled} label="Departamento Instalado" placeholder="Digite o departamento"/>
				<SubmitButton title="Adicionar"/>

			</form>

		</div>
	)
}
