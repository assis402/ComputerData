using System;
using System.Threading.Tasks;
using ComputerData.Application.Dto;
using ComputerData.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ComputerData.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComputerDataController : ControllerBase
    {
        private readonly IComputerService _computerService;

        public ComputerDataController(IComputerService computerService)
        {
            _computerService = computerService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var computerList = await _computerService.GetAll();
                
                if (computerList.Count != 0)
                    return Ok(computerList);
                else
                    return StatusCode(204);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            try
            {
                var computer = await _computerService.GetById(id);

                if (computer != null)
                    return Ok(computer);
                else
                    return StatusCode(204);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetByName/{name}")]
        public async Task<ActionResult> GetByName(string name)
        {
            try
            {
                var computerList = await _computerService.GetByName(name);

                if (computerList.Count != 0)
                    return Ok(computerList);
                else
                    return StatusCode(204);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ComputerDto computerDto)
        {
            try
            {
                var newComputer = await _computerService.Create(computerDto);
                return StatusCode(201, newComputer);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] ComputerDto computerDto)
        {
            try
            {
                var updatedComputer = await _computerService.Update(computerDto);

                if(updatedComputer is null)
                    return BadRequest("Computer not found.");

                return Ok(updatedComputer);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await _computerService.DeleteById(id);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}