import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { api } from "../../services/api";
import { ComputerType } from "../../types/ComputerType";
import './styles.scss';

export function Home() {
  const history = useHistory();
  const [computerSearch, setComputerSearch] = useState('')
  const [computerList, setComputerList] = useState<ComputerType[] | null>(null)

  if (!computerList) Refresh()

  async function DeleteComputer(id: string){
    await api.delete(`?id=${id}`);
    Refresh();
  }

  async function Refresh(){
    try {
      const { data } = await api('');
      setComputerList(data);

    } catch (error) {
      console.log(error);
    }
  }

  async function getByName() {
    if(!computerSearch){
      Refresh();
      return;
    } 
    const { data } = await api.get(`/GetByName/${computerSearch}`);
    setComputerList(data);
  }

  useEffect(() => {
    if(computerSearch) return;
    Refresh();
  }, [computerSearch]);


  return (
    <div>
      <main className="p-5">
        <h1 className="text-center display-1 mb-3">Computadores</h1>

        <form onSubmit={(e)=>e.preventDefault()} className="form-group mb-4">
          <div className="input-group w-50 mx-auto" >
            <input  
              type="text"
              placeholder="Pesquise pelo nome do computador"
              className="form-control"
              onChange={event => setComputerSearch(event.target.value)}
              value={computerSearch}
            />
            <button className="btn btn-primary" onClick={getByName}>Pesquisar</button>
            <button className="btn btn-secondary" onClick={() => history.push('/new')}>Adicionar</button>
          </div>
        </form>

          <table className="table table-bordered table-striped align-middle mt-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Admin</th>
                <th>Departmento</th>
                <th>Sistema(OS)</th>
                <th>Versão atual</th>
                <th>Atualizado</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {computerList? computerList.map(computer=>(
                <ListItem computer={computer} deleteComputer={DeleteComputer} />
              ))
              : <h1 className="text-center">Carregando</h1>
              }
            </tbody>
          </table>
    </main>
  </div>
  )
}