using Microsoft.EntityFrameworkCore;
using SalesAPI.Models;

namespace SalesAPI.Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users { get; set; }
    }
}