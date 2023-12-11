using Microsoft.EntityFrameworkCore;

namespace CrudApi.Model
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Emploee> Emploees { get; set; }
    }
}
