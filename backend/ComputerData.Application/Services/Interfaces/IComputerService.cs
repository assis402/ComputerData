using ComputerData.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComputerData.Application.Services.Interfaces
{
    public interface IComputerService
    {
        Task<ComputerDto> Create(ComputerDto computer);

        Task<ComputerDto> Update(ComputerDto computer);

        Task<ICollection<ComputerDto>> GetAll();

        Task<ComputerDto> GetById(string id);

        Task<ICollection<ComputerDto>> GetByNameOrIp(string name);

        Task DeleteById(string id);

        Task<string> GetBackup();

        void InsertBackup(List<ComputerDto> backup);
    }
}