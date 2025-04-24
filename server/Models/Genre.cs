using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("genre")]
    public class GenreModel
    {
        [Key]
        public int IdGenre { get; set; }
        public string GenreName { get; set; }
        public int IdCategory { get; set; }
    }
}
