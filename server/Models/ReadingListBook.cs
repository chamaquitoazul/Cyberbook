using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("readinglistbook")]
    public class ReadingListBookModel
    {
        [Key]
        public int IdReadingList { get; set; }
        public int IdBook { get; set; }
    }
}
