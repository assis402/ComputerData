using ComputerData.Application.Data.Entities;
using ComputerData.Application.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ComputerData.Application.Data.Repositories
{
    public class ComputerRepository : IComputerRepository
    {
        private ComputerDataContext _db = null;
        private DbSet<Computer> _dbSet;

        public ComputerRepository(ComputerDataContext db)
        {
            _db = db;
            _dbSet = db.Computers;
        }

        public async Task<ICollection<Computer>> GetAll()
        {
            return await _dbSet.AsNoTracking()
                               .OrderBy(x => x.CreationDate)
                               .ToListAsync();
        }

        public async Task<Computer> GetById(string id)
        {
            return await _dbSet.AsNoTracking()
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ICollection<Computer>> GetByIp(string ip)
        {
            return await _dbSet.AsNoTracking()
                               .Where(x => x.Ip.Contains(ip))
                               .ToListAsync();
        }

        public async Task<ICollection<Computer>> GetByName(string name)
        {
            return await _dbSet.AsNoTracking()
                               .Where(x => x.Name.ToLower().Contains(name))
                               .ToListAsync();
        }

        public async Task<Computer> Create(Computer computer)
        {
            await _dbSet.AddAsync(computer);
            _db.SaveChanges();
            return computer;
        }

        public Computer Update(Computer computer)
        {
            _db.Entry(computer).State = EntityState.Modified;
            _db.SaveChanges();
            return computer;
        }

        public void Delete(Computer computer)
        {
            _dbSet.Remove(computer);
            _db.SaveChanges();
        }
    }
}