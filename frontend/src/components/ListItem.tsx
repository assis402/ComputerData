import { useHistory } from "react-router";
import { useApp } from "../hooks/useApp";
import { ComputerType } from "../types/ComputerType";

type ListItemProps = {
    computer: ComputerType;
		deleteComputer: (id:string)=>void;
}

export function ListItem({computer, deleteComputer}: ListItemProps){
	const history = useHistory();
	const { setSelectedComputer } = useApp();

	function navigateToUpdate(){
		setSelectedComputer(computer);
		history.push('/update-computer');
	}

	return (
		<tr key={computer.Id}>
			<td title={computer.Name}>
				{computer.Name}
			</td>
			<td title={computer.Ip}>
				{computer.Ip}
			</td>
			<td title={computer.ManagerUser}>
				{computer.ManagerUser}
			</td>
			<td title={computer.DepartmentInstalled}>
				{computer.DepartmentInstalled}
			</td>
			<td title={computer.System}>
				{computer.System}
			</td>
			<td title={computer.SystemVersion}>
				{computer.SystemVersion}
			</td>
			<td title={computer.UpdateDate}>
				{computer.UpdateDate}
			</td>
			<td>
				{computer.CreationDate}
			</td>
			<td>
				<button className="btn btn-outline-primary me-2" onClick={navigateToUpdate}>Editar</button>
				<button className="btn btn-outline-danger" onClick={() => deleteComputer(computer.Id)}>Deletar</button>
			</td>
		</tr>
	)
}