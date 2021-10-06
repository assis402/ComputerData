using ComputerData.Application.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComputerData.Application.Data.Repositories.Interfaces
{
    public interface IComputerRepository
    {
        Task<ICollection<Computer>> GetAll();

        Task<Computer> GetById(string id);

        Task<ICollection<Computer>> GetByIp(string name);

        Task<ICollection<Computer>> GetByName(string name);

        Task<Computer> Create(Computer entity);

        Computer Update(Computer entity);

        void Delete(Computer entity);
    }
}