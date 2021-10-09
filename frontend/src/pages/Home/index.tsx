import { FormHTMLAttributes, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { api } from "../../services/api";
import { ComputerType } from "../../types/ComputerType";
import Swal from 'sweetalert';
import './styles.scss';
import { useApp } from "../../hooks/useApp";
import { InputFiles } from "typescript";
import axios from "axios";

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
      Refresh();
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.get(`/GetByNameOrIp/${computerSearch}`);
      const results = data? data : []
      console.log(results)
      setComputerList(results);

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

  async function fetchBackup() {
    setIsLoading(true);

    try {
      
      const response = await fetch('https://computerdata-api.herokuapp.com/ComputerData/GetBackup');
      const data = await response.json();
      
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      let a = document.createElement('a');
      
      a.setAttribute("href",dataStr);
      a.setAttribute("download", 'backup' + ".json");
      document.body.appendChild(a); // required for firefox
      a.click();
      a.remove();
    } catch (error) {
      console.log('line:86'+error)

    } finally {
      setIsLoading(false);

    }
  }

  async function insertBackup() {
    const backup = document.createElement('input');
    backup.setAttribute('type','file');
    backup.click();
    
    backup.addEventListener('change',async(event: any)=>{
      setIsLoading(true);
      let reader = new FileReader();
      reader.addEventListener('loadend',async()=>{
        let data = reader.result?.toString();
        if(!data) return;

        try {
          const parsedData = JSON.parse(data);
          api.post('/InsertBackup',parsedData);
        } catch (error) {
          console.log(error)
        }
      })
      reader.readAsText(event.target.files[0])
      setIsLoading(false);
      Refresh();
    })
  }

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
            <button className="btn btn-secondary" onClick={fetchBackup}>Download All</button>
            <button className="btn btn-secondary" onClick={insertBackup}>Insert Backup</button>
          </div>
        </form>
          <table className="table table-bordered table-striped align-middle mt-3">
            <thead>
              <tr>
                <th style={{width: 300}}>Name</th>
                <th>Ip</th>
                <th>Admin</th>
                <th>Departamentos</th>
                <th>Sistema(OS)</th>
                <th>Versão atual</th>
                <th>Atualizado</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {computerList && (computerList.length > 0? computerList.map(computer=>(
                <ListItem computer={computer} deleteComputer={DeleteComputer} key={computer.Id}/>
              ))
              : 
                <tr>
                  <td colSpan={9} className="text-center">Não há resultados, tente outra palavra chave</td>
                </tr>
              )}
            </tbody>
          </table>
    </main>
  </div>
  )
}