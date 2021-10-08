using ComputerData.Application.Data.Entities;
using ComputerData.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComputerData.Application.Mapper
{
    public static class ComputerMapper
    {
        public static Computer ToEntity(this ComputerDto dto)
        {
            return new Computer
            (
                name: dto.Name,
                ip: dto.Ip,
                system: dto.System,
                systemVersion: dto.SystemVersion,
                managerUser: dto.ManagerUser,
                departmentInstalled: dto.DepartmentInstalled
            );
        }

        public static Computer ToBackupEntity(this ComputerDto dto)
        {
            return new Computer
            (
                name: dto.Name,
                ip: dto.Ip,
                system: dto.System,
                systemVersion: dto.SystemVersion,
                managerUser: dto.ManagerUser,
                departmentInstalled: dto.DepartmentInstalled,
                creationDate: dto.CreationDate,
                updateDate: dto.UpdateDate
            );
        }

        public static ComputerDto ToDto(this Computer entity)
        {
            return new ComputerDto
            (
                id: entity.Id,
                name: entity.Name,
                ip: entity.Ip,
                system: entity.System,
                systemVersion: entity.SystemVersion,
                managerUser: entity.ManagerUser,
                departmentInstalled: entity.DepartmentInstalled,
                creationDate: entity.CreationDate,
                updateDate: entity.UpdateDate
            );
        }

        public static ICollection<ComputerDto> ToDtoList(this ICollection<Computer> entityList)
        {
            var dtoList = new List<ComputerDto>();

            Parallel.ForEach(entityList, entity =>
                dtoList.Add(new ComputerDto
                (
                    id: entity.Id,
                    ip: entity.Ip,
                    name: entity.Name,
                    system: entity.System,
                    systemVersion: entity.SystemVersion,
                    managerUser: entity.ManagerUser,
                    departmentInstalled: entity.DepartmentInstalled,
                    creationDate: entity.CreationDate,
                    updateDate: entity.UpdateDate
                ))
            );

            return dtoList;
        }

        public static ICollection<ComputerDto> ToBackupDtoList(this ICollection<Computer> entityList)
        {
            var dtoList = new List<ComputerDto>();

            Parallel.ForEach(entityList, entity =>
                dtoList.Add(new ComputerDto
                (
                    ip: entity.Ip,
                    name: entity.Name,
                    system: entity.System,
                    systemVersion: entity.SystemVersion,
                    managerUser: entity.ManagerUser,
                    departmentInstalled: entity.DepartmentInstalled,
                    creationDate: entity.CreationDate,
                    updateDate: entity.UpdateDate
                ))
            );

            return dtoList;
        }
    }
}