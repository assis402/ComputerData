import { ComputerType } from "../types/ComputerType";

type ListItemProps = {
    computer: ComputerType
}

export function ListItem({computer}: ListItemProps){
    return (
        <h4>{computer.Name}</h4>
    )
}