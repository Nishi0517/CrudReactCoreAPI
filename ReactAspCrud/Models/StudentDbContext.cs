using Microsoft.EntityFrameworkCore;
using System.Runtime.Serialization;

namespace ReactAspCrud.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }
        public DbSet<Student> Student { get; set; }
        public DbSet<Country> Countries { get; set; }
        
        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=ATI-1;database=StudentReactASPCore;Integrated Security=True; MultipleActiveResultSets=true; TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().Property(s => s.gender).HasMaxLength(10);
            modelBuilder.Entity<Student>().Property(s => s.phoneno).HasMaxLength(10);

    //        modelBuilder.Entity<Student>()
    //.HasOne(s => s.Country)
    //.WithMany()
    //.HasForeignKey(s => s.CountryId)
    //.OnDelete(DeleteBehavior.NoAction);


    //        modelBuilder.Entity<Student>()
    //            .HasOne(s => s.State)
    //            .WithMany()
    //            .HasForeignKey(s => s.StateId)
    //            .OnDelete(DeleteBehavior.NoAction);

    //        modelBuilder.Entity<Student>()
    //    .HasOne(s => s.City)
    //    .WithMany()
    //    .HasForeignKey(s => s.CityId)
    //    .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
