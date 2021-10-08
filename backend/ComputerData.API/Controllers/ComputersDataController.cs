using ComputerData.Application.Dto;
using ComputerData.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            catch (Exception ex)
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetByNameOrIp/{search}")]
        public async Task<ActionResult> GetByNameOrIp(string search)
        {
            try
            {
                var computerList = await _computerService.GetByNameOrIp(search);

                if (computerList.Count != 0)
                    return Ok(computerList);
                else
                    return StatusCode(204);
            }
            catch (Exception ex)
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
            catch (Exception ex)
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

                if (updatedComputer is null)
                    return BadRequest("Computer not found.");

                return Ok(updatedComputer);
            }
            catch (Exception ex)
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetBackup")]
        public async Task<ActionResult> GetBackup()
        {
            try
            {
                var backup = await _computerService.GetBackup();

                if (backup is null)
                    return StatusCode(204);

                return Ok(backup);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("InsertBackup")]
        public ActionResult InsertBackup(List<ComputerDto> backup)
        {
            try
            {
                _computerService.InsertBackup(backup);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}