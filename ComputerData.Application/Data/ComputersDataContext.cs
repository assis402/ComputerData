using ComputerData.Application.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ComputerData.Application.Data
{
    public class ComputerDataContext : DbContext
    {
        public DbSet<Computer> Computers { get; set; }

        public ComputerDataContext()
        {
        }

        public ComputerDataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}