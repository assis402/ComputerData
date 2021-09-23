import { useHistory } from "react-router";
import { ComputerType } from "../types/ComputerType";

type ListItemProps = {
    computer: ComputerType;
		deleteComputer: (id:string)=>void;
}

export function ListItem({computer, deleteComputer}: ListItemProps){
	const history = useHistory();
	return (
		<tr key={computer.Id}>
			<td title={computer.Id}>
				{computer.Id}
			</td>
			<td title={computer.Name}>
				{computer.Name}
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
				<button className="btn btn-outline-primary" onClick={() => history.push({
							pathname: `/computers/update`,
							state: { computer: computer }
					})}>Editar</button>
				<button className="btn btn-outline-danger" onClick={() => deleteComputer(computer.Id)}>Delete</button>
			</td>
		</tr>
	)
}

{/* <div className="card">
			<div className="card-header">
				{computer.Name}
			</div>
			<div className="card-body">
		
			</div>	
		</div> */}