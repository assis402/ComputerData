using System.Collections.Generic;
using System.Threading.Tasks;
using ComputerData.Application.Data.Entities;

namespace ComputerData.Application.Data.Repositories.Interfaces
{
    public interface IComputerRepository
    {
        Task<ICollection<Computer>> GetAll();

        Task<Computer> GetById(string id);
        
        Task<ICollection<Computer>> GetByName(string name);

        Task<Computer> Create(Computer entity);

        Computer Update(Computer entity);

        void Delete(Computer entity);
    }
}