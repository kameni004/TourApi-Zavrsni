using Microsoft.EntityFrameworkCore;
using TourAPI.Models;

namespace TourAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Band> Bands { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourDate> TourDates { get; set; }


    }
}
