using System.Collections.Generic;
using System.Threading.Tasks;
using ComputerData.Application.Data.Entities;
using ComputerData.Application.Data.Repositories.Interfaces;
using ComputerData.Application.Dto;
using ComputerData.Application.Mapper;
using ComputerData.Application.Services.Interfaces;

namespace ComputerData.Application.Services
{
    public class ComputerService : IComputerService
    {
        private readonly IComputerRepository _computerRepository;

        public ComputerService(IComputerRepository computerRepository)
        {
            _computerRepository = computerRepository;
        }

        public async Task<ComputerDto> Create(ComputerDto computerDto)
        {
            var computer = computerDto.ToEntity();
            computer = await _computerRepository.Create(computer);
            return computer.ToDto();
        }

        public async Task<ComputerDto> Update(ComputerDto updatedComputerDto)
        {
            var computer = await _computerRepository.GetById(updatedComputerDto.Id);
            
            if (computer is null)
                return null;
            else
            {
                computer = _computerRepository.Update(updatedComputerDto.ToUpdatedEntity());
                return computer.ToDto();
            }
        }

        public async Task<ICollection<ComputerDto>> GetAll()
        {
            var computerList = await _computerRepository.GetAll();
            return computerList.ToDtoList();
        }

        public async Task<ComputerDto> GetById(string id)
        {
            var computer = await _computerRepository.GetById(id);
            return computer.ToDto();
        }

        public async Task<ICollection<ComputerDto>> GetByName(string name)
        {
            var computers = await _computerRepository.GetByName(name);
            return computers.ToDtoList();
        }

        public async Task DeleteById(string id)
        {
            var computer = await _computerRepository.GetById(id);
            _computerRepository.Delete(computer);
        }
    }
}