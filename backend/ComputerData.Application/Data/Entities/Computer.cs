using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace ComputerData.Application.Data.Entities
{
    [Table("computer")]
    public class Computer
    {
        [Key]
        [Column("id")]
        public string Id { get; private set; }

        [Column("name")]
        public string Name { get; private set; }

        [Column("ip")]
        public string Ip { get; private set; }

        [Column("system")]
        public string System { get; private set; }

        [Column("systemversion")]
        public string SystemVersion { get; private set; }

        [Column("manageruser")]
        public string ManagerUser { get; private set; }

        [Column("departmentinstalled")]
        public string DepartmentInstalled { get; private set; }

        [Column("creationdate")]
        public DateTime CreationDate { get; private set; }

        [Column("updatedate")]
        public DateTime? UpdateDate { get; private set; }

        public Computer(string name,
                        string ip,
                        string system,
                        string systemVersion,
                        string managerUser,
                        string departmentInstalled)
        {
            Id = Guid.NewGuid().ToString();
            Name = name;
            Ip = ip;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            CreationDate = DateTime.Now;
            UpdateDate = null;
        }

        public Computer(string name,
                        string ip,
                        string system,
                        string systemVersion,
                        string managerUser,
                        string departmentInstalled,
                        string creationDate,
                        string updateDate)
        {
            Id = Guid.NewGuid().ToString();
            Name = name;
            Ip = ip;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            CreationDate = Convert.ToDateTime(creationDate, CultureInfo.InvariantCulture);
            UpdateDate = Convert.ToDateTime(updateDate, CultureInfo.InvariantCulture);
        }

        public void Update(string name,
                                   string ip,
                                   string system,
                                   string systemVersion,
                                   string managerUser,
                                   string departmentInstalled)
        {
            Name = name;
            Ip = ip;
            System = system;
            SystemVersion = systemVersion;
            ManagerUser = managerUser;
            DepartmentInstalled = departmentInstalled;
            UpdateDate = DateTime.Now;
        }
    }
}