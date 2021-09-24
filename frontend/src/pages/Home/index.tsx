import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { ComputerType } from "../../types/ComputerType";
import './styles.scss';
const baseURL = `https://computerdata-api.herokuapp.com/ComputerData`;

export function Home() {
    const history = useHistory();
    const [computerSearch, setComputerSearch] = useState('')
    const [computerList, setComputerList] = useState<ComputerType[] | null>(null)
    
    if (!computerList) Refresh()
    
    function GetUrl(){
        return computerSearch !== '' ? `${baseURL}/GetByNameOrIp/${computerSearch}` : baseURL
    }

    function DeleteComputer(id: string){
        axios.delete(`${baseURL}?id=${id}`).then(_ => Refresh())
    }

    function Refresh(){
        axios.get(GetUrl()).then((response) => {setComputerList(response.data)})
    }

    return (
      <div>
        <main className="p-5">
          <h1 className="text-center display-1 mb-3">Computadores</h1>

          <form onSubmit={(e)=>e.preventDefault()} className="form-group mb-4">
            <div className="input-group w-50 mx-auto" >
              <input  
                type="text"
                placeholder="Pesquise pelo nome ou IP do computador"
                className="form-control"
                onChange={event => setComputerSearch(event.target.value)}
                value={computerSearch}
              />
              <button className="btn btn-primary" onClick={() => Refresh()}>Pesquisar</button>
              <button className="btn btn-secondary" onClick={() => history.push('/computers/new')}>Adicionar</button>
            </div>
          </form>

            <table className="table table-bordered table-striped align-middle mt-3">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ip</th>
                  <th>Admin</th>
                  <th>Departmento</th>
                  <th>Sistema(OS)</th>
                  <th>Versão atual</th>
                  <th>Criado em</th>
                  <th>Atualizado em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {computerList?.map(computer=>(
                  <ListItem computer={computer} deleteComputer={DeleteComputer} />
                ))}
              </tbody>
            </table>
      </main>
    </div>
    )
}

/* {computerList ? computerList.map( computer => {
  return  (
      <div key={computer.Id} className="ListItem">
          <ListItem computer={computer}/>
          <button onClick={() => history.push({
              pathname: `/computers/update`,
              state: { computer: computer }
          })}>Editar</button>
          <button onClick={() => DeleteComputer(computer.Id)}>Delete</button>
      </div>
    )
  }) 
  : 
  ''
} */