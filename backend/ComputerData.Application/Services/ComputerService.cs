using ComputerData.Application.Data.Entities;
using ComputerData.Application.Data.Repositories.Interfaces;
using ComputerData.Application.Dto;
using ComputerData.Application.Mapper;
using ComputerData.Application.Services.Interfaces;
using ComputerData.Application.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

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
                computer.Update(name: updatedComputerDto.Name,
                                ip: updatedComputerDto.Ip,
                                system: updatedComputerDto.System,
                                systemVersion: updatedComputerDto.SystemVersion,
                                managerUser: updatedComputerDto.ManagerUser,
                                departmentInstalled: updatedComputerDto.DepartmentInstalled);

                return _computerRepository.Update(computer).ToDto();
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

            if (computer is null)
                return null;

            return computer.ToDto();
        }

        public async Task<ICollection<ComputerDto>> GetByNameOrIp(string search)
        {
            ICollection<Computer> computers = new List<Computer>();

            search = search.Trim();

            if (search.IsIP())
                computers = await _computerRepository.GetByIp(search.RemoveWhiteSpaces());
            else
                computers = await _computerRepository.GetByName(search.ToLower());

            return computers.ToDtoList();
        }

        public async Task DeleteById(string id)
        {
            var computer = await _computerRepository.GetById(id);

            _computerRepository.Delete(computer);
        }

        public async Task<string> GetBackup()
        {
            var computerList = await _computerRepository.GetAll();

            return computerList.ToBackupDtoList().ConvertToJson();
        }

        public void InsertBackup(List<ComputerDto> backup)
        {
            backup.ForEach(async computer => await _computerRepository.Create(computer.ToBackupEntity()));
        }
    }
}