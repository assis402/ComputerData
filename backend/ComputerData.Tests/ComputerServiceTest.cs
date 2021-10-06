using ComputerData.Application.Data.Entities;
using ComputerData.Application.Data.Repositories.Interfaces;
using ComputerData.Application.Dto;
using ComputerData.Application.Mapper;
using ComputerData.Application.Services;
using ComputerData.Application.Services.Interfaces;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace ComputerData.Tests
{
    public class ComputerServiceTest
    {
        private readonly Mock<IComputerRepository> _mockComputerRepository;
        private IComputerService _computerService;
        private ICollection<Computer> _mockComputers;

        public ComputerServiceTest()
        {
            _mockComputerRepository = new Mock<IComputerRepository>();
            _computerService = new ComputerService(_mockComputerRepository.Object);
            _mockComputers = GetComputersList();
        }

        [Fact]
        public async void Should_Insert_New_Computer_Successfully()
        {
            //Arrange
            var request = GetComputerCreateRequest();
            _mockComputerRepository.Setup(x => x.Create(It.IsAny<Computer>()))
                                   .ReturnsAsync(request.ToEntity())
                                   .Verifiable();

            //Act
            var newComputer = await _computerService.Create(request);

            //Assert
            Assert.NotNull(newComputer);
        }

        [Fact]
        public async void Should_Update_Computer_Successfully()
        {
            //Arrange
            var request = GetComputerUpdateRequest();
            _mockComputerRepository.Setup(x => x.Create(It.IsAny<Computer>()))
                                   .ReturnsAsync(request.ToEntity())
                                   .Verifiable();

            //Act
            var newComputer = await _computerService.Create(request);

            //Assert
            Assert.NotNull(newComputer);
        }

        [Fact]
        public async void Should_GetAll_Computers_Successfully()
        {
            //Arrange
            _mockComputerRepository.Setup(x => x.GetAll())
                                   .ReturnsAsync(_mockComputers)
                                   .Verifiable();

            //Act
            var result = await _computerService.GetAll();

            //Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async void Should_GetAll_Computers_By_Name_Or_Ip_Successfully()
        {
            //Arrange
            _mockComputerRepository.Setup(x => x.GetByName(It.IsAny<string>()))
                                   .ReturnsAsync(_mockComputers)
                                   .Verifiable();

            //Act
            var result = await _computerService.GetByNameOrIp("X");

            //Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async void Should_Get_Computer_By_Id_Successfully()
        {
            //Arrange
            _mockComputerRepository.Setup(x => x.GetById(It.IsAny<string>()))
                                   .ReturnsAsync(_mockComputers.FirstOrDefault())
                                   .Verifiable();

            //Act
            var result = await _computerService.GetById("X");

            //Assert
            Assert.NotNull(result);
        }

        [Fact]
        public void Should_Delete_Computer_By_Id_Successfuly()
        {
            //Arrange
            _mockComputerRepository.Setup(x => x.GetById(It.IsAny<string>()))
                                   .ReturnsAsync(_mockComputers.FirstOrDefault())
                                   .Verifiable();

            _mockComputerRepository.Setup(x => x.Delete(It.IsAny<Computer>()));

            //Act
            _computerService.DeleteById("X");

            //Assert
            _mockComputerRepository.Verify(x => x.Delete(_mockComputers.FirstOrDefault()));
        }

        private static ComputerDto GetComputerCreateRequest()
        {
            string jsonRequest = "{\"name\": \"Albert's Computer\",\"system\": \"MacOS\",\"systemVersion\": \"Sierra\",\"managerUser\": \"Albert Wesker\",\"departmentInstalled\": \"Stars\"}";
            var computer = JsonConvert.DeserializeObject<ComputerDto>(jsonRequest);

            return computer;
        }

        private static ComputerDto GetComputerUpdateRequest()
        {
            string jsonRequest = "{\"id\": \"dde713f0-880b-491e-ad4a-a73dbcfd535f\",\"name\": \"Barry's Computer\",\"system\": \"Windows\",\"systemVersion\": \"7\",\"managerUser\": \"Barry Burton\",\"departmentInstalled\": \"Stars\"}";
            var updatedComputer = JsonConvert.DeserializeObject<ComputerDto>(jsonRequest);

            return updatedComputer;
        }

        private static ICollection<Computer> GetComputersList()
        {
            return new List<Computer>
            {
                new ComputerDto
                (
                    id: "1",
                    name: "Ada's PC",
                    ip: "100.000.000",
                    system: "Windows",
                    systemVersion: "11",
                    managerUser: "Ada Wong",
                    departmentInstalled: "Umbrella",
                    DateTime.Now,
                    null
                ).ToEntity(),
                new ComputerDto
                (
                    id: "2",
                    name: "Claire's Laptop",
                    ip: "100.000.000",
                    system: "Windows",
                    systemVersion: "XP",
                    managerUser: "Claire Redfield",
                    departmentInstalled: "S.T.A.R.S",
                    DateTime.Now,
                    null
                ).ToEntity(),
                new ComputerDto
                (
                    id: "3",
                    name: "Jill's PC",
                    ip: "100.000.000",
                    system: "Windows",
                    systemVersion: "Vista",
                    managerUser: "Jill Valentine",
                    departmentInstalled: "S.T.A.R.S",
                    DateTime.Now,
                    null
                ).ToEntity(),
                new ComputerDto
                (
                    id: "4",
                    name: "Leon's PC",
                    ip: "100.000.000",
                    system: "Linux",
                    systemVersion: "Mint",
                    managerUser: "Leon Scott Kennedy",
                    departmentInstalled: "S.T.A.R.S",
                    DateTime.Now,
                    null
                ).ToEntity()
            };
        }
    }
}