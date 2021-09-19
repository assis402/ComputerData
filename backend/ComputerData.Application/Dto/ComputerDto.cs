using System;

namespace ComputerData.Application.Dto
{
    public class ComputerDto
    {
        public ComputerDto(string id, 
                           string name, 
                           string system, 
                           string systemVersion, 
                           string managerUser, 
                           string departmentInstalled, 
                           DateTime creationDate, 
                           DateTime? updateDate)
        {
            Id = id;
            Name = name;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            CreationDate = creationDate;
            UpdateDate = updateDate;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string System { get;  set; }
        public string SystemVersion { get; set; }
        public string ManagerUser { get; set; }
        public string DepartmentInstalled { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}