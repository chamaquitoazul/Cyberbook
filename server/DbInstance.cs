
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server
{
    public class DbInstance : DbContext
    {
        public DbInstance(DbContextOptions<DbInstance> options) : base(options)
        {

        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<BookModel> Books { get; set; }
        public DbSet<BookGenreModel> BookGenres { get; set; }
    }
}