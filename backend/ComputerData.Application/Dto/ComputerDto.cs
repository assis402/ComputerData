using System;
using System.Text.Json.Serialization;

namespace ComputerData.Application.Dto
{
    public class ComputerDto
    {
        public ComputerDto(string id,
                           string name,
                           string ip,
                           string system,
                           string systemVersion,
                           string managerUser,
                           string departmentInstalled,
                           DateTime creationDate,
                           DateTime? updateDate)
        {
            Id = id;
            Name = name;
            Ip = ip;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            CreationDate = creationDate.ToString("dd/MM/yyyy");
            UpdateDate = updateDate.HasValue
                        ? updateDate.Value.ToString("dd/MM/yyyy")
                        : "Nunca atualizado";
        }

        public ComputerDto(string name,
                           string ip,
                           string system,
                           string systemVersion,
                           string managerUser,
                           string departmentInstalled,
                           DateTime creationDate,
                           DateTime? updateDate)
        {
            Name = name;
            Ip = ip;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            CreationDate = creationDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss");
            UpdateDate = updateDate.HasValue
                        ? updateDate.Value.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss")
                        : "Nunca atualizado";
        }

        public ComputerDto()
        {
        }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Ip { get; set; }
        public string System { get; set; }
        public string SystemVersion { get; set; }
        public string ManagerUser { get; set; }
        public string DepartmentInstalled { get; set; }
        public string CreationDate { get; set; }
        public string UpdateDate { get; set; }
    }
}