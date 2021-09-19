using System.Collections.Generic;
using System.Threading.Tasks;
using ComputerData.Application.Dto;

namespace ComputerData.Application.Services.Interfaces
{
    public interface IComputerService
    {
        Task<ComputerDto> Create(ComputerDto computer);

        Task<ComputerDto> Update(ComputerDto computer);

        Task<ICollection<ComputerDto>> GetAll();

        Task<ComputerDto> GetById(string id);

        Task<ICollection<ComputerDto>> GetByName(string name);

        Task DeleteById(string id);
    }
}