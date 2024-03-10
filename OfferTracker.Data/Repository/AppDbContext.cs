// AppDbContext.cs in the Data layer

using Microsoft.EntityFrameworkCore;
using OfferTracker.Models;

namespace OfferTracker.Data.Repository
{
    public class AppDbContext : DbContext
    {
        public DbSet<Offer> Offers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Offer>().ToTable("Offer");
        }
    }
}