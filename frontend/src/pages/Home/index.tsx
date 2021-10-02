import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { api } from "../../services/api";
import { ComputerType } from "../../types/ComputerType";
import Swal from 'sweetalert';
import './styles.scss';
import { useApp } from "../../hooks/useApp";

export function Home() {
  const history = useHistory();
  const [computerSearch, setComputerSearch] = useState('')
  const [computerList, setComputerList] = useState<ComputerType[] | null>(null)
  const { setIsLoading } = useApp();

  async function DeleteComputer(id: string){
    setIsLoading(true);
    await api.delete(`?id=${id}`);
    if(computerList){
      const updatedList = computerList?.filter(item=>item.Id !== id);
      setComputerList(updatedList);
      Swal('Excluído','Registro excluído com sucesso', 'success');
    }
    setIsLoading(false);
  }

  async function Refresh(){

    try {
      setIsLoading(true)
      const { data } = await api('');
      setComputerList(data);

    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false)
    }
  }

  async function getByName() {
    if(!computerSearch){
      //Refresh();
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.get(`/GetByNameOrIp/${computerSearch}`);
      setComputerList(data);

    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  

  useEffect(() => {
    if(computerSearch) return;
    Refresh();
  }, []);

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
            <button className="btn btn-secondary" onClick={() => history.push('/new-computer')}>Adicionar</button>
          </div>
        </form>
          <table className="table table-bordered table-striped align-middle mt-3">
            <thead>
              <tr>
                <th style={{width: 300}}>Name</th>
                <th>Ip</th>
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
                <ListItem computer={computer} deleteComputer={DeleteComputer} key={computer.Id}/>
              ))
              : 
                <tr>
                  <td colSpan={9} className="text-center">Carregando</td>
                </tr>
              }
            </tbody>
          </table>
    </main>
  </div>
  )
}