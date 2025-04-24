using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("bookgenre")]
    public class BookGenreModel
    {
        [Key]
        public int IdBook { get; set; }

        [ForeignKey("IdGenre")]
        public GenreModel Genre { get; set; }
    }
}
